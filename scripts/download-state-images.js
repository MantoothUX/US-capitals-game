#!/usr/bin/env node

// Script to download accurate state outline images from public sources
// This will populate our /public/states/ directory with real state shapes

const https = require('https')
const fs = require('fs')
const path = require('path')

// State mapping for different URL patterns
const stateData = {
  TX: { name: 'Texas', nickname: 'Lone Star State' },
  CA: { name: 'California', nickname: 'Golden State' },
  FL: { name: 'Florida', nickname: 'Sunshine State' },
  NY: { name: 'New York', nickname: 'Empire State' },
  MI: { name: 'Michigan', nickname: 'Great Lakes State' },
  AK: { name: 'Alaska', nickname: 'Last Frontier' },
  HI: { name: 'Hawaii', nickname: 'Aloha State' },
  CO: { name: 'Colorado', nickname: 'Centennial State' },
  WY: { name: 'Wyoming', nickname: 'Equality State' },
  WA: { name: 'Washington', nickname: 'Evergreen State' },
  OR: { name: 'Oregon', nickname: 'Beaver State' },
  ID: { name: 'Idaho', nickname: 'Gem State' },
  NV: { name: 'Nevada', nickname: 'Silver State' },
  UT: { name: 'Utah', nickname: 'Beehive State' },
  AZ: { name: 'Arizona', nickname: 'Grand Canyon State' },
  NM: { name: 'New Mexico', nickname: 'Land of Enchantment' },
  MT: { name: 'Montana', nickname: 'Big Sky Country' },
  ND: { name: 'North Dakota', nickname: 'Peace Garden State' },
  SD: { name: 'South Dakota', nickname: 'Mount Rushmore State' },
  NE: { name: 'Nebraska', nickname: 'Cornhusker State' },
  KS: { name: 'Kansas', nickname: 'Sunflower State' },
  OK: { name: 'Oklahoma', nickname: 'Sooner State' },
  MN: { name: 'Minnesota', nickname: 'Land of 10,000 Lakes' },
  WI: { name: 'Wisconsin', nickname: 'Badger State' },
  IA: { name: 'Iowa', nickname: 'Hawkeye State' },
  MO: { name: 'Missouri', nickname: 'Show-Me State' },
  AR: { name: 'Arkansas', nickname: 'Natural State' },
  LA: { name: 'Louisiana', nickname: 'Pelican State' },
  IL: { name: 'Illinois', nickname: 'Prairie State' },
  IN: { name: 'Indiana', nickname: 'Hoosier State' },
  OH: { name: 'Ohio', nickname: 'Buckeye State' },
  KY: { name: 'Kentucky', nickname: 'Bluegrass State' },
  TN: { name: 'Tennessee', nickname: 'Volunteer State' },
  MS: { name: 'Mississippi', nickname: 'Magnolia State' },
  AL: { name: 'Alabama', nickname: 'Heart of Dixie' },
  GA: { name: 'Georgia', nickname: 'Peach State' },
  SC: { name: 'South Carolina', nickname: 'Palmetto State' },
  NC: { name: 'North Carolina', nickname: 'Tar Heel State' },
  VA: { name: 'Virginia', nickname: 'Old Dominion' },
  WV: { name: 'West Virginia', nickname: 'Mountain State' },
  MD: { name: 'Maryland', nickname: 'Old Line State' },
  DE: { name: 'Delaware', nickname: 'First State' },
  PA: { name: 'Pennsylvania', nickname: 'Keystone State' },
  NJ: { name: 'New Jersey', nickname: 'Garden State' },
  CT: { name: 'Connecticut', nickname: 'Constitution State' },
  RI: { name: 'Rhode Island', nickname: 'Ocean State' },
  MA: { name: 'Massachusetts', nickname: 'Bay State' },
  VT: { name: 'Vermont', nickname: 'Green Mountain State' },
  NH: { name: 'New Hampshire', nickname: 'Live Free or Die State' },
  ME: { name: 'Maine', nickname: 'Pine Tree State' },
}

// Generate potential URLs for each state
function getImageUrls(stateId, stateName) {
  const wikiBase = 'https://upload.wikimedia.org/wikipedia/commons'
  const name = stateName.replace(' ', '_')
  
  return [
    // Try various Wikimedia Commons patterns
    `${wikiBase}/thumb/0/00/Map_of_USA_${stateId}.svg/800px-Map_of_USA_${stateId}.svg.png`,
    `${wikiBase}/thumb/5/50/Outline_map_of_${name}.svg/800px-Outline_map_of_${name}.svg.png`,
    `${wikiBase}/thumb/a/a0/Blank_map_of_${name}.svg/800px-Blank_map_of_${name}.svg.png`,
    `${wikiBase}/thumb/c/c0/${name}_outline.svg/800px-${name}_outline.svg.png`,
  ]
}

// Create a simple test to check if we can access an image
async function testImageUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode === 200)
    }).on('error', () => {
      resolve(false)
    })
  })
}

// Main function
async function findStateImages() {
  console.log('🔍 Searching for state outline images...')
  
  const results = {}
  
  for (const [stateId, data] of Object.entries(stateData)) {
    console.log(`\nChecking ${stateId} (${data.name})...`)
    const urls = getImageUrls(stateId, data.name)
    
    for (const url of urls) {
      const isAccessible = await testImageUrl(url)
      if (isAccessible) {
        console.log(`✅ Found: ${url}`)
        results[stateId] = url
        break
      } else {
        console.log(`❌ Not found: ${url}`)
      }
    }
    
    if (!results[stateId]) {
      console.log(`⚠️  No image found for ${stateId}`)
    }
  }
  
  console.log('\n📊 Results Summary:')
  console.log(`Found images for ${Object.keys(results).length} states`)
  console.log('Working URLs:', JSON.stringify(results, null, 2))
  
  // Save results to a file
  fs.writeFileSync(
    path.join(__dirname, '../src/data/state-image-urls.json'),
    JSON.stringify(results, null, 2)
  )
  
  console.log('\n✅ Results saved to src/data/state-image-urls.json')
}

if (require.main === module) {
  findStateImages().catch(console.error)
}

module.exports = { getImageUrls, testImageUrl }


