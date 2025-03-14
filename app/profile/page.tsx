import { useParams } from 'next/navigation'
import Link from 'next/link'    
import { ArrowLeft, Globe, BookOpen, Users, ExternalLink, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  {
    id: 'jane-smith',
    name: 'Dr. Jane Smith',
    title: 'Professor of Economics',
    department: 'School of Economics',
    institution: 'University of Galway',
    bio: 'Dr. Smith is a leading researcher in climate economics and sustainable development. Her work focuses on economic policies that promote climate resilience while supporting economic growth.',
    interests: ['Sustainable Development', 'Environmental Economics', 'Climate Change Policy'],
    research: ['Sustainable Development', 'Environmental Economics', 'Climate Change Policy', 'Climate Resilience', 'Green Economy'],
    primarySDG: 13,
    sdgs: [13, 7, 11],
    image: 'https://placehold.co/400x400/3F7E44/FFFFFF/png?text=JS',
    email: 'jane.smith@universityofgalway.ie',
    phone: '+353 91 234567',
    office: 'Room 145, Economics Building',
    publications: [
      {
        title: 'Economic impacts of climate policy in small open economies',
        journal: 'Climate Policy Journal',
        year: 2023,
        link: '#',
        sdgs: [13, 8, 10]
      },
      {
        title: 'Transition pathways to a low carbon economy: A comparative analysis',
        journal: 'Environmental Economics Review',
        year: 2022,
        link: '#',
        sdgs: [13, 7, 9]
      },
      {
        title: 'The role of carbon pricing in climate mitigation strategies',
        journal: 'Journal of Environmental Economics',
        year: 2021,
        link: '#',
        sdgs: [13, 12, 8]
      }
    ],
    projects: [
      {
        title: 'ClimateEcon: Economic Modeling for Climate Action',
        description: 'An EU Horizon project developing economic models for climate policy evaluation.',
        year: '2021-2024',
        funding: '€750,000'
      },
      {
        title: 'Just Transition Frameworks',
        description: 'Research on economic approaches to ensure socially just climate transitions.',
        year: '2020-2022',
        funding: '€280,000'
      }
    ],
    teaching: [
      {
        code: 'EC3030',
        title: 'Climate Economics',
        description: 'Undergraduate course exploring the economic dimensions of climate change, including policy responses and economic impacts.',
        sdgs: [13, 8, 4]
      },
      {
        code: 'EC5050',
        title: 'Environmental Policy Analysis',
        description: 'Postgraduate course on methods and tools for analyzing environmental policies, with emphasis on climate and energy policies.',
        sdgs: [13, 7, 12]
      },
      {
        code: 'EC7020',
        title: 'Advanced Climate Economics',
        description: 'PhD-level course examining advanced theoretical frameworks and empirical methods in climate economics.',
        sdgs: [13, 8, 17]
      }
    ],
    sdgTargets: [
      { id: '7.3', direct: true },
      { id: '8.4', direct: false },
      { id: '10.2', direct: false },
      { id: '12.c', direct: true },
      { id: '13.1', direct: true },
      { id: '13.2', direct: true },
      { id: '13.3', direct: true },
      { id: '17.14', direct: false },
    ]
  },
  {
    id: 'john-doe',
    name: 'Dr. John Doe',
    title: 'Associate Professor',
    department: 'Business School',
    institution: 'University of Galway',
    bio: 'Dr. Doe researches social enterprise models and ethical business practices. His work explores how businesses can contribute to societal goals while maintaining economic viability.',
    interests: ['Social Enterprise', 'Corporate Sustainability', 'Ethical Business'],
    research: ['Social Enterprise', 'Corporate Sustainability', 'Ethical Business', 'Responsible Innovation', 'Inclusive Economics'],
    primarySDG: 8,
    sdgs: [8, 12, 10],
    image: 'https://placehold.co/400x400/A21942/FFFFFF/png?text=JD',
    email: 'john.doe@universityofgalway.ie',
    phone: '+353 91 345678',
    office: 'Room 302, Business School Building',
    publications: [
      {
        title: 'Social enterprise models for sustainable development',
        journal: 'Journal of Social Entrepreneurship',
        year: 2023,
        link: '#',
        sdgs: [8, 1, 10]
      },
      {
        title: 'Corporate sustainability beyond ESG metrics',
        journal: 'Business Ethics Quarterly',
        year: 2022,
        link: '#',
        sdgs: [12, 8, 16]
      },
      {
        title: 'Ethical leadership in times of crisis',
        journal: 'Leadership Studies Journal',
        year: 2021,
        link: '#',
        sdgs: [8, 16, 17]
      }
    ],
    projects: [
      {
        title: 'SocialBiz: Business Models for Social Impact',
        description: 'Research on viable business models that prioritize social impact alongside financial returns.',
        year: '2022-2024',
        funding: '€320,000'
      },
      {
        title: 'Ethical Business Network',
        description: 'Creating a network of businesses committed to ethical practices and social responsibility.',
        year: '2021-2023',
        funding: '€180,000'
      }
    ],
    teaching: [
      {
        code: 'BU3010',
        title: 'Business Ethics',
        description: 'Undergraduate course exploring ethical frameworks in business decision-making and corporate responsibility.',
        sdgs: [8, 12, 16]
      },
      {
        code: 'BU5015',
        title: 'Social Entrepreneurship',
        description: 'Postgraduate course on creating and managing businesses with social missions and measuring social impact.',
        sdgs: [8, 1, 10]
      },
      {
        code: 'BU7005',
        title: 'Corporate Social Responsibility',
        description: 'MBA course examining frameworks for corporate responsibility, sustainability reporting, and stakeholder engagement.',
        sdgs: [12, 8, 17]
      }
    ],
    sdgTargets: [
      { id: '1.4', direct: false },
      { id: '8.3', direct: true },
      { id: '8.5', direct: true },
      { id: '10.2', direct: true },
      { id: '12.6', direct: true },
      { id: '16.6', direct: false },
      { id: '17.17', direct: true },
    ]
  },
  {
    id: 'sarah-johnson',
    name: 'Dr. Sarah Johnson',
    title: 'Senior Lecturer',
    department: 'Marine Science',
    institution: 'University of Galway',
    bio: 'Dr. Johnson is a marine biologist specializing in coastal ecosystems. Her research focuses on understanding and protecting marine biodiversity in the face of climate change.',
    interests: ['Marine Biology', 'Ocean Conservation', 'Coastal Ecosystems'],
    research: ['Marine Biology', 'Ocean Conservation', 'Coastal Ecosystems', 'Biodiversity Protection', 'Climate Impacts on Marine Life'],
    primarySDG: 14,
    sdgs: [14, 15, 13],
    image: 'https://placehold.co/400x400/0A97D9/FFFFFF/png?text=SJ',
    email: 'sarah.johnson@universityofgalway.ie',
    phone: '+353 91 456789',
    office: 'Room 112, Marine Science Building',
    publications: [
      {
        title: 'Impacts of climate change on coastal marine ecosystems in the Northeast Atlantic',
        journal: 'Marine Ecology Progress Series',
        year: 2023,
        link: '#',
        sdgs: [14, 13, 15]
      },
      {
        title: 'Conservation strategies for vulnerable marine species in Ireland',
        journal: 'Ocean Conservation',
        year: 2022,
        link: '#',
        sdgs: [14, 15, 17]
      },
      {
        title: 'Biodiversity assessment of Irish coastal waters',
        journal: 'Journal of Marine Biology',
        year: 2021,
        link: '#',
        sdgs: [14, 6, 15]
      }
    ],
    projects: [
      {
        title: 'CoastalWatch: Monitoring Coastal Ecosystem Health',
        description: 'A citizen science project monitoring the health of coastal ecosystems around Ireland.',
        year: '2022-2025',
        funding: '€420,000'
      },
      {
        title: 'Marine Protected Area Effectiveness',
        description: 'Evaluating the effectiveness of MPAs in protecting marine biodiversity.',
        year: '2020-2023',
        funding: '€350,000'
      }
    ],
    teaching: [
      {
        code: 'MS2010',
        title: 'Marine Ecology',
        description: 'Undergraduate course covering fundamental principles of marine ecosystems, biodiversity, and conservation.',
        sdgs: [14, 15, 4]
      },
      {
        code: 'MS4030',
        title: 'Coastal Conservation',
        description: 'Advanced undergraduate course focused on the management and protection of coastal habitats and species.',
        sdgs: [14, 15, 13]
      },
      {
        code: 'MS6020',
        title: 'Advanced Marine Biology',
        description: 'MSc course covering advanced topics in marine biology research methods and conservation strategies.',
        sdgs: [14, 15, 4]
      }
    ],
    sdgTargets: [
      { id: '6.6', direct: false },
      { id: '13.1', direct: false },
      { id: '14.1', direct: true },
      { id: '14.2', direct: true },
      { id: '14.5', direct: true },
      { id: '15.1', direct: false },
      { id: '15.5', direct: true },
      { id: '17.6', direct: true },
    ]
  },
  {
    id: 'michael-chen',
    name: 'Dr. Michael Chen',
    title: 'Research Fellow',
    department: 'Renewable Energy',
    institution: 'University of Galway',
    bio: 'Dr. Chen specializes in renewable energy technologies and sustainable energy transitions. His research focuses on developing innovative solutions for clean energy production and storage.',
    interests: ['Clean Energy', 'Sustainable Technology', 'Climate Mitigation'],
    research: ['Clean Energy', 'Sustainable Technology', 'Climate Mitigation', 'Energy Storage', 'Smart Grids'],
    primarySDG: 7,
    sdgs: [7, 9, 13],
    image: 'https://placehold.co/400x400/FCC30B/FFFFFF/png?text=MC',
    email: 'michael.chen@universityofgalway.ie',
    phone: '+353 91 567890',
    office: 'Room 205, Engineering Building',
    publications: [
      {
        title: 'Innovations in offshore wind energy storage systems',
        journal: 'Renewable Energy',
        year: 2023,
        link: '#',
        sdgs: [7, 9, 14]
      },
      {
        title: 'Integration challenges for variable renewable energy in small grids',
        journal: 'Energy Policy',
        year: 2022,
        link: '#',
        sdgs: [7, 9, 11]
      },
      {
        title: 'Hybrid renewable energy systems for island communities',
        journal: 'Sustainable Energy Technologies',
        year: 2021,
        link: '#',
        sdgs: [7, 11, 13]
      }
    ],
    projects: [
      {
        title: 'NextGenStorage: Advanced Energy Storage Solutions',
        description: 'Developing next-generation energy storage technologies for renewable energy integration.',
        year: '2022-2025',
        funding: '€650,000'
      },
      {
        title: 'Island Energy Transitions',
        description: 'Creating sustainable energy transition pathways for island communities.',
        year: '2021-2023',
        funding: '€280,000'
      }
    ],
    teaching: [
      {
        code: 'EN3040',
        title: 'Renewable Energy Systems',
        description: 'Undergraduate course covering principles and applications of major renewable energy technologies.',
        sdgs: [7, 9, 13]
      },
      {
        code: 'EN5020',
        title: 'Energy Storage Technologies',
        description: 'MSc course focused on various energy storage methods, their applications, and integration challenges.',
        sdgs: [7, 9, 12]
      },
      {
        code: 'EN6010',
        title: 'Sustainable Energy Transitions',
        description: 'PhD course examining socio-technical transitions to sustainable energy systems and policies.',
        sdgs: [7, 13, 11]
      }
    ],
    sdgTargets: [
      { id: '7.1', direct: true },
      { id: '7.2', direct: true },
      { id: '7.3', direct: true },
      { id: '9.4', direct: true },
      { id: '9.5', direct: true },
      { id: '11.3', direct: false },
      { id: '13.2', direct: false },
      { id: '17.7', direct: true },
    ]
  }
]

