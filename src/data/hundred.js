// The Hundred 2026 - complete data derived from official auction registration PDF
// Teams renamed for 2026 season

export const HUNDRED_TEAMS = [
  'MI London',
  'Southern Brave',
  'Birmingham Phoenix',
  'Trent Rockets',
  'Welsh Fire',
  'Manchester Super Giants',
  'MI London',
  'Sunrisers Leeds',
]

// Real 2025 retained squads - salaries at their reserve price band
// These are deducted from the £2M cap before auction
export const HUNDRED_RETENTIONS = {
  // Source: https://www.thehundred.com/news/4428607/the-hundred-2026-direct-signings-and-retentions-confirmed7
  // Each men's team has exactly £950k deducted from the £2.05M cap = £1.1M for auction
  // Salary per player is £950k / 4 = £237,500 (exact split not published; using equal share)
  // Note: Welsh Fire and Sunrisers Leeds had 3 pre-auction signings (£310k women) but men still £950k

  'Birmingham Phoenix': [
    { name: 'Rehan Ahmed',      role: 'Bowler',       nat: 'England',      os: false, salary: 237500, type: 'Direct signing' },
    { name: 'Jacob Bethell',    role: 'All-rounder',  nat: 'England',      os: false, salary: 237500, type: 'Retention' },
    { name: 'Donovan Ferreira', role: 'Batter',       nat: 'South Africa', os: true,  salary: 237500, type: 'Direct signing' },
    { name: 'Mitchell Owen',    role: 'WK-Batter',    nat: 'Australia',    os: true,  salary: 237500, type: 'Direct signing' },
  ],
  'London Spirit': [
    { name: 'Dewald Brevis',    role: 'Batter',       nat: 'South Africa', os: true,  salary: 237500, type: 'Direct signing' },
    { name: 'Liam Livingstone', role: 'All-rounder',  nat: 'England',      os: false, salary: 237500, type: 'Direct signing' },
    { name: 'Jamie Overton',    role: 'All-rounder',  nat: 'England',      os: false, salary: 237500, type: 'Retention' },
    { name: 'Adam Zampa',       role: 'Bowler',       nat: 'Australia',    os: true,  salary: 237500, type: 'Direct signing' },
  ],
  'Manchester Super Giants': [
    { name: 'Noor Ahmad',       role: 'Bowler',       nat: 'Afghanistan',  os: true,  salary: 237500, type: 'Retention' },
    { name: 'Jos Buttler',      role: 'WK-Batter',    nat: 'England',      os: false, salary: 237500, type: 'Retention' },
    { name: 'Liam Dawson',      role: 'All-rounder',  nat: 'England',      os: false, salary: 237500, type: 'Direct signing' },
    { name: 'Heinrich Klaasen', role: 'WK-Batter',    nat: 'South Africa', os: true,  salary: 237500, type: 'Retention' },
  ],
  'MI London': [
    { name: 'Sam Curran',       role: 'All-rounder',  nat: 'England',      os: false, salary: 237500, type: 'Retention' },
    { name: 'Will Jacks',       role: 'All-rounder',  nat: 'England',      os: false, salary: 237500, type: 'Retention' },
    { name: 'Rashid Khan',      role: 'Bowler',       nat: 'Afghanistan',  os: true,  salary: 237500, type: 'Retention' },
    { name: 'Nicholas Pooran',  role: 'WK-Batter',    nat: 'West Indies',  os: true,  salary: 237500, type: 'Direct signing' },
  ],
  'Southern Brave': [
    { name: 'Jofra Archer',     role: 'Bowler',       nat: 'England',      os: false, salary: 237500, type: 'Retention' },
    { name: 'Jamie Smith',      role: 'WK-Batter',    nat: 'England',      os: false, salary: 237500, type: 'Direct signing' },
    { name: 'Marcus Stoinis',   role: 'All-rounder',  nat: 'Australia',    os: true,  salary: 237500, type: 'Direct signing' },
    { name: 'Tristan Stubbs',   role: 'Batter',       nat: 'South Africa', os: true,  salary: 237500, type: 'Direct signing' },
  ],
  'Sunrisers Leeds': [
    { name: 'Harry Brook',      role: 'Batter',       nat: 'England',      os: false, salary: 237500, type: 'Retention' },
    { name: 'Brydon Carse',     role: 'Bowler',       nat: 'England',      os: false, salary: 237500, type: 'Retention' },
    { name: 'Nathan Ellis',     role: 'Bowler',       nat: 'Australia',    os: true,  salary: 237500, type: 'Direct signing' },
    { name: 'Mitch Marsh',      role: 'All-rounder',  nat: 'Australia',    os: true,  salary: 237500, type: 'Direct signing' },
  ],
  'Trent Rockets': [
    { name: 'Tom Banton',       role: 'WK-Batter',    nat: 'England',      os: false, salary: 237500, type: 'Retention' },
    { name: 'Tim David',        role: 'Batter',       nat: 'Singapore',    os: true,  salary: 237500, type: 'Direct signing' },
    { name: 'Ben Duckett',      role: 'Batter',       nat: 'England',      os: false, salary: 237500, type: 'Direct signing' },
    { name: 'Mitchell Santner', role: 'All-rounder',  nat: 'New Zealand',  os: true,  salary: 237500, type: 'Direct signing' },
  ],
  'Welsh Fire': [
    { name: 'Marco Jansen',     role: 'All-rounder',  nat: 'South Africa', os: true,  salary: 237500, type: 'Direct signing' },
    { name: 'Rachin Ravindra',  role: 'All-rounder',  nat: 'New Zealand',  os: true,  salary: 237500, type: 'Direct signing' },
    { name: 'Phil Salt',        role: 'WK-Batter',    nat: 'England',      os: false, salary: 237500, type: 'Direct signing' },
    { name: 'Chris Woakes',     role: 'All-rounder',  nat: 'England',      os: false, salary: 237500, type: 'Retention' },
  ],
}

