// Complete US States and Capitals Database
import { getRandomCitiesFromState } from './state-cities'

export interface StateData {
  id: string
  name: string
  capital: string
  region: 'Northeast' | 'Southeast' | 'Midwest' | 'Southwest' | 'West'
  nickname?: string
  statehood: number // Year
  // SVG path data will be added later for state shapes
  svgPath?: string
}

export type GameMode = 'easy' | 'very-american'

export const US_STATES: StateData[] = [
  // Northeast
  { id: 'ME', name: 'Maine', capital: 'Augusta', region: 'Northeast', nickname: 'Pine Tree State', statehood: 1820 },
  { id: 'NH', name: 'New Hampshire', capital: 'Concord', region: 'Northeast', nickname: 'Live Free or Die State', statehood: 1788 },
  { id: 'VT', name: 'Vermont', capital: 'Montpelier', region: 'Northeast', nickname: 'Green Mountain State', statehood: 1791 },
  { id: 'MA', name: 'Massachusetts', capital: 'Boston', region: 'Northeast', nickname: 'Bay State', statehood: 1788 },
  { id: 'RI', name: 'Rhode Island', capital: 'Providence', region: 'Northeast', nickname: 'Ocean State', statehood: 1790 },
  { id: 'CT', name: 'Connecticut', capital: 'Hartford', region: 'Northeast', nickname: 'Constitution State', statehood: 1788 },
  { id: 'NY', name: 'New York', capital: 'Albany', region: 'Northeast', nickname: 'Empire State', statehood: 1788 },
  { id: 'NJ', name: 'New Jersey', capital: 'Trenton', region: 'Northeast', nickname: 'Garden State', statehood: 1787 },
  { id: 'PA', name: 'Pennsylvania', capital: 'Harrisburg', region: 'Northeast', nickname: 'Keystone State', statehood: 1787 },

  // Southeast  
  { id: 'DE', name: 'Delaware', capital: 'Dover', region: 'Southeast', nickname: 'First State', statehood: 1787 },
  { id: 'MD', name: 'Maryland', capital: 'Annapolis', region: 'Southeast', nickname: 'Old Line State', statehood: 1788 },
  { id: 'VA', name: 'Virginia', capital: 'Richmond', region: 'Southeast', nickname: 'Old Dominion', statehood: 1788 },
  { id: 'WV', name: 'West Virginia', capital: 'Charleston', region: 'Southeast', nickname: 'Mountain State', statehood: 1863 },
  { id: 'NC', name: 'North Carolina', capital: 'Raleigh', region: 'Southeast', nickname: 'Tar Heel State', statehood: 1789 },
  { id: 'SC', name: 'South Carolina', capital: 'Columbia', region: 'Southeast', nickname: 'Palmetto State', statehood: 1788 },
  { id: 'GA', name: 'Georgia', capital: 'Atlanta', region: 'Southeast', nickname: 'Peach State', statehood: 1788 },
  { id: 'FL', name: 'Florida', capital: 'Tallahassee', region: 'Southeast', nickname: 'Sunshine State', statehood: 1845 },
  { id: 'KY', name: 'Kentucky', capital: 'Frankfort', region: 'Southeast', nickname: 'Bluegrass State', statehood: 1792 },
  { id: 'TN', name: 'Tennessee', capital: 'Nashville', region: 'Southeast', nickname: 'Volunteer State', statehood: 1796 },
  { id: 'AL', name: 'Alabama', capital: 'Montgomery', region: 'Southeast', nickname: 'Heart of Dixie', statehood: 1819 },
  { id: 'MS', name: 'Mississippi', capital: 'Jackson', region: 'Southeast', nickname: 'Magnolia State', statehood: 1817 },

  // Midwest
  { id: 'OH', name: 'Ohio', capital: 'Columbus', region: 'Midwest', nickname: 'Buckeye State', statehood: 1803 },
  { id: 'IN', name: 'Indiana', capital: 'Indianapolis', region: 'Midwest', nickname: 'Hoosier State', statehood: 1816 },
  { id: 'IL', name: 'Illinois', capital: 'Springfield', region: 'Midwest', nickname: 'Prairie State', statehood: 1818 },
  { id: 'MI', name: 'Michigan', capital: 'Lansing', region: 'Midwest', nickname: 'Great Lakes State', statehood: 1837 },
  { id: 'WI', name: 'Wisconsin', capital: 'Madison', region: 'Midwest', nickname: 'Badger State', statehood: 1848 },
  { id: 'MN', name: 'Minnesota', capital: 'Saint Paul', region: 'Midwest', nickname: 'Land of 10,000 Lakes', statehood: 1858 },
  { id: 'IA', name: 'Iowa', capital: 'Des Moines', region: 'Midwest', nickname: 'Hawkeye State', statehood: 1846 },
  { id: 'MO', name: 'Missouri', capital: 'Jefferson City', region: 'Midwest', nickname: 'Show-Me State', statehood: 1821 },
  { id: 'ND', name: 'North Dakota', capital: 'Bismarck', region: 'Midwest', nickname: 'Peace Garden State', statehood: 1889 },
  { id: 'SD', name: 'South Dakota', capital: 'Pierre', region: 'Midwest', nickname: 'Mount Rushmore State', statehood: 1889 },
  { id: 'NE', name: 'Nebraska', capital: 'Lincoln', region: 'Midwest', nickname: 'Cornhusker State', statehood: 1867 },
  { id: 'KS', name: 'Kansas', capital: 'Topeka', region: 'Midwest', nickname: 'Sunflower State', statehood: 1861 },

  // Southwest
  { id: 'TX', name: 'Texas', capital: 'Austin', region: 'Southwest', nickname: 'Lone Star State', statehood: 1845 },
  { id: 'OK', name: 'Oklahoma', capital: 'Oklahoma City', region: 'Southwest', nickname: 'Sooner State', statehood: 1907 },
  { id: 'AR', name: 'Arkansas', capital: 'Little Rock', region: 'Southwest', nickname: 'Natural State', statehood: 1836 },
  { id: 'LA', name: 'Louisiana', capital: 'Baton Rouge', region: 'Southwest', nickname: 'Pelican State', statehood: 1812 },
  { id: 'NM', name: 'New Mexico', capital: 'Santa Fe', region: 'Southwest', nickname: 'Land of Enchantment', statehood: 1912 },
  { id: 'AZ', name: 'Arizona', capital: 'Phoenix', region: 'Southwest', nickname: 'Grand Canyon State', statehood: 1912 },

  // West
  { id: 'WA', name: 'Washington', capital: 'Olympia', region: 'West', nickname: 'Evergreen State', statehood: 1889 },
  { id: 'OR', name: 'Oregon', capital: 'Salem', region: 'West', nickname: 'Beaver State', statehood: 1859 },
  { id: 'CA', name: 'California', capital: 'Sacramento', region: 'West', nickname: 'Golden State', statehood: 1850 },
  { id: 'NV', name: 'Nevada', capital: 'Carson City', region: 'West', nickname: 'Silver State', statehood: 1864 },
  { id: 'ID', name: 'Idaho', capital: 'Boise', region: 'West', nickname: 'Gem State', statehood: 1890 },
  { id: 'UT', name: 'Utah', capital: 'Salt Lake City', region: 'West', nickname: 'Beehive State', statehood: 1896 },
  { id: 'CO', name: 'Colorado', capital: 'Denver', region: 'West', nickname: 'Centennial State', statehood: 1876 },
  { id: 'WY', name: 'Wyoming', capital: 'Cheyenne', region: 'West', nickname: 'Equality State', statehood: 1890 },
  { id: 'MT', name: 'Montana', capital: 'Helena', region: 'West', nickname: 'Big Sky Country', statehood: 1889 },
  { id: 'AK', name: 'Alaska', capital: 'Juneau', region: 'West', nickname: 'Last Frontier', statehood: 1959 },
  { id: 'HI', name: 'Hawaii', capital: 'Honolulu', region: 'West', nickname: 'Aloha State', statehood: 1959 },
]

