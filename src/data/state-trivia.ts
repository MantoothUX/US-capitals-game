// Comprehensive state trivia database for rotating hints
// Excludes state names and capitals to avoid giving away answers

export interface StateTrivia {
  stateFlower: string
  stateBird: string
  stateMotto: string
  stateNut?: string
  stateAnimal?: string
  stateTree?: string
  stateSong?: string
  largestCity?: string
  famousFor: string[]
  established: number
  nickname: string
}

export const STATE_TRIVIA: Record<string, StateTrivia> = {
  TX: {
    stateFlower: "Bluebonnet",
    stateBird: "Mockingbird", 
    stateMotto: "Friendship",
    stateNut: "Pecan",
    stateAnimal: "Armadillo",
    stateTree: "Pecan Tree",
    largestCity: "Houston",
    famousFor: ["Oil", "Cowboys", "BBQ", "Space exploration"],
    established: 1845,
    nickname: "Lone Star State"
  },
  
  CA: {
    stateFlower: "Golden Poppy",
    stateBird: "California Quail",
    stateMotto: "Eureka (I have found it)",
    stateAnimal: "California Grizzly Bear",
    stateTree: "Coast Redwood",
    largestCity: "Los Angeles", 
    famousFor: ["Hollywood", "Silicon Valley", "Wine", "Beaches"],
    established: 1850,
    nickname: "Golden State"
  },
  
  FL: {
    stateFlower: "Orange Blossom",
    stateBird: "Mockingbird",
    stateMotto: "In God We Trust", 
    stateAnimal: "Florida Panther",
    stateTree: "Sabal Palm",
    largestCity: "Jacksonville",
    famousFor: ["Disney World", "Beaches", "Oranges", "Everglades"],
    established: 1845,
    nickname: "Sunshine State"
  },
  
  NY: {
    stateFlower: "Rose",
    stateBird: "Eastern Bluebird",
    stateMotto: "Excelsior (Ever upward)",
    stateAnimal: "Beaver",
    stateTree: "Sugar Maple",
    largestCity: "New York City",
    famousFor: ["Statue of Liberty", "Broadway", "Wall Street", "Niagara Falls"],
    established: 1788,
    nickname: "Empire State"
  },
  
  MI: {
    stateFlower: "Apple Blossom",
    stateBird: "American Robin",
    stateMotto: "Si quaeris peninsulam amoenam circumspice",
    stateAnimal: "White-tailed Deer", 
    stateTree: "White Pine",
    largestCity: "Detroit",
    famousFor: ["Great Lakes", "Automotive industry", "Mackinac Bridge"],
    established: 1837,
    nickname: "Great Lakes State"
  },
  
  AK: {
    stateFlower: "Alpine Forget-me-not",
    stateBird: "Willow Ptarmigan",
    stateMotto: "North to the Future",
    stateAnimal: "Moose",
    stateTree: "Sitka Spruce", 
    largestCity: "Anchorage",
    famousFor: ["Oil", "Gold", "Glaciers", "Northern Lights"],
    established: 1959,
    nickname: "Last Frontier"
  },
  
  HI: {
    stateFlower: "Yellow Hibiscus",
    stateBird: "Hawaiian Goose (Nēnē)",
    stateMotto: "Ua Mau ke Ea o ka ʻĀina i ka Pono",
    stateAnimal: "Hawaiian Monk Seal",
    stateTree: "Candlenut Tree",
    largestCity: "Honolulu",
    famousFor: ["Volcanoes", "Beaches", "Pineapples", "Surfing"],
    established: 1959,
    nickname: "Aloha State"
  },
  
  WA: {
    stateFlower: "Coast Rhododendron",
    stateBird: "American Goldfinch",
    stateMotto: "Al-ki (By and by)",
    stateAnimal: "Olympic Marmot",
    stateTree: "Western Hemlock",
    largestCity: "Seattle", 
    famousFor: ["Coffee", "Rain", "Mountains", "Tech companies"],
    established: 1889,
    nickname: "Evergreen State"
  },
  
  CO: {
    stateFlower: "White and Lavender Columbine",
    stateBird: "Lark Bunting",
    stateMotto: "Nil sine numine (Nothing without Providence)",
    stateAnimal: "Rocky Mountain Bighorn Sheep",
    stateTree: "Colorado Blue Spruce",
    largestCity: "Denver",
    famousFor: ["Rocky Mountains", "Skiing", "Mile High elevation"],
    established: 1876,
    nickname: "Centennial State"
  },
  
  OR: {
    stateFlower: "Oregon Grape",
    stateBird: "Western Meadowlark",
    stateMotto: "Alis volat propriis (She flies with her own wings)",
    stateAnimal: "American Beaver",
    stateTree: "Douglas Fir",
    largestCity: "Portland",
    famousFor: ["Rain", "Forests", "Crater Lake", "No sales tax"],
    established: 1859,
    nickname: "Beaver State"
  },
  
  ID: {
    stateFlower: "Syringa",
    stateBird: "Mountain Bluebird",
    stateMotto: "Esto perpetua (Let it be perpetual)",
    stateAnimal: "Appaloosa Horse",
    stateTree: "Western White Pine",
    largestCity: "Boise",
    famousFor: ["Potatoes", "Mining", "Wilderness", "Gems"],
    established: 1890,
    nickname: "Gem State"
  },
  
  AZ: {
    stateFlower: "Saguaro Cactus Blossom",
    stateBird: "Cactus Wren",
    stateMotto: "Ditat Deus (God enriches)",
    stateAnimal: "Ringtail",
    stateTree: "Palo Verde",
    largestCity: "Phoenix",
    famousFor: ["Grand Canyon", "Desert", "Copper mining", "Sunshine"],
    established: 1912,
    nickname: "Grand Canyon State"
  },
  
  NM: {
    stateFlower: "Yucca Flower",
    stateBird: "Greater Roadrunner",
    stateMotto: "Crescit eundo (It grows as it goes)",
    stateAnimal: "American Black Bear",
    stateTree: "Two-needle Piñon",
    largestCity: "Albuquerque", 
    famousFor: ["Adobe architecture", "Chili peppers", "Art", "Skiing"],
    established: 1912,
    nickname: "Land of Enchantment"
  },
  
  WY: {
    stateFlower: "Indian Paintbrush",
    stateBird: "Western Meadowlark", 
    stateMotto: "Equal Rights",
    stateAnimal: "Bison",
    stateTree: "Plains Cottonwood",
    largestCity: "Cheyenne",
    famousFor: ["Yellowstone", "Cowboys", "Wind energy", "Geysers"],
    established: 1890,
    nickname: "Equality State"
  },
  
  NV: {
    stateFlower: "Sagebrush",
    stateBird: "Mountain Bluebird",
    stateMotto: "All for Our Country", 
    stateAnimal: "Desert Bighorn Sheep",
    stateTree: "Single-leaf Piñon",
    largestCity: "Las Vegas",
    famousFor: ["Mining", "Casinos", "Desert", "Hoover Dam"],
    established: 1864,
    nickname: "Silver State"
  },
  
  UT: {
    stateFlower: "Sego Lily",
    stateBird: "California Seagull",
    stateMotto: "Industry",
    stateAnimal: "Rocky Mountain Elk",
    stateTree: "Quaking Aspen",
    largestCity: "Salt Lake City",
    famousFor: ["Salt Lake", "Skiing", "National parks", "Arches"],
    established: 1896,
    nickname: "Beehive State"
  },
  
  MT: {
    stateFlower: "Bitterroot",
    stateBird: "Western Meadowlark",
    stateMotto: "Oro y plata (Gold and silver)",
    stateAnimal: "Grizzly Bear",
    stateTree: "Ponderosa Pine",
    largestCity: "Billings",
    famousFor: ["Glacier National Park", "Cowboys", "Mining", "Wide open spaces"],
    established: 1889,
    nickname: "Big Sky Country"
  },
  
  MO: {
    stateFlower: "White Hawthorn Blossom",
    stateBird: "Eastern Bluebird",
    stateMotto: "Salus populi suprema lex esto",
    stateAnimal: "Missouri Mule",
    stateTree: "Flowering Dogwood",
    largestCity: "Kansas City",
    famousFor: ["Gateway Arch", "BBQ", "Blues music", "Rivers"],
    established: 1821,
    nickname: "Show-Me State"
  },
  
  IL: {
    stateFlower: "Violet",
    stateBird: "Northern Cardinal",
    stateMotto: "State sovereignty, national union",
    stateAnimal: "White-tailed Deer",
    stateTree: "White Oak",
    largestCity: "Chicago",
    famousFor: ["Deep dish pizza", "Wind", "Corn", "Skyscrapers"],
    established: 1818,
    nickname: "Prairie State"
  },
  
  OH: {
    stateFlower: "Scarlet Carnation",
    stateBird: "Northern Cardinal",
    stateMotto: "With God, all things are possible",
    stateAnimal: "White-tailed Deer",
    stateTree: "Ohio Buckeye",
    largestCity: "Columbus",
    famousFor: ["Aviation pioneers", "Rock and Roll Hall of Fame", "Buckeyes"],
    established: 1803,
    nickname: "Buckeye State"
  },

  // MISSING STATES - Adding all 30 states with specific facts
  
  AL: {
    stateFlower: "Camellia",
    stateBird: "Yellowhammer (Northern Flicker)",
    stateMotto: "We dare defend our rights",
    stateAnimal: "Black Bear",
    stateTree: "Southern Longleaf Pine",
    largestCity: "Birmingham",
    famousFor: ["Civil Rights Movement", "Space Center", "Cotton", "Football"],
    established: 1819,
    nickname: "Heart of Dixie"
  },

  AR: {
    stateFlower: "Apple Blossom",
    stateBird: "Northern Mockingbird",
    stateMotto: "The people rule",
    stateAnimal: "White-tailed Deer",
    stateTree: "Loblolly Pine",
    largestCity: "Little Rock",
    famousFor: ["Diamonds", "Hot Springs", "Rice", "Walmart"],
    established: 1836,
    nickname: "Natural State"
  },

  CT: {
    stateFlower: "Mountain Laurel",
    stateBird: "American Robin",
    stateMotto: "He who transplanted still sustains",
    stateAnimal: "Sperm Whale",
    stateTree: "White Oak",
    largestCity: "Bridgeport",
    famousFor: ["Insurance industry", "Yale University", "Submarines", "Pizza"],
    established: 1788,
    nickname: "Constitution State"
  },

  DE: {
    stateFlower: "Peach Blossom",
    stateBird: "Delaware Blue Hen",
    stateMotto: "Liberty and independence",
    stateAnimal: "Grey Fox",
    stateTree: "American Holly",
    largestCity: "Wilmington",
    famousFor: ["First State", "No sales tax", "DuPont", "Beaches"],
    established: 1787,
    nickname: "First State"
  },

  GA: {
    stateFlower: "Cherokee Rose",
    stateBird: "Brown Thrasher",
    stateMotto: "Wisdom, justice, and moderation",
    stateAnimal: "White-tailed Deer",
    stateTree: "Live Oak",
    largestCity: "Atlanta",
    famousFor: ["Peaches", "Coca-Cola", "Peanuts", "Gone with the Wind"],
    established: 1788,
    nickname: "Peach State"
  },

  IN: {
    stateFlower: "Peony",
    stateBird: "Northern Cardinal",
    stateMotto: "The crossroads of America",
    stateAnimal: "N/A",
    stateTree: "Tulip Tree",
    largestCity: "Indianapolis",
    famousFor: ["Indianapolis 500", "Basketball", "Corn", "Steel"],
    established: 1816,
    nickname: "Hoosier State"
  },

  IA: {
    stateFlower: "Prairie Rose",
    stateBird: "American Goldfinch",
    stateMotto: "Our liberties we prize and our rights we will maintain",
    stateAnimal: "N/A",
    stateTree: "Bur Oak",
    largestCity: "Des Moines",
    famousFor: ["Corn", "Pork", "Wind energy", "Iowa Caucuses"],
    established: 1846,
    nickname: "Hawkeye State"
  },

  KS: {
    stateFlower: "Native Sunflower",
    stateBird: "Western Meadowlark",
    stateMotto: "To the stars through difficulties",
    stateAnimal: "American Buffalo",
    stateTree: "Eastern Cottonwood",
    largestCity: "Wichita",
    famousFor: ["Wheat", "Tornadoes", "Wizard of Oz", "Aviation"],
    established: 1861,
    nickname: "Sunflower State"
  },

  KY: {
    stateFlower: "Goldenrod",
    stateBird: "Northern Cardinal",
    stateMotto: "United we stand, divided we fall",
    stateAnimal: "Grey Squirrel",
    stateTree: "Tulip Poplar",
    largestCity: "Louisville",
    famousFor: ["Kentucky Derby", "Bourbon", "Bluegrass", "Fried Chicken"],
    established: 1792,
    nickname: "Bluegrass State"
  },

  LA: {
    stateFlower: "Louisiana Iris",
    stateBird: "Brown Pelican",
    stateMotto: "Union, justice, confidence",
    stateAnimal: "Black Bear",
    stateTree: "Bald Cypress",
    largestCity: "New Orleans",
    famousFor: ["Jazz music", "Mardi Gras", "Cajun cuisine", "Oil"],
    established: 1812,
    nickname: "Pelican State"
  },

  ME: {
    stateFlower: "White Pine Cone",
    stateBird: "Black-capped Chickadee",
    stateMotto: "I lead",
    stateAnimal: "Moose",
    stateTree: "White Pine",
    largestCity: "Portland",
    famousFor: ["Lobster", "Blueberries", "Stephen King", "Lighthouses"],
    established: 1820,
    nickname: "Pine Tree State"
  },

  MD: {
    stateFlower: "Black-Eyed Susan",
    stateBird: "Baltimore Oriole",
    stateMotto: "Strong deeds, gentle words",
    stateAnimal: "Calico Cat",
    stateTree: "White Oak",
    largestCity: "Baltimore",
    famousFor: ["Blue crabs", "The Star-Spangled Banner", "Lacrosse", "Naval Academy"],
    established: 1788,
    nickname: "Old Line State"
  },

  MA: {
    stateFlower: "Mayflower",
    stateBird: "Black-capped Chickadee",
    stateMotto: "By the sword we seek peace, but peace only under liberty",
    stateAnimal: "Right Whale",
    stateTree: "American Elm",
    largestCity: "Boston",
    famousFor: ["Boston Tea Party", "Harvard", "Cranberries", "Patriots"],
    established: 1788,
    nickname: "Bay State"
  },

  MN: {
    stateFlower: "Pink and White Lady's Slipper",
    stateBird: "Common Loon",
    stateMotto: "The star of the north",
    stateAnimal: "Black Bear",
    stateTree: "Red Pine",
    largestCity: "Minneapolis",
    famousFor: ["10,000 lakes", "Mall of America", "Prince", "Hockey"],
    established: 1858,
    nickname: "Land of 10,000 Lakes"
  },

  MS: {
    stateFlower: "Magnolia",
    stateBird: "Northern Mockingbird",
    stateMotto: "By valor and arms",
    stateAnimal: "White-tailed Deer",
    stateTree: "Magnolia",
    largestCity: "Jackson",
    famousFor: ["Blues music", "Catfish", "Cotton", "Mississippi River"],
    established: 1817,
    nickname: "Magnolia State"
  },

  NE: {
    stateFlower: "Goldenrod",
    stateBird: "Western Meadowlark",
    stateMotto: "Equality before the law",
    stateAnimal: "White-tailed Deer",
    stateTree: "Eastern Cottonwood",
    largestCity: "Omaha",
    famousFor: ["Corn", "Beef", "Arbor Day", "College World Series"],
    established: 1867,
    nickname: "Cornhusker State"
  },

  NH: {
    stateFlower: "Purple Lilac",
    stateBird: "Purple Finch",
    stateMotto: "Live free or die",
    stateAnimal: "White-tailed Deer",
    stateTree: "White Birch",
    largestCity: "Manchester",
    famousFor: ["First primary", "Fall foliage", "No income tax", "Mount Washington"],
    established: 1788,
    nickname: "Live Free or Die State"
  },

  NJ: {
    stateFlower: "Purple Violet",
    stateBird: "American Goldfinch",
    stateMotto: "Liberty and prosperity",
    stateAnimal: "Horse",
    stateTree: "Red Oak",
    largestCity: "Newark",
    famousFor: ["Atlantic City", "Diners", "Tomatoes", "Shore"],
    established: 1787,
    nickname: "Garden State"
  },

  NC: {
    stateFlower: "Flowering Dogwood",
    stateBird: "Northern Cardinal",
    stateMotto: "To be rather than to seem",
    stateAnimal: "Grey Squirrel",
    stateTree: "Longleaf Pine",
    largestCity: "Charlotte",
    famousFor: ["First flight", "Tobacco", "Research Triangle", "BBQ"],
    established: 1789,
    nickname: "Tar Heel State"
  },

  ND: {
    stateFlower: "Prairie Rose",
    stateBird: "Western Meadowlark",
    stateMotto: "Liberty and union, now and forever, one and inseparable",
    stateAnimal: "Nokota Horse",
    stateTree: "American Elm",
    largestCity: "Fargo",
    famousFor: ["Oil", "Wheat", "Theodore Roosevelt Park", "Wind energy"],
    established: 1889,
    nickname: "Peace Garden State"
  },

  OK: {
    stateFlower: "Oklahoma Rose",
    stateBird: "Scissor-tailed Flycatcher",
    stateMotto: "Labor conquers all things",
    stateAnimal: "American Buffalo",
    stateTree: "Redbud",
    largestCity: "Oklahoma City",
    famousFor: ["Oil", "Musical Oklahoma", "Tornadoes", "Native American heritage"],
    established: 1907,
    nickname: "Sooner State"
  },

  PA: {
    stateFlower: "Mountain Laurel",
    stateBird: "Ruffed Grouse",
    stateMotto: "Virtue, liberty, and independence",
    stateAnimal: "White-tailed Deer",
    stateTree: "Eastern Hemlock",
    largestCity: "Philadelphia",
    famousFor: ["Liberty Bell", "Hershey's chocolate", "Steel", "Groundhog Day"],
    established: 1787,
    nickname: "Keystone State"
  },

  RI: {
    stateFlower: "Violet",
    stateBird: "Rhode Island Red",
    stateMotto: "Hope",
    stateAnimal: "N/A",
    stateTree: "Red Maple",
    largestCity: "Providence",
    famousFor: ["Ocean State", "Newport Mansions", "Clams", "First Baptist Church"],
    established: 1790,
    nickname: "Ocean State"
  },

  SC: {
    stateFlower: "Yellow Jessamine",
    stateBird: "Carolina Wren",
    stateMotto: "While I breathe, I hope",
    stateAnimal: "White-tailed Deer",
    stateTree: "Sabal Palmetto",
    largestCity: "Charleston",
    famousFor: ["Beaches", "Golf", "Sweet tea", "Civil War"],
    established: 1788,
    nickname: "Palmetto State"
  },

  SD: {
    stateFlower: "Pasque Flower",
    stateBird: "Ring-necked Pheasant",
    stateMotto: "Under God the people rule",
    stateAnimal: "Coyote",
    stateTree: "Black Hills Spruce",
    largestCity: "Sioux Falls",
    famousFor: ["Mount Rushmore", "Badlands", "Corn", "Gold"],
    established: 1889,
    nickname: "Mount Rushmore State"
  },

  TN: {
    stateFlower: "Iris",
    stateBird: "Northern Mockingbird",
    stateMotto: "Agriculture and commerce",
    stateAnimal: "Raccoon",
    stateTree: "Tulip Poplar",
    largestCity: "Memphis",
    famousFor: ["Country music", "Elvis", "Jack Daniel's", "Great Smoky Mountains"],
    established: 1796,
    nickname: "Volunteer State"
  },

  VT: {
    stateFlower: "Red Clover",
    stateBird: "Hermit Thrush",
    stateMotto: "Freedom and unity",
    stateAnimal: "Morgan Horse",
    stateTree: "Sugar Maple",
    largestCity: "Burlington",
    famousFor: ["Maple syrup", "Ben & Jerry's", "Skiing", "Fall foliage"],
    established: 1791,
    nickname: "Green Mountain State"
  },

  VA: {
    stateFlower: "American Dogwood",
    stateBird: "Northern Cardinal",
    stateMotto: "Thus always to tyrants",
    stateAnimal: "N/A",
    stateTree: "American Dogwood",
    largestCity: "Virginia Beach",
    famousFor: ["Colonial Williamsburg", "Presidents", "Tobacco", "Pentagon"],
    established: 1788,
    nickname: "Old Dominion"
  },

  WV: {
    stateFlower: "Rhododendron",
    stateBird: "Northern Cardinal",
    stateMotto: "Montani semper liberi (Mountaineers are always free)",
    stateAnimal: "Black Bear",
    stateTree: "Sugar Maple",
    largestCity: "Charleston",
    famousFor: ["Coal mining", "Country Roads song", "Pepperoni rolls", "New River Gorge"],
    established: 1863,
    nickname: "Mountain State"
  },

  WI: {
    stateFlower: "Wood Violet",
    stateBird: "American Robin",
    stateMotto: "Forward",
    stateAnimal: "Badger",
    stateTree: "Sugar Maple",
    largestCity: "Milwaukee",
    famousFor: ["Cheese", "Green Bay Packers", "Beer", "Dairy farms"],
    established: 1848,
    nickname: "Badger State"
  }
}

