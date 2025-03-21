import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/home/HeroSection"
import { AboutSection } from "@/components/home/AboutSection"
import { SdgImpactSection } from "@/components/home/SdgImpactSection"
import { SdgFeaturesSection } from "@/components/home/SdgFeaturesSection"
import { CommitteeSection } from "@/components/home/CommitteeSection"
import { NetworkSection } from "@/components/home/NetworkSection"

const Index = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <HeroSection />
      <SdgImpactSection />
      <AboutSection />
      <SdgFeaturesSection />
      <CommitteeSection />
      <NetworkSection />
    </div>
  )
}

export default Index