// Helper function to get SDG color


function Profile() {
  const { id } = useParams()
  const profile = profilesData.find(p => p.id === id)

  if (!profile) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
          <p className="text-slate-600 mb-6">The requested profile could not be found.</p>
          <Button asChild>
            <Link href="/search">
              <ArrowLeft className="mr-2" size={16} />
              Back to Search
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="page-container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back navigation */}
          <div className="mb-6">
            <Button variant="outline" asChild className="group">
              <Link href="/search">
                <ArrowLeft className="mr-2 group-hover:-translate-x-0.5 transition-transform" size={16} />
                Back to Search Results
              </Link>
            </Button>
          </div>

          {/* Profile header */}
          <div className="glass-card p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <div className="w-32 h-32 md:w-full md:h-auto aspect-square rounded-full overflow-hidden mx-auto md:mx-0">
                  <img 
                    src={profile.image} 
                    alt={profile.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="md:w-3/4">
                <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                <p className="text-xl text-slate-700 mb-3">{profile.title}</p>
                <p className="text-slate-600 mb-6">
                  {profile.department} • {profile.institution}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div>
                      <div className="font-medium mb-1">Email</div>
                      <a href={`mailto:${profile.email}`} className="text-primary hover:underline">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                      <div className="font-medium mb-1">Phone</div>
                      <a href={`tel:${profile.phone}`} className="text-primary hover:underline">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg>
                    </div>
                    <div>
                      <div className="font-medium mb-1">Office</div>
                      <span className="text-slate-600">
                        {profile.office}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {profile.research.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Primary SDG:</span>
                  <span 
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-white"
                    style={{ backgroundColor: getSDGColor(profile.primarySDG) }}
                  >
                    SDG {profile.primarySDG}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile content */}
          <div className="glass-card p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Biography</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              {profile.bio}
            </p>
            
            {/* SDG Targets Section */}
            {profile.sdgTargets && profile.sdgTargets.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">SDG Targets</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.sdgTargets.map((target) => (
                    <div 
                      key={target.id}
                      className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${target.direct ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-700'}`}
                    >
                      <Target className="mr-1" size={14} />
                      {target.id}
                      {target.direct && (
                        <span className="ml-1 text-xs bg-primary/20 px-1.5 py-0.5 rounded">Direct</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Tabbed content */}
          <Tabs defaultValue="publications" className="mb-8">
            <TabsList className="w-full md:w-auto grid grid-cols-1 md:grid-cols-3 gap-2">
              <TabsTrigger value="publications" className="data-[state=active]:bg-slate-200">
                <BookOpen className="mr-2" size={16} />
                Publications
              </TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-slate-200">
                <Globe className="mr-2" size={16} />
                Projects
              </TabsTrigger>
              <TabsTrigger value="teaching" className="data-[state=active]:bg-slate-200">
                <Users className="mr-2" size={16} />
                Teaching
              </TabsTrigger>
            </TabsList>
            
            {/* Publications tab */}
            <TabsContent value="publications" className="mt-6">
              <div className="glass-card p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4">Recent Publications</h3>
                <div className="space-y-6">
                  {profile.publications.map((pub, index) => (
                    <div key={index} className="border-b border-slate-200 last:border-0 pb-4 last:pb-0">
                      <h4 className="font-medium text-slate-900 mb-1">{pub.title}</h4>
                      <p className="text-slate-600 text-sm mb-2">
                        {pub.journal} • {pub.year}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {pub.sdgs && pub.sdgs.map(sdg => (
                          <span 
                            key={sdg}
                            className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium text-white"
                            style={{ backgroundColor: getSDGColor(sdg) }}
                          >
                            SDG {sdg}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={pub.link}
                        className="text-primary text-sm font-medium inline-flex items-center hover:underline"
                      >
                        View Publication
                        <ExternalLink className="ml-1" size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Projects tab */}
            <TabsContent value="projects" className="mt-6">
              <div className="glass-card p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4">Current Projects</h3>
                <div className="space-y-6">
                  {profile.projects.map((project, index) => (
                    <div key={index} className="border-b border-slate-200 last:border-0 pb-6 last:pb-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                        <h4 className="font-medium text-slate-900">{project.title}</h4>
                        <div className="text-sm">
                          <span className="text-slate-500">{project.year}</span>
                          <span className="mx-2">•</span>
                          <span className="font-medium text-emerald-600">{project.funding}</span>
                        </div>
                      </div>
                      <p className="text-slate-600">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Teaching tab */}
            <TabsContent value="teaching" className="mt-6">
              <div className="glass-card p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4">Teaching Activities</h3>
                <div className="space-y-6">
                  {profile.teaching.map((course, index) => (
                    <div key={index} className="border-b border-slate-200 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mr-3 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">
                            {course.code}: {course.title}
                          </h4>
                          <p className="text-slate-600 text-sm mt-1 mb-2">
                            {course.description}
                          </p>
                          {course.sdgs && (
                            <div className="flex flex-wrap gap-1.5">
                              {course.sdgs.map(sdg => (
                                <span 
                                  key={sdg}
                                  className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium text-white"
                                  style={{ backgroundColor: getSDGColor(sdg) }}
                                >
                                  SDG {sdg}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Profile
