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
}

export async function searchAssessments({ query = '', filter = 'all' }: SearchParams) {
  try {
    const sql = neon(DATABASE_URL);
    let queryResult;

    // Handle the different filter cases with separate queries to avoid complex condition building
    if (filter === 'all') {
      if (query) {
        queryResult = await sql`
          SELECT * FROM assessments
          WHERE 
            LOWER(first_name) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(last_name) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(title) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(university) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(university_school) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(objectives::text) LIKE ${'%' + query.toLowerCase() + '%'}
          ORDER BY last_name, first_name
        `;
      } else {
        queryResult = await sql`
          SELECT * FROM assessments
          ORDER BY last_name, first_name
        `;
      }
    } else if (filter === 'marine') {
      if (query) {
        queryResult = await sql`
          SELECT * FROM assessments
          WHERE 
            (LOWER(first_name) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(last_name) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(title) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(university) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(university_school) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(objectives::text) LIKE ${'%' + query.toLowerCase() + '%'})
            AND targets::jsonb ? '14'
          ORDER BY last_name, first_name
        `;
      } else {
        queryResult = await sql`
          SELECT * FROM assessments
          WHERE targets::jsonb ? '14'
          ORDER BY last_name, first_name
        `;
      }
    } else if (filter === 'climate') {
      if (query) {
        queryResult = await sql`
          SELECT * FROM assessments
          WHERE 
            (LOWER(first_name) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(last_name) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(title) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(university) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(university_school) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(objectives::text) LIKE ${'%' + query.toLowerCase() + '%'})
            AND targets::jsonb ? '13'
          ORDER BY last_name, first_name
        `;
      } else {
        queryResult = await sql`
          SELECT * FROM assessments
          WHERE targets::jsonb ? '13'
          ORDER BY last_name, first_name
        `;
      }
    } else if (filter === 'economic') {
      if (query) {
        queryResult = await sql`
          SELECT * FROM assessments
          WHERE 
            (LOWER(first_name) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(last_name) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(title) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(university) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(university_school) LIKE ${'%' + query.toLowerCase() + '%'} OR
            LOWER(objectives::text) LIKE ${'%' + query.toLowerCase() + '%'})
            AND (targets::jsonb ? '8' OR targets::jsonb ? '12')
          ORDER BY last_name, first_name
        `;
      } else {
        queryResult = await sql`
          SELECT * FROM assessments
          WHERE targets::jsonb ? '8' OR targets::jsonb ? '12'
          ORDER BY last_name, first_name
        `;
      }
    }

    if (!queryResult) {
      console.error('No search results returned from database');
      return [];
    }

    return queryResult;
  } catch (error: unknown) {
    console.error('Error searching assessments:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to search assessments: ${errorMessage}`);
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



