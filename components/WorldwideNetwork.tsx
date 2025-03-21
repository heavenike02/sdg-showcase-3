'use client'

import { motion } from 'framer-motion'
import { WorldMap } from './ui/world-map'

export const countryCoordinates: Record<string, { lat: number; lng: number; name: string }> = {
  AT: { lat: 47.5162, lng: 14.5501, name: 'Austria' },
  AU: { lat: -25.2744, lng: 133.7751, name: 'Australia' },
  BG: { lat: 42.7339, lng: 25.4858, name: 'Bulgaria' },
  BR: { lat: -14.2350, lng: -51.9253, name: 'Brazil' },
  CA: { lat: 56.1304, lng: -106.3468, name: 'Canada' },
  CH: { lat: 46.8182, lng: 8.2275, name: 'Switzerland' },
  CL: { lat: -35.6751, lng: -71.5430, name: 'Chile' },
  CN: { lat: 35.8617, lng: 104.1954, name: 'China' },
  CY: { lat: 35.1264, lng: 33.4299, name: 'Cyprus' },
  CZ: { lat: 49.8175, lng: 15.473, name: 'Czech Republic' },
  DE: { lat: 51.1657, lng: 10.4515, name: 'Germany' },
  DK: { lat: 56.2639, lng: 9.5018, name: 'Denmark' },
  EE: { lat: 58.5953, lng: 25.0136, name: 'Estonia' },
  ES: { lat: 40.4637, lng: -3.7492, name: 'Spain' },
  FI: { lat: 61.9241, lng: 25.7482, name: 'Finland' },
  FR: { lat: 46.2276, lng: 2.2137, name: 'France' },
  GB: { lat: 55.3781, lng: -3.436, name: 'United Kingdom' },
  GR: { lat: 39.0742, lng: 21.8243, name: 'Greece' },
  HU: { lat: 47.1625, lng: 19.5033, name: 'Hungary' },
  IE: { lat: 53.1424, lng: -7.6921, name: 'Ireland' },
  IL: { lat: 31.0461, lng: 34.8516, name: 'Israel' },
  IN: { lat: 20.5937, lng: 78.9629, name: 'India' },
  IT: { lat: 41.8719, lng: 12.5674, name: 'Italy' },
  JP: { lat: 36.2048, lng: 138.2529, name: 'Japan' },
  KE: { lat: -0.0236, lng: 37.9062, name: 'Kenya' },
  KR: { lat: 35.9078, lng: 127.7669, name: 'South Korea' },
  LT: { lat: 55.1694, lng: 23.8813, name: 'Lithuania' },
  LV: { lat: 56.8796, lng: 24.6032, name: 'Latvia' },
  MY: { lat: 4.2105, lng: 101.9758, name: 'Malaysia' },
  NG: { lat: 9.0820, lng: 8.6753, name: 'Nigeria' },
  NL: { lat: 52.1326, lng: 5.2913, name: 'Netherlands' },
  NO: { lat: 60.472, lng: 8.4689, name: 'Norway' },
  NZ: { lat: -40.9006, lng: 174.886, name: 'New Zealand' },
  PA: { lat: 8.5380, lng: -80.7821, name: 'Panama' },
  PK: { lat: 30.3753, lng: 69.3451, name: 'Pakistan' },
  PL: { lat: 51.9194, lng: 19.1451, name: 'Poland' },
  PT: { lat: 39.3999, lng: -8.2245, name: 'Portugal' },
  RS: { lat: 44.0165, lng: 21.0059, name: 'Serbia' },
  RU: { lat: 61.524, lng: 105.3188, name: 'Russia' },
  SE: { lat: 60.1282, lng: 18.6435, name: 'Sweden' },
  SG: { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
  SI: { lat: 46.1512, lng: 14.9955, name: 'Slovenia' },
  SK: { lat: 48.669, lng: 19.699, name: 'Slovakia' },
  TR: { lat: 38.9637, lng: 35.2433, name: 'Turkey' },
  TZ: { lat: -6.369, lng: 34.8888, name: 'Tanzania' },
  UA: { lat: 48.3794, lng: 31.1656, name: 'Ukraine' },
  US: { lat: 37.0902, lng: -95.7129, name: 'United States' },
  ZA: { lat: -30.5595, lng: 22.9375, name: 'South Africa' },
  ZW: { lat: -19.0154, lng: 29.1549, name: 'Zimbabwe' },
}

export function WorldwideNetwork() {
  const countryPoints = Object.values(countryCoordinates)
  
  // Define connection lines between key research/collaboration hubs
  const connectionLines = [
    // US to Europe (UK)
    {
      start: countryCoordinates.US,
      end: countryCoordinates.GB
    },
    // Europe (Germany) to Asia (Japan)
    {
      start: countryCoordinates.DE,
      end: countryCoordinates.JP
    },
    // Australia to Europe (Italy)
    {
      start: countryCoordinates.AU,
      end: countryCoordinates.IT
    },
    // Africa (Kenya) to Europe (Switzerland)
    {
      start: countryCoordinates.KE,
      end: countryCoordinates.CH
    },
    // South America (Brazil) to Europe (Spain)
    {
      start: countryCoordinates.BR,
      end: countryCoordinates.ES
    },
    // Asia (India) to Africa (South Africa)
    {
      start: countryCoordinates.IN,
      end: countryCoordinates.ZA
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