// Helper functions for game logic
export function getRandomStates(excludeState?: StateData, count: number = 2): StateData[] {
  const availableStates = excludeState 
    ? US_STATES.filter(state => state.id !== excludeState.id)
    : US_STATES
  
  const shuffled = [...availableStates].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function getRandomCapitals(excludeCapitals: string[] = [], count: number = 1): string[] {
  const availableCapitals = US_STATES
    .map(state => state.capital)
    .filter(capital => !excludeCapitals.includes(capital))
  
  const shuffled = [...availableCapitals].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function generateStateNameOptions(correctState: StateData): StateData[] {
  const wrongOptions = getRandomStates(correctState, 2)
  const allOptions = [correctState, ...wrongOptions]
  return shuffleArray(allOptions)
}

export function generateCapitalOptions(
  correctState: StateData, 
  userSelectedState: StateData,
  gameMode: GameMode = 'easy'
): { option: string; isCorrect: boolean }[] {
  const options: string[] = []
  
  if (gameMode === 'very-american') {
    // Very American mode: Use cities from the same state
    // Add correct capital
    options.push(correctState.capital)
    
    // Add random cities from the same state (not the capital)
    const randomCities = getRandomCitiesFromState(correctState.id, 2)
    options.push(...randomCities)
    
    // If we don't have enough cities, fall back to capitals from other states
    if (options.length < 3) {
      const excludeCapitals = [correctState.capital]
      const randomCapitals = getRandomCapitals(excludeCapitals, 3 - options.length)
      options.push(...randomCapitals)
    }
  } else {
    // Easy mode: Use capitals from other states (existing behavior)
    // Add correct capital
    options.push(correctState.capital)
    
    // Add capital of state user selected (if different)
    if (userSelectedState.id !== correctState.id) {
      options.push(userSelectedState.capital)
    }
    
    // Add random capital(s) to fill to 3 total
    const excludeCapitals = options
    const randomCapitals = getRandomCapitals(excludeCapitals, 3 - options.length)
    options.push(...randomCapitals)
  }
  
  // Create option objects with correct flag
  const optionObjects = options.map(city => ({
    option: city,
    isCorrect: city === correctState.capital
  }))
  
  return shuffleArray(optionObjects)
}

export default US_STATES

