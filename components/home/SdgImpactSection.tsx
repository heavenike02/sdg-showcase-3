import { SectionHeading } from './SectionHeading'
import SdgCircle from '@/components/sdg-circle'

export function SdgImpactSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Measuring our contributions" 
          subtitle="Our SDG Impact"
          description="Visualizing our contributions to the United Nations Sustainable Development Goals across research, education, and community initiatives."
        />
        <div className="card">
          <SdgCircle />           
        </div>
      </div>
    </section>
  )
} 