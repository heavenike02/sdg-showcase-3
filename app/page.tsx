import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Search, Users, BookOpen, ArrowRight, BarChart3, Globe, Database, Lightbulb } from "lucide-react";
import { SDGImpactChart } from "@/components/SDGImpactChart";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50"></div>
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" 
            alt="Students collaborating on sustainable development project"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          <section className="flex-1 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl space-y-6">
                
                <Badge variant="secondary" className="bg-white/20 text-white border-white/10 hover:bg-white/30">
                  TC3 - Education Matters
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white">
                  SDG Showcase
                </h1>
                <p className="text-lg text-white/90 max-w-xl">
                  At IFIP TC3, we're committed to driving innovation that advances the United Nations Sustainable Development Goals (SDGs) through the power of ICT. 
                </p>
                <div className="pt-4">
                  <Button asChild size="lg" className="rounded-full px-8 h-12 bg-white text-foreground hover:bg-white/90">
                    <Link href="/search" className="flex items-center gap-2">
                      Search Profiles
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-6 pt-8 mt-8 border-t border-white/20">
                  <div>
                    <p className="text-4xl font-normal text-white">20+</p>
                    <p className="text-sm text-white/80">Collaborating institutions across Europe</p>
                  </div>
                  <div>
                    <p className="text-4xl font-normal text-white">100+</p>
                    <p className="text-sm text-white/80">Research projects supporting the SDGs</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-3 mb-8">
            <div className="flex items-center">
              <span className="dot-indicator"></span>
              <span className="text-sm font-medium text-foreground">About Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl">Our Organization</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg">
                TC3 has four Working Groups and currently one Task Force.
              </p>
              <p>
                In the Working Groups professionals and researchers work together to examine current issues, 
                organise meetings, collaborate on research, develop publications etc.
              </p>
              
              <div className="mt-12 py-8 px-6 border-l-4 border-primary bg-muted/30 rounded">
                <blockquote className="text-lg italic font-medium">
                  IFIP is a federation of computer societies, so it brings together many people, from different areas 
                  of work and with different perspectives – people in industry and in commerce, developers, 
                  researchers, practitioners and policy makers.
                  
                  One of the wonderful things about IFIP is that it allows 
                  you to gain from that mix of people coming together. 
                </blockquote>
                <div className="mt-4 font-medium">
                  Professor Don Passey, Chair of TC3.
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-medium">Working Groups/Special Interest Groups:</h3>
              <ul className="space-y-4">
                <li className="border-l-2 border-primary pl-4 py-1">
                  <p className="font-medium">WG 3.1</p>
                  <p>Informatics and Digital Technologies in School Education</p>
                </li>
                <li className="border-l-2 border-primary pl-4 py-1">
                  <p className="font-medium">WG 3.3</p>
                  <p>Research into Educational Applications of Information Technologies</p>
                </li>
                <li className="border-l-2 border-primary pl-4 py-1">
                  <p className="font-medium">WG 3.4</p>
                  <p>Professional, Higher and Vocational Education in ICT</p>
                </li>
                <li className="border-l-2 border-primary pl-4 py-1">
                  <p className="font-medium">WG 3.7</p>
                  <p>Information Technology in Educational Management</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Impact Graph Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-3 mb-12">
            <div className="flex items-center">
              <span className="dot-indicator"></span>
              <span className="text-sm font-medium text-foreground">Our SDG Impact</span>
            </div>
            <h2 className="text-3xl md:text-4xl">Measuring our contributions</h2>
            <p className="text-muted-foreground max-w-2xl">
              Visualizing our contributions to the United Nations Sustainable Development Goals across research, education, and community initiatives.
            </p>
          </div>
          <div className="card">
            <SDGImpactChart />
          </div>
        </div>
      </section>

      {/* SDG Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-3 mb-12">
            <div className="flex items-center">
              <span className="dot-indicator"></span>
              <span className="text-sm font-medium text-foreground">Why choose us</span>
            </div>
            <h2 className="text-3xl md:text-4xl">Providing Excellence and Expertise in Every Solution</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="text-primary">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl">Quality Education</h3>
              <p className="text-muted-foreground">
                Providing inclusive and equitable quality education opportunities.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-primary">
                <Users size={24} />
              </div>
              <h3 className="text-xl">Partnerships</h3>
              <p className="text-muted-foreground">
                Building strong partnerships for sustainable development.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-primary">
                <Database size={24} />
              </div>
              <h3 className="text-xl">Innovation</h3>
              <p className="text-muted-foreground">
                Driving innovation and research for sustainable solutions.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="text-primary">
                <Globe size={24} />
              </div>
              <h3 className="text-xl">Global Impact</h3>
              <p className="text-muted-foreground">
                Creating meaningful change through international collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Member Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-3 mb-12 text-center">
            <div className="flex items-center justify-center">
              <span className="dot-indicator"></span>
              <span className="text-sm font-medium text-foreground">Executive Committee</span>
            </div>
            <h2 className="text-3xl md:text-4xl">Meet our Executive Committee</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get to know the dedicated leaders driving sustainable development initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src="/donpassy.jpg" 
                  alt="Prof. Don Passey" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-1 text-center">Prof. Don Passey</h3>
              <p className="text-muted-foreground text-center">CHAIR</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src="/rosa.jpg" 
                  alt="Prof. Rosa Bottino" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-1 text-center">Prof. Rosa Bottino</h3>
              <p className="text-muted-foreground text-center">VICE-CHAIR</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src="/sharon.jpg" 
                  alt="Mrs. Sharon Singh" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-1 text-center">Mrs. Sharon Singh</h3>
              <p className="text-muted-foreground text-center">SECRETARY</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src="/christoph.jpg" 
                  alt="Dr. Christoph Reffay" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-1 text-center">Dr. Christoph Reffay</h3>
              <p className="text-muted-foreground text-center">WG-Liaison</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src="/mary.jpg" 
                  alt="Dr. Mary Webb" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl mb-1 text-center">Dr. Mary Webb</h3>
              <p className="text-muted-foreground text-center">WEBSITE-Liaison</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
