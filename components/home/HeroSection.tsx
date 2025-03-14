import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50"></div>
        <Image 
          src="/ifip.jpg" 
          alt="Students collaborating on sustainable development project"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          priority
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
                At IFIP TC3, we&apos;re committed to driving innovation that advances the United Nations Sustainable Development Goals (SDGs) through the power of ICT. 
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
  )
} 