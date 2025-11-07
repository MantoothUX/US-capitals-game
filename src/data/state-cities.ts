// Major cities for each US state (excluding capitals)
// Used for "Very American" mode - harder difficulty where wrong answers are cities from the same state

export interface StateCities {
  stateId: string
  cities: string[] // Major cities excluding the capital
}

export const STATE_CITIES: StateCities[] = [
  // Northeast
  { stateId: 'ME', cities: ['Portland', 'Lewiston', 'Bangor', 'South Portland'] },
  { stateId: 'NH', cities: ['Manchester', 'Nashua', 'Derry', 'Dover'] },
  { stateId: 'VT', cities: ['Burlington', 'Rutland', 'South Burlington', 'Barre'] },
  { stateId: 'MA', cities: ['Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Brockton'] },
  { stateId: 'RI', cities: ['Warwick', 'Cranston', 'Pawtucket', 'Newport'] },
  { stateId: 'CT', cities: ['Bridgeport', 'New Haven', 'Stamford', 'Waterbury'] },
  { stateId: 'NY', cities: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse'] },
  { stateId: 'NJ', cities: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison'] },
  { stateId: 'PA', cities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading'] },
  
  // Southeast
  { stateId: 'DE', cities: ['Wilmington', 'Newark', 'Middletown', 'Smyrna'] },
  { stateId: 'MD', cities: ['Baltimore', 'Columbia', 'Germantown', 'Silver Spring', 'Waldorf'] },
  { stateId: 'VA', cities: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Newport News', 'Alexandria'] },
  { stateId: 'WV', cities: ['Huntington', 'Morgantown', 'Parkersburg', 'Wheeling'] },
  { stateId: 'NC', cities: ['Charlotte', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville'] },
  { stateId: 'SC', cities: ['Charleston', 'Greenville', 'North Charleston', 'Mount Pleasant', 'Rock Hill'] },
  { stateId: 'GA', cities: ['Columbus', 'Augusta', 'Macon', 'Savannah', 'Athens'] },
  { stateId: 'FL', cities: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St. Petersburg'] },
  { stateId: 'KY', cities: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'] },
  { stateId: 'TN', cities: ['Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro'] },
  { stateId: 'AL', cities: ['Birmingham', 'Huntsville', 'Mobile', 'Tuscaloosa', 'Hoover'] },
  { stateId: 'MS', cities: ['Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi', 'Meridian'] },
  
  // Midwest
  { stateId: 'OH', cities: ['Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton'] },
  { stateId: 'IN', cities: ['Fort Wayne', 'Evansville', 'South Bend', 'Carmel', 'Bloomington'] },
  { stateId: 'IL', cities: ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville'] },
  { stateId: 'MI', cities: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor'] },
  { stateId: 'WI', cities: ['Milwaukee', 'Green Bay', 'Kenosha', 'Racine', 'Appleton'] },
  { stateId: 'MN', cities: ['Minneapolis', 'Rochester', 'Bloomington', 'Duluth', 'Plymouth'] },
  { stateId: 'IA', cities: ['Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City', 'Waterloo'] },
  { stateId: 'MO', cities: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence'] },
  { stateId: 'ND', cities: ['Fargo', 'Grand Forks', 'Minot', 'West Fargo'] },
  { stateId: 'SD', cities: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings'] },
  { stateId: 'NE', cities: ['Omaha', 'Bellevue', 'Grand Island', 'Kearney'] },
  { stateId: 'KS', cities: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe'] },
  
  // Southwest
  { stateId: 'TX', cities: ['Houston', 'San Antonio', 'Dallas', 'Fort Worth', 'El Paso'] },
  { stateId: 'OK', cities: ['Tulsa', 'Norman', 'Broken Arrow', 'Lawton', 'Edmond'] },
  { stateId: 'AR', cities: ['Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro', 'Rogers'] },
  { stateId: 'LA', cities: ['New Orleans', 'Shreveport', 'Lafayette', 'Lake Charles', 'Kenner'] },
  { stateId: 'NM', cities: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Roswell'] },
  { stateId: 'AZ', cities: ['Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Glendale'] },
  
  // West
  { stateId: 'WA', cities: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'] },
  { stateId: 'OR', cities: ['Portland', 'Eugene', 'Gresham', 'Hillsboro', 'Beaverton'] },
  { stateId: 'CA', cities: ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno'] },
  { stateId: 'NV', cities: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'] },
  { stateId: 'ID', cities: ['Nampa', 'Meridian', 'Idaho Falls', 'Pocatello', 'Caldwell'] },
  { stateId: 'UT', cities: ['Provo', 'West Valley City', 'West Jordan', 'Orem', 'Sandy'] },
  { stateId: 'CO', cities: ['Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Thornton'] },
  { stateId: 'WY', cities: ['Casper', 'Laramie', 'Gillette', 'Rock Springs'] },
  { stateId: 'MT', cities: ['Billings', 'Missoula', 'Great Falls', 'Bozeman'] },
  { stateId: 'AK', cities: ['Anchorage', 'Fairbanks', 'Wasilla', 'Sitka', 'Ketchikan'] },
  { stateId: 'HI', cities: ['Pearl City', 'Hilo', 'Kailua', 'Waipahu', 'Kaneohe'] },
]

// Helper function to get cities for a state
export function getCitiesForState(stateId: string): string[] {
  const stateData = STATE_CITIES.find(s => s.stateId === stateId)
  return stateData ? stateData.cities : []
}

// Helper function to get random cities from a state
export function getRandomCitiesFromState(stateId: string, count: number = 2): string[] {
  const cities = getCitiesForState(stateId)
  const shuffled = [...cities].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
