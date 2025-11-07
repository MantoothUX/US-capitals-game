#!/usr/bin/env node

// Generate individual state-highlighted US maps from the master SVG
// Uses the Wikimedia Commons blank US map with accurate state boundaries

const fs = require('fs')
const path = require('path')

// All 50 US states
const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

function generateStateHighlightedMaps() {
  console.log('🗺️ Generating individual state maps from master SVG...\n')
  
  const masterSvgPath = path.join(__dirname, '../public/states/blank-us-map.svg')
  
  if (!fs.existsSync(masterSvgPath)) {
    console.error('❌ Master SVG not found. Please download it first.')
    return
  }
  
  // Read the master SVG
  let masterSvg = fs.readFileSync(masterSvgPath, 'utf8')
  console.log('✅ Loaded master SVG file')
  
  // Generate individual maps for each state
  US_STATES.forEach(stateId => {
    console.log(`🎨 Generating map for ${stateId}...`)
    
    // Create a modified version with this state highlighted
    let highlightedSvg = masterSvg
    
    // Add CSS to highlight the specific state with transparent background
    const cssStyle = `
    <style>
      .state {
        fill: #e5e7eb;
        stroke: #9ca3af;
        stroke-width: 0.5;
      }
      .${stateId.toLowerCase()} {
        fill: #dc2626 !important;
        stroke: #991b1b !important;
        stroke-width: 2 !important;
      }
      .water {
        fill: #bfdbfe;
      }
      /* Make background transparent */
      svg {
        background: transparent !important;
      }
    </style>`
    
    // Insert the CSS after the opening SVG tag
    highlightedSvg = highlightedSvg.replace(
      /<svg[^>]*>/,
      (match) => match + cssStyle
    )
    
    // Add class="state" to all path elements if not already present
    highlightedSvg = highlightedSvg.replace(
      /<path([^>]*id="[A-Z]{2}"[^>]*)/g,
      '<path class="state"$1'
    )
    
    // Save the individual state map
    const outputPath = path.join(__dirname, `../public/states/state-${stateId}-highlighted.svg`)
    fs.writeFileSync(outputPath, highlightedSvg)
    
    console.log(`✅ Created: state-${stateId}-highlighted.svg`)
  })
  
  console.log(`\n🎯 Generated ${US_STATES.length} individual state maps!`)
  console.log('📁 Files saved to: public/states/state-XX-highlighted.svg')
}

// Run if called directly
if (require.main === module) {
  generateStateHighlightedMaps()
}

module.exports = { generateStateHighlightedMaps }
