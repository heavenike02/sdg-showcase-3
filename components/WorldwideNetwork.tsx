'use client'

import { motion } from 'framer-motion'
import { WorldMap } from './ui/world-map'

export const countryCoordinates: Record<string, { lat: number; lng: number; name: string }> = {
  AT: { lat: 47.5162, lng: 14.5501, name: 'Austria' },
  AU: { lat: -25.2744, lng: 133.7751, name: 'Australia' },
  BG: { lat: 42.7339, lng: 25.4858, name: 'Bulgaria' },
  BR: { lat: -14.2350, lng: -51.9253, name: 'Brazil' },
  CA: { lat: 43.6532, lng: -79.3832, name: 'Canada' },
  CH: { lat: 46.8182, lng: 8.2275, name: 'Switzerland' },
  CL: { lat: -35.6751, lng: -71.5430, name: 'Chile' },
  CN: { lat: 35.8617, lng: 104.1954, name: 'China' },
  CY: { lat: 35.1264, lng: 33.4299, name: 'Cyprus' },
  CZ: { lat: 49.8175, lng: 15.4730, name: 'Czech Republic' },
  DE: { lat: 51.1657, lng: 10.4515, name: 'Germany' },
  DK: { lat: 55.6761, lng: 12.5683, name: 'Denmark' },
  EE: { lat: 58.5953, lng: 25.0136, name: 'Estonia' },
  ES: { lat: 40.4637, lng: -3.7492, name: 'Spain' },
  FI: { lat: 60.1699, lng: 24.9384, name: 'Finland' },
  FR: { lat: 46.2276, lng: 2.2137, name: 'France' },
  GB: { lat: 51.5074, lng: -0.1278, name: 'United Kingdom' },
  GR: { lat: 37.9838, lng: 23.7275, name: 'Greece' },
  HU: { lat: 47.4979, lng: 19.0402, name: 'Hungary' },
  IE: { lat: 53.3498, lng: -6.2603, name: 'Ireland' },
  IL: { lat: 31.0461, lng: 34.8516, name: 'Israel' },
  IN: { lat: 20.5937, lng: 78.9629, name: 'India' },
  IT: { lat: 41.8719, lng: 12.5674, name: 'Italy' },
  JP: { lat: 35.6762, lng: 139.6503, name: 'Japan' },
  KE: { lat: -1.2921, lng: 36.8219, name: 'Kenya' },
  KR: { lat: 37.5665, lng: 126.9780, name: 'South Korea' },
  LT: { lat: 54.6872, lng: 25.2797, name: 'Lithuania' },
  LV: { lat: 56.9496, lng: 24.1052, name: 'Latvia' },
  MY: { lat: 3.1390, lng: 101.6869, name: 'Malaysia' },
  NG: { lat: 9.0820, lng: 8.6753, name: 'Nigeria' },
  NL: { lat: 52.3676, lng: 4.9041, name: 'Netherlands' },
  NO: { lat: 59.9139, lng: 10.7522, name: 'Norway' },
  NZ: { lat: -41.2866, lng: 174.7756, name: 'New Zealand' },
  PA: { lat: 8.9824, lng: -79.5199, name: 'Panama' },
  PK: { lat: 33.6844, lng: 73.0479, name: 'Pakistan' },
  PL: { lat: 52.2297, lng: 21.0122, name: 'Poland' },
  PT: { lat: 38.7223, lng: -9.1393, name: 'Portugal' },
  RS: { lat: 44.7866, lng: 20.4489, name: 'Serbia' },
  RU: { lat: 55.7558, lng: 37.6173, name: 'Russia' },
  SE: { lat: 59.3293, lng: 18.0686, name: 'Sweden' },
  SG: { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
  SI: { lat: 46.0569, lng: 14.5058, name: 'Slovenia' },
  SK: { lat: 48.1486, lng: 17.1077, name: 'Slovakia' },
  TR: { lat: 38.9637, lng: 35.2433, name: 'Turkey' },
  TZ: { lat: -6.3690, lng: 34.8888, name: 'Tanzania' },
  UA: { lat: 50.4501, lng: 30.5234, name: 'Ukraine' },
  US: { lat: 38.8977, lng: -77.0365, name: 'United States' },
  ZA: { lat: -33.9249, lng: 18.4241, name: 'South Africa' },
  ZW: { lat: -17.8292, lng: 31.0522, name: 'Zimbabwe' }
}

export function WorldwideNetwork() {
  const countryPoints = Object.values(countryCoordinates)
  
  // Define connection lines between key research/collaboration hubs
  const connectionLines = [
    // North America to Europe
    {
      start: countryCoordinates.US,
      end: countryCoordinates.GB
    },
    // Europe to Asia
    {
      start: countryCoordinates.DE,
      end: countryCoordinates.JP
    },
    // Australia to Europe
    {
      start: countryCoordinates.AU,
      end: countryCoordinates.IT
    },
    // Africa to Europe
    {
      start: countryCoordinates.KE,
      end: countryCoordinates.CH
    },
    // South America to Europe
    {
      start: countryCoordinates.BR,
      end: countryCoordinates.ES
    },
    // Asia to Africa
    {
      start: countryCoordinates.IN,
      end: countryCoordinates.ZA
    },
    // Additional connections for better visual effect
    {
      start: countryCoordinates.CA,
      end: countryCoordinates.FR
    },
    {
      start: countryCoordinates.SG,
      end: countryCoordinates.AU
    }
  ]

  return (
    <div className="relative">
      {/* Top visual connector */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-secondary to-transparent w-1 h-16"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <span className="dot-indicator"></span>
            <div className="w-2 h-2 rounded-full bg-primary mx-2"></div>
            <span className="text-sm font-medium text-foreground">Global Presence</span>
          </div>
     
          
          <h3 className="text-2xl md:text-3xl font-medium mb-4">Our Worldwide Network</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            IFIP TC3 connects educators, researchers, and practitioners across the globe, 
            fostering collaboration and knowledge exchange in educational technology.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" style={{ zIndex: -1 }}></div>
          <WorldMap 
            countryPoints={countryPoints} 
            dots={connectionLines} 
            lineColor="#0ea5e9" 
          />
        </motion.div>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-primary/10 rounded-full px-4 py-1">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              <span className="text-sm font-medium">45+ Countries</span>
            </div>
            <div className="flex items-center bg-primary/10 rounded-full px-4 py-1">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              <span className="text-sm font-medium">6 Continents</span>
            </div>
            <div className="flex items-center bg-primary/10 rounded-full px-4 py-1">
              <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
              <span className="text-sm font-medium">Global Collaboration</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 