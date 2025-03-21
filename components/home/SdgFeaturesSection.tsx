import { SectionHeading } from './SectionHeading'
import { BookOpen, Users, Database, Globe } from 'lucide-react'

export function SdgFeaturesSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Providing Excellence and Expertise in Every Solution" 
          subtitle="Why choose us"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<BookOpen size={24} />}
            title="Quality Education"
            description="Providing inclusive and equitable quality education opportunities."
          />
          
          <FeatureCard 
            icon={<Users size={24} />}
            title="Partnerships"
            description="Building strong partnerships for sustainable development."
          />
          
          <FeatureCard 
            icon={<Database size={24} />}
            title="Innovation"
            description="Driving innovation and research for sustainable solutions."
          />
          
          <FeatureCard 
            icon={<Globe size={24} />}
            title="Global Impact"
            description="Creating meaningful change through international collaboration."
          />
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="space-y-4">
      <div className="text-primary/80">
        {icon}
      </div>
      <h3 className="text-xl">{title}</h3>
      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  )
} 