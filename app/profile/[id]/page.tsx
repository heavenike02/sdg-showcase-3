'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'    
import { ArrowLeft, BookOpen, Users, ExternalLink, Mail, AlertCircle,   } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getSDGColor } from '@/lib/sdgcolor'
import { fetchAssessmentById } from '@/queries/fetch-assessment-data'
import SdgCircle from '@/components/sdg-circle'




// Define Assessment type
interface Assessment {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  university: string;
  university_school: string;
  title: string;
  objectives: string;
  targets: Record<string, string[]> | TargetImpact[]; // Can be either a map or an array of impacts
  tags: string[];
  modules: {
    teaching?: {
      code: string;
      title: string;
      description: string;
      sdgs?: number[];
    }[];
    projects?: {
      title: string;
      description: string;
      year: string;
      funding: string;
    }[];
  };
  publications: string;
  // Add impact assessment fields
  impact_assessment?: {
    targetImpacts?: {
      targetId: string;
      impactType: 'positive' | 'negative';
      impactDirection: 'direct' | 'indirect';
      evidence?: string;
    }[];
    insights?: string;
    recommendedTags?: string[];
  };
  profile_picture?: string;
  publicationsOverview: string;
}

// Publication interface
interface Publication {
  name: string;
  author: string;
  link: string;
  sdg: string;
}

// Add new interface for raw publication data
interface PublicationData {
  name?: string;
  author?: string;
  link?: string;
  sdg?: string;
}

// Project interface
interface Project {
  title: string;
  description: string;
  year: string;
  funding: string;
}

// Teaching interface
interface Teaching {
  code: string;
  title: string;
  description: string;
  sdgs?: number[];
}

// SDG Target interface
interface SdgTarget {
  id: string;
  direct: boolean;
  impactType?: 'positive' | 'negative';
  impactDirection?: 'direct' | 'indirect';
  evidence?: string;
}

// Target Impact interface
interface TargetImpact {
  targetId: string;
  impactType: 'positive' | 'negative';
  impactDirection: 'direct' | 'indirect';
  evidence?: string;
}

// Define Module interface
interface Module {
  moduleCode: string;
  moduleName: string;
  moduleDescription: string;
  sdgAlignments: {
    sdg: string;
    alignment: string;
  }[];
}

// Type for formatted profile data
interface FormattedProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  institution: string;
  bio: string;
  interests: string[];
  research: string[];
  primarySDG: number;
  sdgs: number[];
  image: string;
  email: string;
  phone: string;
  office: string;
  publications: Publication[];
  projects: Project[];
  teaching: Teaching[];
  sdgTargets: SdgTarget[];
  targetImpacts: TargetImpact[];
  insights: string;
  recommendedTags: string[];
  profilePicture: string;
  tags: string[];
  publicationsOverview: string;
  modules: Module[];
}

interface LocalSdgTarget {
  id: string;
  direct: boolean;
  impactType?: 'positive' | 'negative';
  impactDirection?: 'direct' | 'indirect';
  evidence?: string;
}

