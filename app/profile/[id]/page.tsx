'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'    
import { ArrowLeft, Globe, BookOpen, Users, ExternalLink, Target, Mail, Phone, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getSDGColor } from '@/lib/sdgcolor'

// Mock data - in a real app, this would come from an API or store
const profilesData = [
  {
    id: 'daniel-norton',
    name: 'Dr. Daniel Norton',
    title: 'Lecturer in Economics',
    department: 'J.E. Cairnes School of Business and Economics',
    institution: 'University of Galway',
    bio: 'Dr. Daniel Norton is a Lecturer in Economics specializing in environmental economics and sustainable use of the sea. His research focuses on natural capital accounting, marine ecosystem services, and climate change policy. Previously, he worked at the Marine Institute and the Environmental Protection Agency, bringing practical experience to his academic work.',
    interests: ['Environmental Economics', 'Sustainable Use of the Sea', 'Natural Capital Accounting', 'Marine Ecosystem Services', 'Climate Change Policy'],
    research: ['Environmental Economics', 'Sustainable Use of the Sea', 'Natural Capital Accounting', 'Marine Ecosystem Services', 'Climate Change Policy'],
    primarySDG: 14,
    sdgs: [14, 13, 8, 17],
    image: 'https://placehold.co/400x400/0A97D9/FFFFFF/png?text=DN',
    email: 'daniel.norton@universityofgalway.ie',
    phone: '+353 91 524411',
    office: 'Room 123, J.E. Cairnes Building',
    publications: [
      {
        title: 'Economic Valuation of Marine Ecosystem Services in Ireland',
        journal: 'Journal of Environmental Economics',
        year: 2023,
        link: '#',
        sdgs: [14, 13, 8]
      },
      {
        title: 'Natural Capital Accounting for Coastal Ecosystems',
        journal: 'Ecological Economics',
        year: 2022,
        link: '#',
        sdgs: [14, 15, 17]
      },
      {
        title: 'Sustainable Development in Marine Policy',
        journal: 'Marine Policy Review',
        year: 2021,
        link: '#',
        sdgs: [14, 12, 8]
      }
    ],
    projects: [
      {
        title: 'BlueValue: Economic Valuation of Marine Ecosystem Services',
        description: 'A three-year project funded by the Marine Institute to develop economic valuation frameworks for Ireland\'s marine resources.',
        year: '2022-2025',
        funding: '€550,000'
      },
      {
        title: 'Sustainable Ocean Economy Pathways',
        description: 'An interdisciplinary project examining policy frameworks for sustainable blue economy development.',
        year: '2020-2023',
        funding: '€320,000'
      }
    ],
    teaching: [
      {
        code: 'EC135',
        title: 'Principles of Microeconomics',
        description: 'This course introduces students to fundamental microeconomic concepts with a focus on environmental applications and sustainable resource allocation.',
        sdgs: [4, 12, 8]
      },
      {
        code: 'EC116',
        title: 'Global Issues in Agricultural, Marine and Renewable Energy Economics',
        description: 'This course explores economic principles applied to marine resources, renewable energy, and sustainable agriculture, with emphasis on policy implications.',
        sdgs: [14, 7, 2, 13]
      },
      {
        code: 'EC7209',
        title: 'Natural Resource Management',
        description: 'Advanced doctoral-level course examining theoretical frameworks for natural resource management with applications to marine ecosystems.',
        sdgs: [14, 12, 15]
      }
    ],
    sdgTargets: [
      { id: '2.4', direct: true },
      { id: '4.7', direct: true },
      { id: '7.2', direct: false },
      { id: '8.4', direct: true },
      { id: '12.2', direct: true },
      { id: '13.3', direct: false },
      { id: '14.1', direct: true },
      { id: '14.2', direct: true },
      { id: '14.7', direct: true },
      { id: '15.5', direct: false },
      { id: '17.6', direct: true },
    ]
  },
  // ... rest of the profiles data
]

export default function ProfilePage() {
  const params = useParams()
  const profile = profilesData.find(p => p.id === params.id)

  if (!profile) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>The requested profile could not be found.</CardDescription>
          </CardHeader>
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
                    <AvatarImage src={profile.image} alt={profile.name} />
                    <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
                    
                    <Button variant="outline" asChild size="sm" className="justify-start h-9">
                      <a href={`tel:${profile.phone}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        {profile.phone}
                      </a>
                    </Button>
                    
                    <Button variant="outline" size="sm" className="justify-start h-9">
                      <Building2 className="mr-2 h-4 w-4" />
                      {profile.office}
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Research Interests</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.research.map((interest) => (
                        <Badge key={interest} variant="secondary" className="rounded-md">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
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
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Biography */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Biography</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>
              
              {profile.sdgTargets && profile.sdgTargets.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <h3 className="font-medium">SDG Targets</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.sdgTargets.map((target) => (
                        <Badge
                          key={target.id}
                          variant={target.direct ? "default" : "secondary"}
                          className="flex items-center gap-1 rounded-md"
                        >
                          <Target className="h-3 w-3" />
                          {target.id}
                          {target.direct && (
                            <span className="ml-1 text-[10px] bg-primary-foreground/10 px-1 rounded">
                              Direct
                            </span>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Tabbed content */}
          <Tabs defaultValue="publications">
            <TabsList className="w-full grid grid-cols-3 h-9">
              <TabsTrigger value="publications" className="text-xs">
                <BookOpen className="mr-2 h-3 w-3" />
                Publications
              </TabsTrigger>
              <TabsTrigger value="projects" className="text-xs">
                <Globe className="mr-2 h-3 w-3" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="teaching" className="text-xs">
                <Users className="mr-2 h-3 w-3" />
                Teaching
              </TabsTrigger>
            </TabsList>
            
            {/* Publications tab */}
            <TabsContent value="publications" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Recent Publications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.publications.map((pub, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-medium text-sm">{pub.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {pub.journal} • {pub.year}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {pub.sdgs && pub.sdgs.map(sdg => (
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
                      <Button variant="link" asChild className="p-0 h-auto text-xs">
                        <a href={pub.link} className="flex items-center">
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
              </Card>
            </TabsContent>
            
            {/* Projects tab */}
            <TabsContent value="projects" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Current Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.projects.map((project, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                        <h4 className="font-medium text-sm">{project.title}</h4>
                        <div className="text-xs whitespace-nowrap">
                          <span className="text-muted-foreground">{project.year}</span>
                          <span className="mx-2">•</span>
                          <span className="text-emerald-600 font-medium">{project.funding}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {project.description}
                      </p>
                      {index < profile.projects.length - 1 && (
                        <Separator className="my-3" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Teaching tab */}
            <TabsContent value="teaching" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Teaching Activities</CardTitle>
                </CardHeader>
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
                      {course.sdgs && (
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
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 