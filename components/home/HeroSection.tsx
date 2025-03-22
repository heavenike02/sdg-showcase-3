'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dark Overlay - Always Present */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        {/* Animated Overlay for Additional Fade Effect */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black/20 z-20"
        />
        
        {/* Background Image with Scale Animation */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <Image 
            src="/MotherEarth_Illustration_byAshishGoyal.png" 
            alt="Students collaborating on sustainable development project"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            priority
          />
        </motion.div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-30 flex-1 flex flex-col">
        <section className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl space-y-6">
              {/* Badge */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge variant="secondary" className="bg-white/20 text-white border-white/10 hover:bg-white/30 text-lg">
                  TC3 - Education Matters
                </Badge>
              </motion.div>
              
              {/* Heading */}
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white"
              >
                SDG Showcase
              </motion.h1>
              
              {/* Description */}
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg text-white/90 max-w-xl"
              >
                At IFIP TC3, we are committed to advancing the United Nations Sustainable Development Goals (SDGs). This site serves as a showcase of the work that TC3 members are undertaking across education, research, and community initiatives, each contributing to the achievement of the SDGs. 
              </motion.p>
              
              {/* CTA Button */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="pt-4"
              >
                <Button asChild size="lg" className="rounded-full px-8 h-12 bg-white text-foreground hover:bg-white/90">
                  <Link href="/search" className="flex items-center gap-2">
                    Search Profiles
                    <motion.span 
                      initial={{ x: -5 }}
                      animate={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