export default function ProfilePage() {
  const params = useParams()

  const [profile, setProfile] = useState<FormattedProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProfile() {
      setLoading(true)
      setError(null)
      
      try {
        const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : null
        
        if (!id) {
          setError('Invalid profile ID')
          setLoading(false)
          return
        }

        const assessment = await fetchAssessmentById(id)
        
        if (!assessment) {
          setError('Profile not found')
          setLoading(false)
          return
        }

        // Format the assessment data into the expected format for the profile
        const formattedProfile = formatProfileData(assessment as Assessment)
        setProfile(formattedProfile)
      } catch (err) {
        console.error('Error loading profile:', err)
        setError('Failed to load profile data')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [params.id])

  // Format assessment data into profile format
  function formatProfileData(assessment: Assessment): FormattedProfile {
    // Extract SDG targets from JSON
    const targetsMap = assessment.targets || {}
    
    // Check if targets is an array (new format) or object (old format)
    let sdgs: number[] = []
    let sdgTargets: LocalSdgTarget[] = []
    let targetImpacts: TargetImpact[] = []
    
    // Handle the case where targets is an array of impact objects
    if (Array.isArray(assessment.targets)) {
      // This is the new format where targets contains the impact data directly
      targetImpacts = assessment.targets as TargetImpact[]
      
      // Extract SDG numbers from targetIds (e.g., "3.8" -> 3)
      sdgs = Array.from(new Set(
        targetImpacts.map(impact => parseInt(impact.targetId.split('.')[0]))
      )).filter(Boolean).sort((a, b) => a - b)
      
      // Create sdgTargets from the impact data
      sdgTargets = targetImpacts.map(impact => ({
        id: impact.targetId,
        direct: impact.impactDirection === 'direct',
        impactType: impact.impactType,
        impactDirection: impact.impactDirection,
        evidence: impact.evidence
      }))
    } else {
      // Original format where targets is a map of SDG numbers to target numbers
      sdgs = Object.keys(targetsMap).map(Number).filter(Boolean)
      
      // Format SDG targets with impact assessment data if available
      const originalTargetImpacts = assessment.impact_assessment?.targetImpacts || []
      
      for (const [sdgKey, targets] of Object.entries(targetsMap)) {
        if (Array.isArray(targets)) {
          for (const target of targets) {
            const targetId = `${sdgKey}.${target}`
            const impactData = originalTargetImpacts.find((ti) => ti.targetId === targetId)
            
            sdgTargets.push({
              id: targetId,
              direct: impactData?.impactDirection === 'direct' || false,
              impactType: impactData?.impactType,
              impactDirection: impactData?.impactDirection,
              evidence: impactData?.evidence
            })
          }
        }
      }
      
      targetImpacts = originalTargetImpacts
    }
    
    const primarySDG = sdgs.length > 0 ? sdgs[0] : 0

    // Parse publications if available
    const publicationsData: Publication[] = []
    try {
      if (assessment.publications) {
        // Try to parse JSON if it's stored as a string
        const pubData = typeof assessment.publications === 'string' 
          ? JSON.parse(assessment.publications) 
          : assessment.publications
        
        if (Array.isArray(pubData)) {
          pubData.forEach((pub: PublicationData) => {
            // Process author field - split by "-" if present
            let authorDisplay = pub.author || 'Author Unknown';
            if (authorDisplay.includes('-')) {
              // Format authors separated by "-" into a readable format
              authorDisplay = authorDisplay.split('-').map((author: string) => author.trim()).join(', ');
            }
            
            publicationsData.push({
              name: pub.name || 'Untitled Publication',
              author: authorDisplay,
              link: pub.link || '#',
              sdg: pub.sdg || primarySDG.toString()
            })
          })
        }
      }
    } catch (e) {
      console.error('Error parsing publications:', e)
      // Just continue with empty publications
    }

    // Extract interests from objectives
    const interests = assessment.objectives
      ? assessment.objectives
          .split(/[,.;]+/)
          .map(item => item.trim())
          .filter(item => item.length > 0)
      : []

    // Extract modules data
    const teaching: Teaching[] = []
    const projects: Project[] = []
    const modules: Module[] = []
    try {
      if (assessment.modules) {
        const modulesData = typeof assessment.modules === 'string'
          ? JSON.parse(assessment.modules)
          : assessment.modules
        
        // Extract teaching modules
        if (modulesData.teaching && Array.isArray(modulesData.teaching)) {
          modulesData.teaching.forEach((course: Teaching) => {
            teaching.push({
              code: course.code || 'Unknown',
              title: course.title || 'Untitled Course',
              description: course.description || '',
              sdgs: course.sdgs || [primarySDG]
            })
          })
        }
        
        // Extract projects
        if (modulesData.projects && Array.isArray(modulesData.projects)) {
          modulesData.projects.forEach((project: Project) => {
            projects.push({
              title: project.title || 'Untitled Project',
              description: project.description || '',
              year: project.year || 'Current',
              funding: project.funding || 'Unknown'
            })
          })
        }

        // Extract new modules
        if (Array.isArray(modulesData)) {
          modulesData.forEach((mod: Module) => {
            modules.push({
              moduleCode: mod.moduleCode || 'Unknown',
              moduleName: mod.moduleName || 'Untitled Module',
              moduleDescription: mod.moduleDescription || '',
              sdgAlignments: mod.sdgAlignments || []
            })
          })
        }
      }
    } catch (e) {
      console.error('Error parsing modules:', e)
    }

    // Create a placeholder image URL with initials
    const placeholderImage = `https://placehold.co/400x400/${getSDGColor(primarySDG).substring(1)}/FFFFFF/png?text=${assessment.first_name?.[0] || ''}${assessment.last_name?.[0] || ''}`;
    
    // Extract publications overview
    let publicationsOverview = '';
    try {
      if (assessment.publicationsOverview) {
        publicationsOverview = typeof assessment.publicationsOverview === 'string'
          ? assessment.publicationsOverview
          : JSON.stringify(assessment.publicationsOverview);
        
        console.log('Publications Overview:', publicationsOverview);
      } else {
        console.log('No publications overview found in assessment data');
      }
    } catch (e) {
      console.error('Error parsing publications overview:', e);
    }

    return {
      id: assessment.id,
      name: `${assessment.first_name} ${assessment.last_name}`,
      title: assessment.title || '',
      department: assessment.university_school || '',
      institution: assessment.university || '',
      bio: assessment.objectives || '',
      interests: interests,
      research: interests,
      primarySDG,
      sdgs,
      image: placeholderImage,
      email: assessment.email || '',
      phone: '+353 91 524411', // Default phone
      office: 'Office information not available',
      publications: publicationsData,
      projects,
      teaching,
      sdgTargets,
      // Use the target impacts we extracted
      targetImpacts: targetImpacts,
      insights: assessment.impact_assessment?.insights || '',
      recommendedTags: assessment.impact_assessment?.recommendedTags || [],
      profilePicture: assessment.profile_picture || '',
      tags: assessment.tags || [],
      publicationsOverview: publicationsOverview,
      modules
    }
  }

  // Add debug log for profile data
  useEffect(() => {
    if (profile) {
      console.log('Profile Data:', {
        name: profile.name,
        publicationsOverview: profile.publicationsOverview,
        publicationsCount: profile.publications.length
      });
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
              <CardTitle className="mb-2">Loading Profile</CardTitle>
              <CardDescription>Retrieving researcher information...</CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>{error || "The requested profile could not be found."}</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error === 'Profile not found' 
                    ? 'This profile may have been removed or never existed.' 
                    : 'There was a problem loading this profile.'}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" size="sm">
              <Link href="/search">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Back navigation */}
          <Button variant="outline" asChild size="sm" className="group">
            <Link href="/search">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Search Results
            </Link>
          </Button>

          {/* Profile header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <Avatar className="w-32 h-32 mx-auto md:mx-0">
                    {profile.profilePicture ? (
                      <AvatarImage 
                        src={profile.profilePicture} 
                        alt={profile.name} 
                        onError={(e) => {
                          // If image fails to load, we'll fall back to the AvatarFallback
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <AvatarImage 
                        src={profile.image} 
                        alt={profile.name} 
                      />
                    )}
                    <AvatarFallback 
                      style={{ 
                        backgroundColor: getSDGColor(profile.primarySDG),
                        color: 'white'
                      }}
                    >
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="md:w-3/4 space-y-4">
                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <p className="text-lg text-muted-foreground">{profile.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {profile.department} • {profile.institution}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Button variant="outline" asChild size="sm" className="justify-start h-9">
                      <a href={`mailto:${profile.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        <span className="truncate">{profile.email}</span>
                      </a>
                    </Button>
                  </div>
                  
                  {profile.tags && profile.tags.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.tags.map((tag, idx) => (
                          <Badge key={`tag-${idx}`} variant="secondary" className="rounded-md">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {profile.primarySDG > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Primary SDG:</span>
                      <Badge 
                        className="rounded-md"
                        style={{ 
                          backgroundColor: getSDGColor(profile.primarySDG),
                          color: 'white' 
                        }}
                      >
                        SDG {profile.primarySDG}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SDG Impact Visualization */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>SDG Impact Visualization</CardTitle>
              <CardDescription>
                Explore how this researcher&apos;s work contributes to the UN Sustainable Development Goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SdgCircle 
                selectedSdgs={profile.sdgs} 
                targetImpacts={profile.targetImpacts}
                recommendedTags={profile.recommendedTags}
                insights={profile.insights}
                showSearchLink={false}
              />
            </CardContent>
          </Card>
          
          {/* Tabbed content */}
          <Tabs defaultValue={profile.publications.length > 0 ? "publications" : profile.teaching.length > 0 ? "teaching" : "publications"}>
            <TabsList className="w-full grid grid-cols-3 h-9">
              <TabsTrigger value="publications" className="text-xs" disabled={profile.publications.length === 0}>
                <BookOpen className="mr-2 h-3 w-3" />
                Publications
              </TabsTrigger>
              <TabsTrigger value="teaching" className="text-xs" disabled={profile.teaching.length === 0}>
                <Users className="mr-2 h-3 w-3" />
                Teaching
              </TabsTrigger>
            </TabsList>
            
            {/* Publications tab */}
            <TabsContent value="publications" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Publications</CardTitle>
                  {profile.publicationsOverview && (
                    <CardDescription className="mt-2">
                      {profile.publicationsOverview}
                    </CardDescription>
                  )}
                </CardHeader>
                {profile.publications.length > 0 ? (
                  <CardContent className="space-y-4">
                    {profile.publications.map((pub, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium text-sm">{pub.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          By: {pub.author}
                        </p>
                        {pub.sdg && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <Badge
                              className="text-xs rounded-md"
                              style={{
                                backgroundColor: getSDGColor(parseInt(pub.sdg)),
                                color: 'white'
                              }}
                            >
                              {pub.sdg.toLowerCase().startsWith('sdg') ? pub.sdg : `SDG ${pub.sdg}`}
                            </Badge>
                          </div>
                        )}
                        <Button variant="link" asChild className="p-0 h-auto text-xs">
                          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            View Publication
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                        {index < profile.publications.length - 1 && (
                          <Separator className="my-3" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                ) : (
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No publications available for this researcher.
                    </p>
                  </CardContent>
                )}
              </Card>
            </TabsContent>
            
            {/* Teaching tab */}
            <TabsContent value="teaching" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Teaching Activities</CardTitle>
                </CardHeader>
                {profile.teaching.length > 0 ? (
                  <CardContent className="space-y-4">
                    {profile.teaching.map((course, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <Badge variant="outline" className="text-xs rounded-md">{course.code}</Badge>
                          {course.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {course.description}
                        </p>
                        {course.sdgs && course.sdgs.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {course.sdgs.map(sdg => (
                              <Badge
                                key={sdg}
                                className="text-xs rounded-md"
                                style={{
                                  backgroundColor: getSDGColor(sdg),
                                  color: 'white'
                                }}
                              >
                                SDG {sdg}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {index < profile.teaching.length - 1 && (
                          <Separator className="my-3" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                ) : (
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No teaching information available for this researcher.
                    </p>
                  </CardContent>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 