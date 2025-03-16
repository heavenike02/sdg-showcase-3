"use server"
import { DATABASE_URL } from '@/env';
import { neon } from '@neondatabase/serverless';

export async function fetchAssessmentById(id: string) {
  try {
    const sql = neon(DATABASE_URL);
    const response = await sql`
      SELECT * FROM assessments 
      WHERE id = ${id}
    `;

    if (!response || response.length === 0) {
      console.error(`No assessment found with id: ${id}`);
      return null;
    }

    return response[0];
  } catch (error: unknown) {
    console.error('Error fetching assessment by ID:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch assessment: ${errorMessage}`);
  }
}

export async function fetchAllAssessments() {
  try {
    const sql = neon(DATABASE_URL);
    const response = await sql`
      SELECT * FROM assessments
    `;

    if (!response) {
      console.error('No assessments returned from database');
      return [];
    }

    return response;
  } catch (error: unknown) {
    console.error('Error fetching all assessments:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch assessments: ${errorMessage}`);
  }
}

export interface SearchParams {
  query?: string;
  filter?: 'all' | 'marine' | 'climate' | 'economic';
  targetId?: string;
}

export async function searchAssessments({ query = '', filter = 'all', targetId }: SearchParams) {
  try {
    const sql = neon(DATABASE_URL);
    
    // Log the search parameters for debugging
    console.log('Search Parameters:', { query, filter, targetId });
    
    // Fetch all assessments from the database
    const allAssessments = await sql`
      SELECT * FROM assessments
      ORDER BY last_name, first_name
    `;

    if (!allAssessments || allAssessments.length === 0) {
      console.error('No assessments returned from database');
      return [];
    }
    
    console.log(`Found ${allAssessments.length} total assessments from database`);
    
    // Log a sample assessment to understand structure (first assessment)
    if (allAssessments.length > 0) {
      console.log('Sample assessment data:', JSON.stringify({
        id: allAssessments[0].id,
        name: `${allAssessments[0].first_name} ${allAssessments[0].last_name}`,
        targets: allAssessments[0].targets
      }, null, 2));
    }

    // Apply filtering in memory
    let filteredResults = allAssessments;

    // Apply text search filter if query is provided
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredResults = filteredResults.filter(assessment => 
        (assessment.first_name && assessment.first_name.toLowerCase().includes(lowerQuery)) ||
        (assessment.last_name && assessment.last_name.toLowerCase().includes(lowerQuery)) ||
        (assessment.title && assessment.title.toLowerCase().includes(lowerQuery)) ||
        (assessment.university && assessment.university.toLowerCase().includes(lowerQuery)) ||
        (assessment.university_school && assessment.university_school.toLowerCase().includes(lowerQuery)) ||
        (assessment.objectives && JSON.stringify(assessment.objectives).toLowerCase().includes(lowerQuery))
      );
      console.log(`After text search: ${filteredResults.length} results`);
    }

    // Apply category filter
    if (filter === 'marine') {
      filteredResults = filteredResults.filter(assessment => 
        assessment.targets && 
        hasTarget(assessment.targets, '14')
      );
      console.log(`After marine filter: ${filteredResults.length} results`);
    } else if (filter === 'climate') {
      filteredResults = filteredResults.filter(assessment => 
        assessment.targets && 
        hasTarget(assessment.targets, '13')
      );
      console.log(`After climate filter: ${filteredResults.length} results`);
    } else if (filter === 'economic') {
      filteredResults = filteredResults.filter(assessment => 
        assessment.targets && 
        (hasTarget(assessment.targets, '8') || hasTarget(assessment.targets, '12'))
      );
      console.log(`After economic filter: ${filteredResults.length} results`);
    }

    // Apply targetId filter if provided
    if (targetId) {
      console.log(`Filtering by targetId: ${targetId}`);
      
      // For debugging: check all assessments with targets
      const assessmentsWithTargets = filteredResults.filter(a => a.targets && 
        (typeof a.targets === 'string' ? a.targets.length > 0 : 
         Array.isArray(a.targets) ? a.targets.length > 0 : 
         Object.keys(a.targets).length > 0));
      
      console.log(`${assessmentsWithTargets.length} assessments have some targets defined`);
      
      filteredResults = filteredResults.filter(assessment => {
        const hasTargetResult = assessment.targets && hasTarget(assessment.targets, targetId);
        return hasTargetResult;
      });
      
      console.log(`After targetId filter: ${filteredResults.length} results`);
    }

    return filteredResults;
  } catch (error: unknown) {
    console.error('Error searching assessments:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to search assessments: ${errorMessage}`);
  }
}

// Helper function to check if targets contain a specific target
function hasTarget(targets: any, targetToFind: string): boolean {
  try {
    let targetArray: any[] = [];
    
    // Parse targets based on its format
    if (typeof targets === 'string') {
      try {
        targetArray = JSON.parse(targets);
      } catch (e) {
        // If JSON parsing fails, it might be a single string target
        targetArray = [targets];
      }
    } else if (Array.isArray(targets)) {
      targetArray = targets;
    } else if (targets && typeof targets === 'object') {
      targetArray = Array.isArray(targets) ? targets : [targets];
    }
    
    if (!Array.isArray(targetArray)) {
      console.warn('Target is not an array after processing:', targets);
      return false;
    }
    
    // For debugging
    console.log(`Checking for targetId ${targetToFind} in:`, JSON.stringify(targetArray));
    
    const result = targetArray.some(target => {
      // Check if the target is a string and matches exactly
      if (typeof target === 'string') {
        // Direct match
        if (target === targetToFind) {
          return true;
        }
        
        // For targets like "1.3", also check for targets that contain this as a prefix
        // This handles cases where the target might be stored as "1.3.x"
        if (targetToFind.includes('.') && target.startsWith(targetToFind)) {
          return true;
        }
        
        // Also check for SDG number only (e.g., "1" should match "1.3")
        if (!targetToFind.includes('.') && target.split('.')[0] === targetToFind) {
          return true;
        }
      }
      
      // Check if the target is an object with a targetId field
      if (target && typeof target === 'object') {
        let targetId: string = '';
        
        // Handle different possible object structures
        if ('targetId' in target) {
          targetId = String((target as { targetId: string | number }).targetId);
        } else if ('id' in target) {
          targetId = String((target as { id: string | number }).id);
        } else if ('target' in target) {
          targetId = String((target as { target: string | number }).target);
        }
        
        if (!targetId) return false;
        
        // Same matching logic as with string targets
        if (targetId === targetToFind) {
          return true;
        }
        
        if (targetToFind.includes('.') && targetId.startsWith(targetToFind)) {
          return true;
        }
        
        if (!targetToFind.includes('.') && targetId.split('.')[0] === targetToFind) {
          return true;
        }
      }
      
      return false;
    });
    
    console.log(`Result for target ${targetToFind}:`, result);
    return result;
  } catch (err) {
    console.error('Error checking for target:', err);
    return false;
  }
}

export async function getRelatedAssessments(assessmentId: string, limit = 5) {
  try {
    const sql = neon(DATABASE_URL);
    
    // First get the target assessment's tags and targets
    const assessment = await fetchAssessmentById(assessmentId);
    
    if (!assessment) {
      return [];
    }
    
    // Find related assessments based on shared targets or tags
    const related = await sql`
      SELECT * FROM assessments
      WHERE id != ${assessmentId}
      AND (
        targets::jsonb ?| (${assessment.targets}::jsonb)::text[]
        OR tags && ${assessment.tags}
      )
      ORDER BY 
        (
          -- Calculate similarity score based on overlapping targets and tags
          COALESCE(array_length(array(SELECT jsonb_array_elements_text(${assessment.targets}::jsonb) 
            INTERSECT SELECT jsonb_array_elements_text(targets::jsonb)), 1), 0) +
          COALESCE(array_length(array(SELECT unnest(${assessment.tags}) 
            INTERSECT SELECT unnest(tags)), 1), 0)
        ) DESC
      LIMIT ${limit}
    `;
    
    return related || [];
  } catch (error: unknown) {
    console.error('Error fetching related assessments:', error);
    return [];
  }
}

// New function to fetch SDG summary data
export async function fetchSdgSummaryData() {
  try {
    const sql = neon(DATABASE_URL);
    
    // Get all assessments with targets - using a simpler query
    const assessments = await sql`
      SELECT id, targets
      FROM assessments 
      WHERE targets IS NOT NULL AND jsonb_array_length(targets::jsonb) > 0
    `;
    
    if (!assessments || assessments.length === 0) {
      return [];
    }
    
    console.log(`Found ${assessments.length} assessments with targets`);
    
    // Log the first assessment's targets to understand the structure
    if (assessments.length > 0) {
      console.log('Sample assessment targets:', JSON.stringify(assessments[0].targets, null, 2));
    }
    
    // Define TypeScript interfaces
    interface TargetCount {
      targetId: string;
      researcherCount: number;
      processedAssessmentIds?: Set<string>;
    }
    
    interface SdgData {
      sdgId: number;
      researcherCount: number;
      targetCounts: Map<string, TargetCount>;
      processedAssessmentIds?: Set<string>;
    }
    
    // Create a mapping to track SDG data
    const sdgSummary = new Map<number, SdgData>();
    
    // Process each assessment
    for (const assessment of assessments) {
      let targetObjects = [];
      
      try {
        // Parse the targets data depending on its format
        if (typeof assessment.targets === 'string') {
          targetObjects = JSON.parse(assessment.targets);
        } else if (Array.isArray(assessment.targets)) {
          targetObjects = assessment.targets;
        } else if (assessment.targets && typeof assessment.targets === 'object') {
          targetObjects = Array.isArray(assessment.targets) ? assessment.targets : [assessment.targets];
        }
      } catch (err) {
        console.error('Error parsing targets:', err);
        continue;
      }
      
      if (!Array.isArray(targetObjects) || targetObjects.length === 0) {
        continue;
      }
      
      // For each target object, extract the targetId
      for (const targetObj of targetObjects) {
        let targetId: string | null = null;
        
        // Handle string targets (just the ID)
        if (typeof targetObj === 'string') {
          targetId = targetObj;
        } 
        // Handle object targets with targetId field
        else if (targetObj && typeof targetObj === 'object' && 'targetId' in targetObj) {
          targetId = String(targetObj.targetId);
        }
        
        if (!targetId || !targetId.includes('.')) {
          console.warn('Invalid or missing targetId:', targetObj);
          continue;
        }
        
        // Extract SDG number from target (e.g., "3.1" -> 3)
        const sdgId = parseInt(targetId.split('.')[0]);
        if (isNaN(sdgId)) {
          console.warn('Could not parse SDG ID from target:', targetId);
          continue;
        }
        
        // Initialize SDG if not already in map
        if (!sdgSummary.has(sdgId)) {
          sdgSummary.set(sdgId, {
            sdgId,
            researcherCount: 0,
            targetCounts: new Map<string, TargetCount>(),
            processedAssessmentIds: new Set<string>()
          });
        }
        
        const sdgData = sdgSummary.get(sdgId)!;
        
        // Increment researcher count for this SDG (only once per assessment)
        if (!sdgData.processedAssessmentIds!.has(assessment.id)) {
          sdgData.researcherCount++;
          sdgData.processedAssessmentIds!.add(assessment.id);
        }
        
        // Track target counts
        if (!sdgData.targetCounts.has(targetId)) {
          sdgData.targetCounts.set(targetId, { 
            targetId, 
            researcherCount: 0,
            processedAssessmentIds: new Set<string>()
          });
        }
        
        // Increment researcher count for this target (only once per assessment)
        const targetData = sdgData.targetCounts.get(targetId)!;
        if (!targetData.processedAssessmentIds!.has(assessment.id)) {
          targetData.researcherCount++;
          targetData.processedAssessmentIds!.add(assessment.id);
        }
      }
    }
    
    // Convert to the expected format and clean up temporary tracking properties
    const result = Array.from(sdgSummary.values()).map(sdg => {
      // Convert target counts and clean up
      const targetCounts = Array.from(sdg.targetCounts.values()).map(target => {
        // Extract only the data we want to return
        return {
          targetId: target.targetId,
          researcherCount: target.researcherCount
        };
      });
      
      return {
        sdgId: sdg.sdgId,
        researcherCount: sdg.researcherCount,
        targetCounts
      };
    });
    
    console.log('SDG Summary Data:', JSON.stringify(result, null, 2));
    return result;
  } catch (error: unknown) {
    console.error('Error fetching SDG summary data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch SDG summary data: ${errorMessage}`);
  }
}



