// US State SVG Paths with recognizable geographic boundaries
import statePaths from './us-state-paths.json'

// Type the imported JSON
const STATE_SVG_PATHS: Record<string, string> = statePaths

// Additional detailed paths for the most distinctive states
const ENHANCED_PATHS: Record<string, string> = {
  // Texas with distinctive panhandle
  TX: 'M 280,340 L 320,340 L 320,320 L 380,320 L 440,320 L 480,320 L 480,360 L 480,400 L 460,420 L 440,440 L 420,450 L 400,460 L 380,460 L 360,450 L 340,440 L 320,420 L 300,400 L 280,380 L 260,360 L 260,340 L 280,340 Z',
  
  // California with coast
  CA: 'M 40,180 L 60,160 L 70,170 L 80,190 L 90,210 L 100,240 L 100,270 L 95,300 L 90,330 L 85,360 L 80,390 L 70,410 L 60,420 L 50,410 L 40,390 L 30,360 L 25,330 L 20,300 L 20,270 L 25,240 L 30,210 L 40,180 Z',
  
  // Florida peninsula
  FL: 'M 640,380 L 670,380 L 690,390 L 700,410 L 710,430 L 720,450 L 730,470 L 740,490 L 745,510 L 740,520 L 730,515 L 720,500 L 710,480 L 700,460 L 690,440 L 680,420 L 670,400 L 660,390 L 640,380 Z',
  
  // Michigan with two parts
  MI: 'M 620,180 L 640,170 L 660,175 L 670,190 L 665,210 L 650,220 L 630,215 L 615,200 L 620,180 Z M 600,150 L 620,145 L 630,155 L 625,165 L 610,170 L 595,165 L 600,150 Z',
  
  // Alaska with islands
  AK: 'M 80,440 L 120,430 L 160,435 L 190,450 L 210,470 L 200,490 L 180,500 L 150,495 L 120,485 L 90,470 L 70,450 L 80,440 Z M 60,480 L 70,475 L 75,480 L 70,485 L 60,480 Z M 40,490 L 50,485 L 55,490 L 50,495 L 40,490 Z',
  
  // Hawaii island chain
  HI: 'M 250,500 L 255,498 L 258,500 L 255,502 L 250,500 Z M 265,498 L 270,496 L 273,498 L 270,500 L 265,498 Z M 280,496 L 285,494 L 288,496 L 285,498 L 280,496 Z M 295,494 L 300,492 L 303,494 L 300,496 L 295,494 Z M 310,492 L 315,490 L 318,492 L 315,494 L 310,492 Z M 325,490 L 330,488 L 333,490 L 330,492 L 325,490 Z M 340,488 L 345,486 L 348,488 L 345,490 L 340,488 Z',
  
  // New York with Long Island
  NY: 'M 740,160 L 780,155 L 810,160 L 815,175 L 810,190 L 790,195 L 770,190 L 750,185 L 745,170 L 740,160 Z M 815,175 L 830,173 L 835,175 L 830,177 L 815,175 Z',
  
  // Colorado - perfect rectangle
  CO: 'M 300,260 L 420,260 L 420,320 L 300,320 L 300,260 Z',
  
  // Wyoming - perfect rectangle
  WY: 'M 300,200 L 420,200 L 420,260 L 300,260 L 300,200 Z'
}

// Function to get the state path - uses enhanced path if available, otherwise falls back to standard
export function getStatePath(stateId: string): string {
  // First check enhanced paths for better shapes
  if (ENHANCED_PATHS[stateId]) {
    return ENHANCED_PATHS[stateId]
  }
  
  // Fall back to standard paths
  if (STATE_SVG_PATHS[stateId]) {
    return STATE_SVG_PATHS[stateId]
  }
  
  // Default rectangle if state not found
  return 'M 100,100 L 200,100 L 200,200 L 100,200 L 100,100 Z'
}

// Export for reference
export { STATE_SVG_PATHS, ENHANCED_PATHS }