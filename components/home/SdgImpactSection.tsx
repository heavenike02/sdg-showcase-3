import { SectionHeading } from './SectionHeading'
import SdgCircleSummary from '@/components/sdg-circle-summary'

// Mock data for demonstration - in a real app, this would come from an API
const mockSdgSummaryData = [
  {
    sdgId: 3,
    researcherCount: 12,
    targetCounts: [
      { targetId: "3.1", researcherCount: 4 },
      { targetId: "3.2", researcherCount: 3 },
      { targetId: "3.3", researcherCount: 7 },
      { targetId: "3.4", researcherCount: 5 }
    ]
  },
  {
    sdgId: 4,
    researcherCount: 18,
    targetCounts: [
      { targetId: "4.1", researcherCount: 8 },
      { targetId: "4.2", researcherCount: 6 },
      { targetId: "4.3", researcherCount: 9 },
      { targetId: "4.4", researcherCount: 7 },
      { targetId: "4.5", researcherCount: 4 }
    ]
  },
  {
    sdgId: 7,
    researcherCount: 5,
    targetCounts: [
      { targetId: "7.1", researcherCount: 2 },
      { targetId: "7.2", researcherCount: 3 },
      { targetId: "7.3", researcherCount: 1 }
    ]
  },
  {
    sdgId: 9,
    researcherCount: 8,
    targetCounts: [
      { targetId: "9.1", researcherCount: 3 },
      { targetId: "9.4", researcherCount: 5 },
      { targetId: "9.5", researcherCount: 4 }
    ]
  },
  {
    sdgId: 11,
    researcherCount: 6,
    targetCounts: [
      { targetId: "11.1", researcherCount: 2 },
      { targetId: "11.3", researcherCount: 4 }
    ]
  },
  {
    sdgId: 13,
    researcherCount: 15,
    targetCounts: [
      { targetId: "13.1", researcherCount: 7 },
      { targetId: "13.2", researcherCount: 9 },
      { targetId: "13.3", researcherCount: 6 },
      { targetId: "13.B", researcherCount: 4 }
    ]
  }
]

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
          <SdgCircleSummary sdgSummary={mockSdgSummaryData} />           
        </div>
      </div>
    </section>
  )
} 