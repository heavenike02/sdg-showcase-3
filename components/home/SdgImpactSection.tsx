import { SectionHeading } from './SectionHeading'
import SdgCircleSummary from '@/components/sdg-circle-summary'
import { fetchSdgSummaryData } from '@/queries/fetch-assessment-data'
import { Suspense } from 'react'


// Async component to fetch SDG summary data
async function SdgSummaryWithData() {
  // Fetch real data from the database
  const sdgSummaryData = await fetchSdgSummaryData()
  
  return <SdgCircleSummary sdgSummary={sdgSummaryData} />
}

// Skeleton loader for the SDG circle
function SdgCircleSkeleton() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg"></div>
      <div className="relative w-full aspect-square max-w-xl mx-auto bg-gray-200 rounded-full"></div>
    </div>
  )
}

export function SdgImpactSection() {
  return (
    <section className="pt-8 pb-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Measuring our Contribution" 
          subtitle="Tracking our Progress"
          description="Visualizing our  contributions to the United Nations Sustainable Development Goals across research, education, and community initiatives."
        />
        <div className="card">
          <Suspense fallback={<SdgCircleSkeleton />}>
            <SdgSummaryWithData />
          </Suspense>
        </div>
      </div>
    </section>
  )
} 