// Get random hint for a state (excluding name and capital)
export function getRandomHint(stateId: string): string {
  const trivia = STATE_TRIVIA[stateId]
  if (!trivia) return "Rich history and culture"
  
  const hints = [
    `State flower: ${trivia.stateFlower}`,
    `State bird: ${trivia.stateBird}`,
    `State motto: "${trivia.stateMotto}"`,
    ...(trivia.stateNut ? [`State nut: ${trivia.stateNut}`] : []),
    ...(trivia.stateAnimal ? [`State animal: ${trivia.stateAnimal}`] : []),
    ...(trivia.stateTree ? [`State tree: ${trivia.stateTree}`] : []),
    `Largest city: ${trivia.largestCity}`,
    `Established: ${trivia.established}`,
    `Known for: ${trivia.famousFor[Math.floor(Math.random() * trivia.famousFor.length)]}`,
    `Nickname: "${trivia.nickname}"`
  ]
  
  return hints[Math.floor(Math.random() * hints.length)]
}

// Get all hints for a state in order
export function getAllHints(stateId: string): string[] {
  const trivia = STATE_TRIVIA[stateId]
  if (!trivia) return ["Rich history and culture", "Part of the United States", "Has its own state government"]
  
  const hints = [
    `State flower: ${trivia.stateFlower}`,
    `State bird: ${trivia.stateBird}`,
    `State motto: "${trivia.stateMotto}"`,
    ...(trivia.stateNut ? [`State nut: ${trivia.stateNut}`] : []),
    ...(trivia.stateAnimal ? [`State animal: ${trivia.stateAnimal}`] : []),
    ...(trivia.stateTree ? [`State tree: ${trivia.stateTree}`] : []),
    `Largest city: ${trivia.largestCity}`,
    `Established: ${trivia.established}`,
    ...trivia.famousFor.map(item => `Known for: ${item}`),
    `Nickname: "${trivia.nickname}"`
  ]
  
  return hints
}