// Pool definitions - auto-generated from price + domestic/overseas + role
// Each player in the auction pool belongs to exactly one pool
// Pools are auctioned in order; within each pool players go one at a time in shuffled order

export const HUNDRED_POOLS = [
  // ECB official Tier 1 & 2 sets
  { id: 'marquee',     label: 'Marquee',             desc: 'Top domestic & international stars',         color: '#d29922',  filter: p => p.ecbGroup === 'Marquee Players' },
  { id: 'tier1_bat',   label: 'Tier 1 — Batters',    desc: 'Premium batting',                            color: '#58a6ff',  filter: p => p.ecbGroup === 'Tier 1 Batters' },
  { id: 'tier1_fast',  label: 'Tier 1 — Fast',       desc: 'Premium pace bowling',                       color: '#f85149',  filter: p => p.ecbGroup === 'Tier 1 Fast Bowlers' },
  { id: 'tier1_ar',    label: 'Tier 1 — All-rounders',desc: 'Premium all-round',                         color: '#3fb950',  filter: p => p.ecbGroup === 'Tier 1 All-rounders' },
  { id: 'tier1_spin',  label: 'Tier 1 — Spin',       desc: 'Premium spin bowling',                       color: '#a5d6ff',  filter: p => p.ecbGroup === 'Tier 1 Spin Bowlers' },
  { id: 'tier2_bat',   label: 'Tier 2 — Batters',    desc: 'Strong batting options',                     color: '#79c0ff',  filter: p => p.ecbGroup === 'Tier 2 Batters' },
  { id: 'tier2_fast',  label: 'Tier 2 — Fast',       desc: 'Strong pace bowling',                        color: '#ffa198',  filter: p => p.ecbGroup === 'Tier 2 Fast Bowlers' },
  { id: 'tier2_ar',    label: 'Tier 2 — All-rounders',desc: 'Strong all-round options',                  color: '#7ee787',  filter: p => p.ecbGroup === 'Tier 2 All-rounders' },
  { id: 'tier2_spin',  label: 'Tier 2 — Spin',       desc: 'Strong spin bowling',                       color: '#cae8ff',  filter: p => p.ecbGroup === 'Tier 2 Spin Bowlers' },
  // Tier 3 — Experienced internationals & Blast regulars (£50K–£75K longlist)
  { id: 'tier3_bat',   label: 'Tier 3 — Batters',    desc: 'Intl & experienced Blast batters £50–75K', color: '#58a6ff',  filter: p => p.ecbGroup === 'Tier 3 Batters' },
  { id: 'tier3_fast',  label: 'Tier 3 — Fast',       desc: 'Intl & experienced Blast pace £50–75K',    color: '#f85149',  filter: p => p.ecbGroup === 'Tier 3 Fast Bowlers' },
  { id: 'tier3_ar',    label: 'Tier 3 — All-rounders',desc: 'Intl & experienced Blast AR £50–75K',     color: '#3fb950',  filter: p => p.ecbGroup === 'Tier 3 All-rounders' },
  { id: 'tier3_spin',  label: 'Tier 3 — Spin',       desc: 'Intl & experienced Blast spin £50–75K',    color: '#a5d6ff',  filter: p => p.ecbGroup === 'Tier 3 Spin Bowlers' },
  // Tier 4 — County depth & fringe internationals (£31K longlist)
  { id: 'tier4_bat',   label: 'Tier 4 — Batters',    desc: 'County depth batters £31K',                  color: '#8b949e',  filter: p => p.ecbGroup === 'Tier 4 Batters' },
  { id: 'tier4_fast',  label: 'Tier 4 — Fast',       desc: 'County depth pace bowlers £31K',             color: '#8b949e',  filter: p => p.ecbGroup === 'Tier 4 Fast Bowlers' },
  { id: 'tier4_ar',    label: 'Tier 4 — All-rounders',desc: 'County depth all-rounders £31K',            color: '#8b949e',  filter: p => p.ecbGroup === 'Tier 4 All-rounders' },
  { id: 'tier4_spin',  label: 'Tier 4 — Spin',       desc: 'County depth spinners £31K',                 color: '#8b949e',  filter: p => p.ecbGroup === 'Tier 4 Spin Bowlers' },
]

