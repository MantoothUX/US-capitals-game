#!/usr/bin/env node

// Download state-in-US-map images from Wikipedia
// These show each state highlighted within the full US map

const https = require('https')
const fs = require('fs')
const path = require('path')

// All 50 states with their Wikipedia page names
const US_STATES = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming'
}

// Generate Wikipedia Commons URLs for "State in United States" images
function getWikipediaStateImageUrls(stateName) {
  const baseUrl = 'https://upload.wikimedia.org/wikipedia/commons'
  const formattedName = stateName.replace(' ', '_')
  
  return [
    // Pattern 1: Most common format
    `${baseUrl}/thumb/9/99/${formattedName}_in_United_States.svg/800px-${formattedName}_in_United_States.svg.png`,
    `${baseUrl}/thumb/c/c0/${formattedName}_in_United_States.svg/800px-${formattedName}_in_United_States.svg.png`,
    `${baseUrl}/thumb/5/50/${formattedName}_in_United_States.svg/800px-${formattedName}_in_United_States.svg.png`,
    `${baseUrl}/thumb/a/a0/${formattedName}_in_United_States.svg/800px-${formattedName}_in_United_States.svg.png`,
    `${baseUrl}/thumb/0/00/${formattedName}_in_United_States.svg/800px-${formattedName}_in_United_States.svg.png`,
    
    // Pattern 2: Alternative formats
    `${baseUrl}/thumb/b/b0/${formattedName}_in_United_States_%28orthographic_projection%29.svg/800px-${formattedName}_in_United_States_%28orthographic_projection%29.svg.png`,
    `${baseUrl}/thumb/d/d0/Map_of_USA_highlighting_${formattedName}.svg/800px-Map_of_USA_highlighting_${formattedName}.svg.png`,
    
    // Pattern 3: US state location maps
    `${baseUrl}/thumb/1/10/USA_${formattedName}_location_map.svg/800px-USA_${formattedName}_location_map.svg.png`,
    `${baseUrl}/thumb/2/20/US_location_map_${formattedName}.svg/800px-US_location_map_${formattedName}.svg.png`,
  ]
}

// Test if an image URL is accessible
function testImageUrl(url) {
  return new Promise((resolve) => {
    const request = https.get(url, (response) => {
      resolve(response.statusCode === 200)
    })
    
    request.on('error', () => resolve(false))
    request.setTimeout(5000, () => {
      request.destroy()
      resolve(false)
    })
  })
}

// Download an image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve(true)
        })
      } else {
        reject(new Error(`HTTP ${response.statusCode}`))
      }
    }).on('error', reject)
  })
}

// Main function to find and download all state images
async function downloadAllStateImages() {
  console.log('🗺️  Downloading Wikipedia state-in-US-map images...\n')
  
  const outputDir = path.join(__dirname, '../public/states')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  const results = {}
  let successCount = 0
  
  for (const [stateId, stateName] of Object.entries(US_STATES)) {
    console.log(`🔍 Finding image for ${stateId} (${stateName})...`)
    
    const urls = getWikipediaStateImageUrls(stateName)
    let imageFound = false
    
    for (const url of urls) {
      try {
        const isAccessible = await testImageUrl(url)
        if (isAccessible) {
          console.log(`✅ Found: ${url}`)
          
          // Download the image
          const filename = `state-${stateId}-in-us.png`
          const filepath = path.join(outputDir, filename)
          
          await downloadImage(url, filepath)
          console.log(`💾 Downloaded: ${filename}`)
          
          results[stateId] = {
            name: stateName,
            imageUrl: url,
            localFile: filename,
            success: true
          }
          
          successCount++
          imageFound = true
          break
        }
      } catch (error) {
        console.log(`❌ Error downloading ${url}: ${error.message}`)
      }
    }
    
    if (!imageFound) {
      console.log(`⚠️  No accessible image found for ${stateId}`)
      results[stateId] = {
        name: stateName,
        success: false
      }
    }
    
    console.log('') // Empty line for readability
  }
  
  // Save results
  fs.writeFileSync(
    path.join(outputDir, 'download-results.json'),
    JSON.stringify(results, null, 2)
  )
  
  console.log('📊 SUMMARY:')
  console.log(`✅ Successfully downloaded: ${successCount}/50 states`)
  console.log(`❌ Failed: ${50 - successCount}/50 states`)
  console.log('\n🎯 Images saved to: public/states/')
  console.log('📄 Results logged to: public/states/download-results.json')
  
  return results
}

// Run if called directly
if (require.main === module) {
  downloadAllStateImages().catch(console.error)
}

module.exports = { downloadAllStateImages, getWikipediaStateImageUrls }