// Tiered bid increments per the 2026 auction rules (Rule 4.13)
export function hundredIncrement(currentBid) {
  if (currentBid < 32500) return 1500
  if (currentBid < 50000) return 2500
  if (currentBid < 100000) return 5000
  return 10000
}

export function hundredIncrementLabel(currentBid) {
  const inc = hundredIncrement(currentBid)
  if (inc >= 1000) return `£${inc / 1000}K`
  return `£${inc}`
}

// Full curated player list from 2026 registration PDF
// Roles inferred from known positions; omits retained players (handled separately)
// £31K domestic list is curated to ~60 recognisable names to keep pool manageable
export const HUNDRED_PLAYERS = [
  // Source: ECB official Men's Auction Sets and Longlist 2026
  // Tier 3 = experienced internationals & proven Blast regulars
  // Tier 4 = county depth & fringe internationals
  { name: 'Jonny Bairstow', role: 'WK-Batter', nat: 'England', os: false, base: 100000, ecbGroup: 'Marquee Players' },
  { name: 'Adil Rashid', role: 'Bowler', nat: 'England', os: false, base: 100000, ecbGroup: 'Marquee Players' },
  { name: 'James Vince', role: 'Batter', nat: 'England', os: false, base: 100000, ecbGroup: 'Marquee Players' },
  { name: 'Jordan Cox', role: 'WK-Batter', nat: 'England', os: false, base: 75000, ecbGroup: 'Marquee Players' },
  { name: 'Joe Root', role: 'Batter', nat: 'England', os: false, base: 75000, ecbGroup: 'Marquee Players' },
  { name: 'Aiden Markram', role: 'Batter', nat: 'South Africa', os: true, base: 100000, ecbGroup: 'Marquee Players' },
  { name: 'David Miller', role: 'Batter', nat: 'South Africa', os: true, base: 100000, ecbGroup: 'Marquee Players' },
  { name: 'Sunil Narine', role: 'All-rounder', nat: 'West Indies', os: true, base: 100000, ecbGroup: 'Marquee Players' },
  { name: 'Haris Rauf', role: 'Bowler', nat: 'Pakistan', os: true, base: 100000, ecbGroup: 'Marquee Players' },
  { name: 'Daryl Mitchell', role: 'Batter', nat: 'New Zealand', os: true, base: 75000, ecbGroup: 'Marquee Players' },
  { name: 'Finn Allen', role: 'WK-Batter', nat: 'New Zealand', os: true, base: 100000, ecbGroup: 'Tier 1 Batters' },
  { name: 'Quinton de Kock', role: 'WK-Batter', nat: 'South Africa', os: true, base: 100000, ecbGroup: 'Tier 1 Batters' },
  { name: 'Ryan Rickelton', role: 'WK-Batter', nat: 'South Africa', os: true, base: 100000, ecbGroup: 'Tier 1 Batters' },
  { name: 'Tim Seifert', role: 'WK-Batter', nat: 'New Zealand', os: true, base: 100000, ecbGroup: 'Tier 1 Batters' },
  { name: 'Zak Crawley', role: 'Batter', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 1 Batters' },
  { name: 'Shaheen Shah Afridi', role: 'Bowler', nat: 'Pakistan', os: true, base: 100000, ecbGroup: 'Tier 1 Fast Bowlers' },
  { name: 'Joshua Tongue', role: 'Bowler', nat: 'England', os: false, base: 75000, ecbGroup: 'Tier 1 Fast Bowlers' },
  { name: 'Luke Wood', role: 'Bowler', nat: 'England', os: false, base: 75000, ecbGroup: 'Tier 1 Fast Bowlers' },
  { name: 'Sonny Baker', role: 'Bowler', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 1 Fast Bowlers' },
  { name: 'Saqib Mahmood', role: 'Bowler', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 1 Fast Bowlers' },
  { name: 'Tom Curran', role: 'All-rounder', nat: 'England', os: false, base: 100000, ecbGroup: 'Tier 1 All-rounders' },
  { name: 'Shadab Khan', role: 'All-rounder', nat: 'Pakistan', os: true, base: 100000, ecbGroup: 'Tier 1 All-rounders' },
  { name: 'Azmatullah Omarzai', role: 'All-rounder', nat: 'Afghanistan', os: true, base: 100000, ecbGroup: 'Tier 1 All-rounders' },
  { name: 'David Willey', role: 'All-rounder', nat: 'England', os: false, base: 100000, ecbGroup: 'Tier 1 All-rounders' },
  { name: 'Gus Atkinson', role: 'All-rounder', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 1 All-rounders' },
  { name: 'Akeal Hosein', role: 'Bowler', nat: 'West Indies', os: true, base: 100000, ecbGroup: 'Tier 1 Spin Bowlers' },
  { name: 'Allah Ghazanfar', role: 'Bowler', nat: 'Afghanistan', os: true, base: 75000, ecbGroup: 'Tier 1 Spin Bowlers' },
  { name: 'Rishad Hossain', role: 'Bowler', nat: 'Bangladesh', os: true, base: 75000, ecbGroup: 'Tier 1 Spin Bowlers' },
  { name: 'Usman Tariq', role: 'Bowler', nat: 'Pakistan', os: true, base: 100000, ecbGroup: 'Tier 1 Spin Bowlers' },
  { name: 'Jafer Chohan', role: 'Bowler', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 1 Spin Bowlers' },
  { name: 'Tom Kohler-Cadmore', role: 'WK-Batter', nat: 'England', os: false, base: 75000, ecbGroup: 'Tier 2 Batters' },
  { name: 'Joe Clarke', role: 'WK-Batter', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 2 Batters' },
  { name: 'Leus du Plooy', role: 'Batter', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 2 Batters' },
  { name: 'Tom Abell', role: 'Batter', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 2 Batters' },
  { name: 'Will Smeed', role: 'Batter', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 2 Batters' },
  { name: 'Trent Boult', role: 'Bowler', nat: 'New Zealand', os: true, base: 100000, ecbGroup: 'Tier 2 Fast Bowlers' },
  { name: 'Chris Jordan', role: 'Bowler', nat: 'England', os: false, base: 100000, ecbGroup: 'Tier 2 Fast Bowlers' },
  { name: 'David Payne', role: 'Bowler', nat: 'England', os: false, base: 75000, ecbGroup: 'Tier 2 Fast Bowlers' },
  { name: 'Olly Stone', role: 'Bowler', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 2 Fast Bowlers' },
  { name: 'Matthew Potts', role: 'Bowler', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 2 Fast Bowlers' },
  { name: 'Saim Ayub', role: 'All-rounder', nat: 'Pakistan', os: true, base: 100000, ecbGroup: 'Tier 2 All-rounders' },
  { name: 'James Coles', role: 'All-rounder', nat: 'England', os: false, base: 75000, ecbGroup: 'Tier 2 All-rounders' },
  { name: 'Daniel Lawrence', role: 'All-rounder', nat: 'England', os: false, base: 75000, ecbGroup: 'Tier 2 All-rounders' },
  { name: 'Ben Dwarshuis', role: 'All-rounder', nat: 'Australia', os: true, base: 50000, ecbGroup: 'Tier 2 All-rounders' },
  { name: 'Lewis Gregory', role: 'All-rounder', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 2 All-rounders' },
  { name: 'Abrar Ahmed', role: 'Bowler', nat: 'Pakistan', os: true, base: 75000, ecbGroup: 'Tier 2 Spin Bowlers' },
  { name: 'Keshav Maharaj', role: 'Bowler', nat: 'South Africa', os: true, base: 50000, ecbGroup: 'Tier 2 Spin Bowlers' },
  { name: 'Nathan Sowter', role: 'Bowler', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 2 Spin Bowlers' },
  { name: 'Mason Crane', role: 'Bowler', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 2 Spin Bowlers' },
  { name: 'Tom Hartley', role: 'All-rounder', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 2 Spin Bowlers' },
  { name: 'Faf du Plessis', role: 'Batter', nat: 'South Africa', os: true, base: 100000, ecbGroup: 'Tier 3 Batters' },
  { name: 'Sherfane Rutherford', role: 'Batter', nat: 'West Indies', os: true, base: 100000, ecbGroup: 'Tier 3 Batters' },
  { name: 'Matthew Short', role: 'Batter', nat: 'Australia', os: true, base: 75000, ecbGroup: 'Tier 3 Batters' },
  { name: 'Mark Chapman', role: 'Batter', nat: 'New Zealand', os: true, base: 75000, ecbGroup: 'Tier 3 Batters' },
  { name: 'Dawid Malan', role: 'Batter', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 3 Batters' },
  { name: 'Tawanda Muyeye', role: 'Batter', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 3 Batters' },
  { name: 'Laurie Evans', role: 'WK-Batter', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 3 Batters' },
  { name: 'Thomas Moores', role: 'WK-Batter', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 3 Batters' },
  { name: 'Lockie Ferguson', role: 'Bowler', nat: 'New Zealand', os: true, base: 75000, ecbGroup: 'Tier 3 Fast Bowlers' },
  { name: 'Anrich Nortje', role: 'Bowler', nat: 'South Africa', os: true, base: 75000, ecbGroup: 'Tier 3 Fast Bowlers' },
  { name: 'Fazalhaq Farooqi', role: 'Bowler', nat: 'Afghanistan', os: true, base: 75000, ecbGroup: 'Tier 3 Fast Bowlers' },
  { name: 'William O\'Rourke', role: 'Bowler', nat: 'New Zealand', os: true, base: 75000, ecbGroup: 'Tier 3 Fast Bowlers' },
  { name: 'Matt Henry', role: 'Bowler', nat: 'New Zealand', os: true, base: 75000, ecbGroup: 'Tier 3 Fast Bowlers' },
  { name: 'Lungi Ngidi', role: 'Bowler', nat: 'South Africa', os: true, base: 50000, ecbGroup: 'Tier 3 Fast Bowlers' },
  { name: 'Chris Wood', role: 'Bowler', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 3 Fast Bowlers' },
  { name: 'Tymal Mills', role: 'Bowler', nat: 'England', os: false, base: 75000, ecbGroup: 'Tier 3 Fast Bowlers' },
  { name: 'Wanindu Hasaranga', role: 'All-rounder', nat: 'Sri Lanka', os: true, base: 100000, ecbGroup: 'Tier 3 All-rounders' },
  { name: 'Sikandar Raza', role: 'All-rounder', nat: 'Zimbabwe', os: true, base: 100000, ecbGroup: 'Tier 3 All-rounders' },
  { name: 'Muhammad Nawaz', role: 'All-rounder', nat: 'Pakistan', os: true, base: 100000, ecbGroup: 'Tier 3 All-rounders' },
  { name: 'Dasun Shanaka', role: 'All-rounder', nat: 'Sri Lanka', os: true, base: 75000, ecbGroup: 'Tier 3 All-rounders' },
  { name: 'Aaron Hardie', role: 'All-rounder', nat: 'Australia', os: true, base: 75000, ecbGroup: 'Tier 3 All-rounders' },
  { name: 'Usama Mir', role: 'All-rounder', nat: 'Pakistan', os: true, base: 50000, ecbGroup: 'Tier 3 All-rounders' },
  { name: 'Benjamin Howell', role: 'All-rounder', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 3 All-rounders' },
  { name: 'Daniel Mousley', role: 'All-rounder', nat: 'England', os: false, base: 50000, ecbGroup: 'Tier 3 All-rounders' },
  { name: 'Mujeeb Ur Rahman', role: 'Bowler', nat: 'Afghanistan', os: true, base: 100000, ecbGroup: 'Tier 3 Spin Bowlers' },
  { name: 'Mustafizur Rahman', role: 'Bowler', nat: 'Bangladesh', os: true, base: 100000, ecbGroup: 'Tier 3 Spin Bowlers' },
  { name: 'Muhammad Amir', role: 'Bowler', nat: 'Pakistan', os: true, base: 75000, ecbGroup: 'Tier 3 Spin Bowlers' },
  { name: 'Zaman Khan', role: 'Bowler', nat: 'Pakistan', os: true, base: 75000, ecbGroup: 'Tier 3 Spin Bowlers' },
  { name: 'Gudakesh Motie', role: 'Bowler', nat: 'West Indies', os: true, base: 50000, ecbGroup: 'Tier 3 Spin Bowlers' },
  { name: 'Tabraiz Shamsi', role: 'Bowler', nat: 'South Africa', os: true, base: 50000, ecbGroup: 'Tier 3 Spin Bowlers' },
  { name: 'Waqar Salamkheil', role: 'Bowler', nat: 'Afghanistan', os: true, base: 31000, ecbGroup: 'Tier 3 Spin Bowlers' },
  { name: 'Ashton Agar', role: 'Bowler', nat: 'Australia', os: true, base: 31000, ecbGroup: 'Tier 3 Spin Bowlers' },
  { name: 'Sam Billings', role: 'WK-Batter', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Batters' },
  { name: 'Ollie Pope', role: 'WK-Batter', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Batters' },
  { name: 'Jason Roy', role: 'Batter', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Batters' },
  { name: 'Rocky Flintoff', role: 'Batter', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Batters' },
  { name: 'Keaton Jennings', role: 'Batter', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Batters' },
  { name: 'Jack Haynes', role: 'Batter', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Batters' },
  { name: 'Graham Clark', role: 'WK-Batter', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Batters' },
  { name: 'Jimmy Neesham', role: 'All-rounder', nat: 'New Zealand', os: true, base: 31000, ecbGroup: 'Tier 4 Batters' },
  { name: 'Reece Topley', role: 'Bowler', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Fast Bowlers' },
  { name: 'Dillon Pennington', role: 'Bowler', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Fast Bowlers' },
  { name: 'Sam Cook', role: 'Bowler', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Fast Bowlers' },
  { name: 'Ben Raine', role: 'Bowler', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Fast Bowlers' },
  { name: 'Blessing Muzarabani', role: 'Bowler', nat: 'Zimbabwe', os: true, base: 31000, ecbGroup: 'Tier 4 Fast Bowlers' },
  { name: 'Ottneil Baartman', role: 'Bowler', nat: 'South Africa', os: true, base: 31000, ecbGroup: 'Tier 4 Fast Bowlers' },
  { name: 'Akif Javed', role: 'Bowler', nat: 'Pakistan', os: true, base: 31000, ecbGroup: 'Tier 4 Fast Bowlers' },
  { name: 'Craig Overton', role: 'All-rounder', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 All-rounders' },
  { name: 'Ryan Higgins', role: 'All-rounder', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 All-rounders' },
  { name: 'Jordan Thompson', role: 'All-rounder', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 All-rounders' },
  { name: 'Tom Lammonby', role: 'All-rounder', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 All-rounders' },
  { name: 'George Garton', role: 'All-rounder', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 All-rounders' },
  { name: 'Paul Walter', role: 'All-rounder', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 All-rounders' },
  { name: 'Richard Gleeson', role: 'All-rounder', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 All-rounders' },
  { name: 'George Linde', role: 'All-rounder', nat: 'South Africa', os: true, base: 31000, ecbGroup: 'Tier 4 All-rounders' },
  { name: 'Callum Parkinson', role: 'Bowler', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Spin Bowlers' },
  { name: 'Matthew Parkinson', role: 'Bowler', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Spin Bowlers' },
  { name: 'Danny Briggs', role: 'Bowler', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Spin Bowlers' },
  { name: 'Liam Trevaskis', role: 'Bowler', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Spin Bowlers' },
  { name: 'Luke Hollman', role: 'All-rounder', nat: 'England', os: false, base: 31000, ecbGroup: 'Tier 4 Spin Bowlers' },
  { name: 'Qais Ahmad', role: 'Bowler', nat: 'Afghanistan', os: true, base: 31000, ecbGroup: 'Tier 4 Spin Bowlers' },
  { name: 'Sandeep Lamichhane', role: 'Bowler', nat: 'Other', os: true, base: 31000, ecbGroup: 'Tier 4 Spin Bowlers' },
]

// Build pool-categorised auction list from player data
// Removes any player already retained by a team
export function buildHundredAuctionPools(retentions, extraPlayers = []) {
  const retainedNames = new Set(
    Object.values(retentions).flat().map(p => p.name)
  )
  // Merge base player list with any released retained players injected back in
  const extraNames = new Set(extraPlayers.map(p => p.name))
  const basePlayers = HUNDRED_PLAYERS.filter(p => !retainedNames.has(p.name) && !extraNames.has(p.name))
  const available = [...basePlayers, ...extraPlayers.filter(p => !retainedNames.has(p.name))]

  return HUNDRED_POOLS.map(pool => ({
    ...pool,
    players: available.filter(pool.filter).sort(() => Math.random() - 0.5),
  })).filter(pool => pool.players.length > 0)
}

// When a retained player is released back into the auction pool,
// assign them the correct base price and pool based on their profile.
// Marquee = top internationals; 75K = strong internationals; 50K = fringe; 31K = domestic depth
export function classifyReleasedPlayer(player) {
  // Assign released retained player to correct ECB group and base price
  const marqueeNames = [
    'Jos Buttler','Sam Curran','Jofra Archer','Harry Brook','Liam Livingstone',
    'Rashid Khan','Andre Russell','Mark Wood','Jonny Bairstow','Jamie Overton',
    'Chris Woakes','Trent Boult','Heinrich Klaasen','Mitchell Santner',
    'Marcus Stoinis','Tim David','Marco Jansen','Rachin Ravindra','Phil Salt',
    'Jacob Bethell','Will Jacks','Nicholas Pooran','Dewald Brevis','Adam Zampa',
    'Mitch Marsh','Noor Ahmad','Ben Duckett','Tom Banton','David Miller',
    'Tristan Stubbs','Mitchell Owen','Finn Allen','Brydon Carse','Nathan Ellis',
    'Jamie Smith','Liam Dawson','Shaheen Shah Afridi',
  ]
  // Tier 2 equivalents — direct to relevant official set if possible
  const tier2AR = ['Tom Curran','Shadab Khan','Azmatullah Omarzai','David Willey','Saim Ayub','James Coles','Daniel Lawrence']
  const tier2Fast = ['Chris Jordan','David Payne','Joshua Tongue','Luke Wood']
  const tier2Spin = ['Abrar Ahmed','Keshav Maharaj','Nathan Sowter','Mason Crane','Tom Hartley']
  const tier2Bat = ['Tom Kohler-Cadmore','Joe Clarke','Leus du Plooy','Tom Abell','Will Smeed']
  const tier1Bat = ['Aiden Markram','David Miller','Daryl Mitchell','Jordan Cox','Joe Root','Zak Crawley']

  let base = 31000
  let ecbGroup = 'Tier 4 All-rounders'

  if (marqueeNames.includes(player.name)) {
    base = 100000; ecbGroup = 'Marquee Players'
  } else if (tier2AR.includes(player.name)) {
    base = player.os ? 100000 : 75000; ecbGroup = 'Tier 2 All-rounders'
  } else if (tier2Fast.includes(player.name)) {
    base = 75000; ecbGroup = 'Tier 2 Fast Bowlers'
  } else if (tier2Spin.includes(player.name)) {
    base = 75000; ecbGroup = 'Tier 2 Spin Bowlers'
  } else if (tier2Bat.includes(player.name)) {
    base = 75000; ecbGroup = 'Tier 2 Batters'
  } else if (tier1Bat.includes(player.name)) {
    base = 100000; ecbGroup = 'Tier 1 Batters'
  } else if (player.role === 'WK-Batter' || player.role === 'Batter') {
    base = player.os ? 50000 : 31000
    ecbGroup = player.os ? 'Tier 3 Batters' : 'Tier 4 Batters'
  } else if (player.role === 'Bowler') {
    base = player.os ? 50000 : 31000
    ecbGroup = player.os ? 'Tier 3 Fast Bowlers' : 'Tier 4 Fast Bowlers'
  } else {
    base = player.os ? 50000 : 31000
    ecbGroup = player.os ? 'Tier 3 All-rounders' : 'Tier 4 All-rounders'
  }

  return { ...player, base, ecbGroup, salary: undefined, type: undefined }
}
