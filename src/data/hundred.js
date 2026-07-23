// The Hundred 2026 - complete data derived from official auction registration PDF
// Teams renamed for 2026 season

export const HUNDRED_TEAMS = [
  "MI London",
  "Southern Brave",
  "Birmingham Phoenix",
  "Trent Rockets",
  "Welsh Fire",
  "Manchester Super Giants",
  "MI London",
  "Sunrisers Leeds",
];

// Real 2025 retained squads - salaries at their reserve price band
// These are deducted from the £2M cap before auction
export const HUNDRED_RETENTIONS = {
  // Source: https://www.thehundred.com/news/4428607/the-hundred-2026-direct-signings-and-retentions-confirmed7
  // Each men's team has exactly £950k deducted from the £2.05M cap = £1.1M for auction
  // Salary per player is £950k / 4 = £237,500 (exact split not published; using equal share)
  // Note: Welsh Fire and Sunrisers Leeds had 3 pre-auction signings (£310k women) but men still £950k

  "Birmingham Phoenix": [
    {
      name: "Rehan Ahmed",
      role: "Bowler",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Jacob Bethell",
      role: "All-rounder",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Retention",
    },
    {
      name: "Donovan Ferreira",
      role: "Batter",
      nat: "South Africa",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Mitchell Owen",
      role: "WK-Batter",
      nat: "Australia",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
  ],
  "London Spirit": [
    {
      name: "Dewald Brevis",
      role: "Batter",
      nat: "South Africa",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Liam Livingstone",
      role: "All-rounder",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Jamie Overton",
      role: "All-rounder",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Retention",
    },
    {
      name: "Adam Zampa",
      role: "Bowler",
      nat: "Australia",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
  ],
  "Manchester Super Giants": [
    {
      name: "Noor Ahmad",
      role: "Bowler",
      nat: "Afghanistan",
      os: true,
      salary: 237500,
      type: "Retention",
    },
    {
      name: "Jos Buttler",
      role: "WK-Batter",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Retention",
    },
    {
      name: "Liam Dawson",
      role: "All-rounder",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Heinrich Klaasen",
      role: "WK-Batter",
      nat: "South Africa",
      os: true,
      salary: 237500,
      type: "Retention",
    },
  ],
  "MI London": [
    {
      name: "Sam Curran",
      role: "All-rounder",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Retention",
    },
    {
      name: "Will Jacks",
      role: "All-rounder",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Retention",
    },
    {
      name: "Rashid Khan",
      role: "Bowler",
      nat: "Afghanistan",
      os: true,
      salary: 237500,
      type: "Retention",
    },
    {
      name: "Nicholas Pooran",
      role: "WK-Batter",
      nat: "West Indies",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
  ],
  "Southern Brave": [
    {
      name: "Jofra Archer",
      role: "Bowler",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Retention",
    },
    {
      name: "Jamie Smith",
      role: "WK-Batter",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Marcus Stoinis",
      role: "All-rounder",
      nat: "Australia",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Tristan Stubbs",
      role: "Batter",
      nat: "South Africa",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
  ],
  "Sunrisers Leeds": [
    {
      name: "Harry Brook",
      role: "Batter",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Retention",
    },
    {
      name: "Brydon Carse",
      role: "Bowler",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Retention",
    },
    {
      name: "Nathan Ellis",
      role: "Bowler",
      nat: "Australia",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Mitch Marsh",
      role: "All-rounder",
      nat: "Australia",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
  ],
  "Trent Rockets": [
    {
      name: "Tom Banton",
      role: "WK-Batter",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Retention",
    },
    {
      name: "Tim David",
      role: "Batter",
      nat: "Singapore",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Ben Duckett",
      role: "Batter",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Mitchell Santner",
      role: "All-rounder",
      nat: "New Zealand",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
  ],
  "Welsh Fire": [
    {
      name: "Marco Jansen",
      role: "All-rounder",
      nat: "South Africa",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Rachin Ravindra",
      role: "All-rounder",
      nat: "New Zealand",
      os: true,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Phil Salt",
      role: "WK-Batter",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Direct signing",
    },
    {
      name: "Chris Woakes",
      role: "All-rounder",
      nat: "England",
      os: false,
      salary: 237500,
      type: "Retention",
    },
  ],
};

// Pool definitions — manually defined by tier, role type, and price band
// Each player in the auction pool belongs to exactly one pool
// Pools are auctioned in order; within each pool players go one at a time in shuffled order

export const HUNDRED_POOLS = [
  // ECB official Tier 1 & 2 sets
  {
    id: "marquee",
    label: "Marquee",
    desc: "Top domestic & international stars",
    color: "#d29922",
    filter: (p) => p.ecbGroup === "Marquee Players",
  },
  {
    id: "tier1_bat",
    label: "Tier 1 — Batters",
    desc: "Premium batting",
    color: "#58a6ff",
    filter: (p) => p.ecbGroup === "Tier 1 Batters",
  },
  {
    id: "tier1_fast",
    label: "Tier 1 — Fast",
    desc: "Premium pace bowling",
    color: "#f85149",
    filter: (p) => p.ecbGroup === "Tier 1 Fast Bowlers",
  },
  {
    id: "tier1_ar",
    label: "Tier 1 — All-rounders",
    desc: "Premium all-round",
    color: "#3fb950",
    filter: (p) => p.ecbGroup === "Tier 1 All-rounders",
  },
  {
    id: "tier1_spin",
    label: "Tier 1 — Spin",
    desc: "Premium spin bowling",
    color: "#a5d6ff",
    filter: (p) => p.ecbGroup === "Tier 1 Spin Bowlers",
  },
  {
    id: "tier2_bat",
    label: "Tier 2 — Batters",
    desc: "Strong batting options",
    color: "#79c0ff",
    filter: (p) => p.ecbGroup === "Tier 2 Batters",
  },
  {
    id: "tier2_fast",
    label: "Tier 2 — Fast",
    desc: "Strong pace bowling",
    color: "#ffa198",
    filter: (p) => p.ecbGroup === "Tier 2 Fast Bowlers",
  },
  {
    id: "tier2_ar",
    label: "Tier 2 — All-rounders",
    desc: "Strong all-round options",
    color: "#7ee787",
    filter: (p) => p.ecbGroup === "Tier 2 All-rounders",
  },
  {
    id: "tier2_spin",
    label: "Tier 2 — Spin",
    desc: "Strong spin bowling",
    color: "#cae8ff",
    filter: (p) => p.ecbGroup === "Tier 2 Spin Bowlers",
  },
  // Tier 3 — Experienced internationals & Blast regulars (£50K–£75K longlist)
  {
    id: "tier3_bat",
    label: "Tier 3 — Batters",
    desc: "Intl & experienced Blast batters £50–75K",
    color: "#58a6ff",
    filter: (p) => p.ecbGroup === "Tier 3 Batters",
  },
  {
    id: "tier3_fast",
    label: "Tier 3 — Fast",
    desc: "Intl & experienced Blast pace £50–75K",
    color: "#f85149",
    filter: (p) => p.ecbGroup === "Tier 3 Fast Bowlers",
  },
  {
    id: "tier3_ar",
    label: "Tier 3 — All-rounders",
    desc: "Intl & experienced Blast AR £50–75K",
    color: "#3fb950",
    filter: (p) => p.ecbGroup === "Tier 3 All-rounders",
  },
  {
    id: "tier3_spin",
    label: "Tier 3 — Spin",
    desc: "Intl & experienced Blast spin £50–75K",
    color: "#a5d6ff",
    filter: (p) => p.ecbGroup === "Tier 3 Spin Bowlers",
  },
  // Tier 4 — County depth & fringe internationals (£31K) — ~6 players each
  {
    id: "tier4_bat",
    label: "Tier 4 — Batters",
    desc: "County batters & WKs (senior) £31K",
    color: "#8b949e",
    filter: (p) => p.ecbGroup === "Tier 4 Batters",
  },
  {
    id: "tier4_fast",
    label: "Tier 4 — Fast",
    desc: "County pace bowlers (senior) £31K",
    color: "#8b949e",
    filter: (p) => p.ecbGroup === "Tier 4 Fast Bowlers",
  },
  {
    id: "tier4_ar",
    label: "Tier 4 — All-rounders",
    desc: "County all-rounders (senior) £31K",
    color: "#8b949e",
    filter: (p) => p.ecbGroup === "Tier 4 All-rounders",
  },
  {
    id: "tier4_spin",
    label: "Tier 4 — Spin",
    desc: "County depth spinners £31K",
    color: "#8b949e",
    filter: (p) => p.ecbGroup === "Tier 4 Spin Bowlers",
  },
  // Tier 5 — County emerging & Lions regulars (£31K) — ~6 players each
  {
    id: "tier5_bat",
    label: "Tier 5 — Batters",
    desc: "County batters & WKs (emerging) £31K",
    color: "#8b949e",
    filter: (p) => p.ecbGroup === "Tier 5 Batters",
  },
  {
    id: "tier5_fast",
    label: "Tier 5 — Fast",
    desc: "County pace bowlers (emerging) £31K",
    color: "#8b949e",
    filter: (p) => p.ecbGroup === "Tier 5 Fast Bowlers",
  },
  {
    id: "tier5_ar",
    label: "Tier 5 — All-rounders",
    desc: "County all-rounders (emerging) £31K",
    color: "#8b949e",
    filter: (p) => p.ecbGroup === "Tier 5 All-rounders",
  },
  // Tier 6 — Development pathway: England Lions, U19 WC & deepest county (£31K)
  {
    id: "tier6_bat",
    label: "Tier 6 — Batters",
    desc: "Dev pathway batters £31K",
    color: "#6e7681",
    filter: (p) => p.ecbGroup === "Tier 6 Batters",
  },
  {
    id: "tier6_fast",
    label: "Tier 6 — Fast",
    desc: "Dev pathway pace bowlers £31K",
    color: "#6e7681",
    filter: (p) => p.ecbGroup === "Tier 6 Fast Bowlers",
  },
  {
    id: "tier6_ar",
    label: "Tier 6 — All-rounders",
    desc: "Dev pathway all-rounders £31K",
    color: "#6e7681",
    filter: (p) => p.ecbGroup === "Tier 6 All-rounders",
  },
  {
    id: "tier6_spin",
    label: "Tier 6 — Spin",
    desc: "Dev pathway spinners £31K",
    color: "#6e7681",
    filter: (p) => p.ecbGroup === "Tier 6 Spin Bowlers",
  },
];

// Tiered bid increments per the 2026 auction rules (Rule 4.13)
export function hundredIncrement(currentBid) {
  if (currentBid < 32500) return 1500;
  if (currentBid < 50000) return 2500;
  if (currentBid < 100000) return 5000;
  return 10000;
}

export function hundredIncrementLabel(currentBid) {
  const inc = hundredIncrement(currentBid);
  if (inc >= 1000) return `£${inc / 1000}K`;
  return `£${inc}`;
}

// Full curated player list from 2026 registration PDF
// Roles inferred from known positions; omits retained players (handled separately)
// Covers all ECB Tiers 1–5; 154 players across domestic and overseas
export const HUNDRED_PLAYERS = [
  // Source: ECB official Men's Auction Sets and Longlist 2026
  // ── MARQUEE PLAYERS ───────────────────────────────────────────────────────
  // Tier 1 & 2 = official ECB auction sets | Tier 3 = experienced intls & Blast regulars (£50–75K)
  // Tier 4 = county depth & fringe internationals (£31K) | Tier 5 = development pathway players (£31K)
  {
    name: "Jonny Bairstow",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 100000,
    ecbGroup: "Marquee Players",
  },
  {
    name: "Adil Rashid",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 100000,
    ecbGroup: "Marquee Players",
  },
  {
    name: "James Vince",
    role: "Batter",
    nat: "England",
    os: false,
    base: 100000,
    ecbGroup: "Marquee Players",
  },
  {
    name: "Jordan Cox",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 75000,
    ecbGroup: "Marquee Players",
  },
  {
    name: "Joe Root",
    role: "Batter",
    nat: "England",
    os: false,
    base: 75000,
    ecbGroup: "Marquee Players",
  },
  {
    name: "Aiden Markram",
    role: "Batter",
    nat: "South Africa",
    os: true,
    base: 100000,
    ecbGroup: "Marquee Players",
  },
  {
    name: "David Miller",
    role: "Batter",
    nat: "South Africa",
    os: true,
    base: 100000,
    ecbGroup: "Marquee Players",
  },
  {
    name: "Sunil Narine",
    role: "All-rounder",
    nat: "West Indies",
    os: true,
    base: 100000,
    ecbGroup: "Marquee Players",
  },
  {
    name: "Haris Rauf",
    role: "Bowler",
    nat: "Pakistan",
    os: true,
    base: 100000,
    ecbGroup: "Marquee Players",
  },
  {
    name: "Daryl Mitchell",
    role: "Batter",
    nat: "New Zealand",
    os: true,
    base: 75000,
    ecbGroup: "Marquee Players",
  },
  // ── TIER 1 BATTERS ────────────────────────────────────────────────────────
  {
    name: "Finn Allen",
    role: "WK-Batter",
    nat: "New Zealand",
    os: true,
    base: 100000,
    ecbGroup: "Tier 1 Batters",
  },
  {
    name: "Quinton de Kock",
    role: "WK-Batter",
    nat: "South Africa",
    os: true,
    base: 100000,
    ecbGroup: "Tier 1 Batters",
  },
  {
    name: "Ryan Rickelton",
    role: "WK-Batter",
    nat: "South Africa",
    os: true,
    base: 100000,
    ecbGroup: "Tier 1 Batters",
  },
  {
    name: "Tim Seifert",
    role: "WK-Batter",
    nat: "New Zealand",
    os: true,
    base: 100000,
    ecbGroup: "Tier 1 Batters",
  },
  {
    name: "Zak Crawley",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 1 Batters",
  },
  // ── TIER 1 FAST BOWLERS ───────────────────────────────────────────────────
  {
    name: "Shaheen Shah Afridi",
    role: "Bowler",
    nat: "Pakistan",
    os: true,
    base: 100000,
    ecbGroup: "Tier 1 Fast Bowlers",
  },
  {
    name: "Joshua Tongue",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 75000,
    ecbGroup: "Tier 1 Fast Bowlers",
  },
  {
    name: "Luke Wood",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 75000,
    ecbGroup: "Tier 1 Fast Bowlers",
  },
  {
    name: "Sonny Baker",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 1 Fast Bowlers",
  },
  {
    name: "Saqib Mahmood",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 1 Fast Bowlers",
  },
  // ── TIER 1 ALL-ROUNDERS ───────────────────────────────────────────────────
  {
    name: "Tom Curran",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 100000,
    ecbGroup: "Tier 1 All-rounders",
  },
  {
    name: "Shadab Khan",
    role: "All-rounder",
    nat: "Pakistan",
    os: true,
    base: 100000,
    ecbGroup: "Tier 1 All-rounders",
  },
  {
    name: "Azmatullah Omarzai",
    role: "All-rounder",
    nat: "Afghanistan",
    os: true,
    base: 100000,
    ecbGroup: "Tier 1 All-rounders",
  },
  {
    name: "David Willey",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 100000,
    ecbGroup: "Tier 1 All-rounders",
  },
  {
    name: "Gus Atkinson",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 1 All-rounders",
  },
  // ── TIER 1 SPIN BOWLERS ───────────────────────────────────────────────────
  {
    name: "Akeal Hosein",
    role: "Bowler",
    nat: "West Indies",
    os: true,
    base: 100000,
    ecbGroup: "Tier 1 Spin Bowlers",
  },
  {
    name: "Allah Ghazanfar",
    role: "Bowler",
    nat: "Afghanistan",
    os: true,
    base: 75000,
    ecbGroup: "Tier 1 Spin Bowlers",
  },
  {
    name: "Rishad Hossain",
    role: "Bowler",
    nat: "Bangladesh",
    os: true,
    base: 75000,
    ecbGroup: "Tier 1 Spin Bowlers",
  },
  {
    name: "Usman Tariq",
    role: "Bowler",
    nat: "Pakistan",
    os: true,
    base: 100000,
    ecbGroup: "Tier 1 Spin Bowlers",
  },
  {
    name: "Jafer Chohan",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 1 Spin Bowlers",
  },
  // ── TIER 2 BATTERS ────────────────────────────────────────────────────────
  {
    name: "Tom Kohler-Cadmore",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 75000,
    ecbGroup: "Tier 2 Batters",
  },
  {
    name: "Joe Clarke",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 2 Batters",
  },
  {
    name: "Leus du Plooy",
    role: "Batter",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 2 Batters",
  },
  {
    name: "Tom Abell",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 2 Batters",
  },
  {
    name: "Will Smeed",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 2 Batters",
  },
  // ── TIER 2 FAST BOWLERS ───────────────────────────────────────────────────
  {
    name: "Trent Boult",
    role: "Bowler",
    nat: "New Zealand",
    os: true,
    base: 100000,
    ecbGroup: "Tier 2 Fast Bowlers",
  },
  {
    name: "Chris Jordan",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 100000,
    ecbGroup: "Tier 2 Fast Bowlers",
  },
  {
    name: "David Payne",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 75000,
    ecbGroup: "Tier 2 Fast Bowlers",
  },
  {
    name: "Olly Stone",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 2 Fast Bowlers",
  },
  {
    name: "Matthew Potts",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 2 Fast Bowlers",
  },
  // ── TIER 2 ALL-ROUNDERS ───────────────────────────────────────────────────
  {
    name: "Saim Ayub",
    role: "All-rounder",
    nat: "Pakistan",
    os: true,
    base: 100000,
    ecbGroup: "Tier 2 All-rounders",
  },
  {
    name: "James Coles",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 75000,
    ecbGroup: "Tier 2 All-rounders",
  },
  {
    name: "Daniel Lawrence",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 75000,
    ecbGroup: "Tier 2 All-rounders",
  },
  {
    name: "Ben Dwarshuis",
    role: "All-rounder",
    nat: "Australia",
    os: true,
    base: 50000,
    ecbGroup: "Tier 2 All-rounders",
  },
  {
    name: "Lewis Gregory",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 2 All-rounders",
  },
  // ── TIER 2 SPIN BOWLERS ───────────────────────────────────────────────────
  {
    name: "Abrar Ahmed",
    role: "Bowler",
    nat: "Pakistan",
    os: true,
    base: 75000,
    ecbGroup: "Tier 2 Spin Bowlers",
  },
  {
    name: "Keshav Maharaj",
    role: "Bowler",
    nat: "South Africa",
    os: true,
    base: 50000,
    ecbGroup: "Tier 2 Spin Bowlers",
  },
  {
    name: "Nathan Sowter",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 2 Spin Bowlers",
  },
  {
    name: "Mason Crane",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 2 Spin Bowlers",
  },
  {
    name: "Tom Hartley",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 2 Spin Bowlers",
  },
  // ── TIER 3 BATTERS ────────────────────────────────────────────────────────
  {
    name: "Faf du Plessis",
    role: "Batter",
    nat: "South Africa",
    os: true,
    base: 100000,
    ecbGroup: "Tier 3 Batters",
  },
  {
    name: "Sherfane Rutherford",
    role: "Batter",
    nat: "West Indies",
    os: true,
    base: 100000,
    ecbGroup: "Tier 3 Batters",
  },
  {
    name: "Matthew Short",
    role: "Batter",
    nat: "Australia",
    os: true,
    base: 75000,
    ecbGroup: "Tier 3 Batters",
  },
  {
    name: "Mark Chapman",
    role: "Batter",
    nat: "New Zealand",
    os: true,
    base: 75000,
    ecbGroup: "Tier 3 Batters",
  },
  {
    name: "Dawid Malan",
    role: "Batter",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 3 Batters",
  },
  {
    name: "Tawanda Muyeye",
    role: "Batter",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 3 Batters",
  },
  {
    name: "Laurie Evans",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 3 Batters",
  },
  {
    name: "Thomas Moores",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 3 Batters",
  },
  // ── TIER 3 FAST BOWLERS ───────────────────────────────────────────────────
  {
    name: "Lockie Ferguson",
    role: "Bowler",
    nat: "New Zealand",
    os: true,
    base: 75000,
    ecbGroup: "Tier 3 Fast Bowlers",
  },
  {
    name: "Anrich Nortje",
    role: "Bowler",
    nat: "South Africa",
    os: true,
    base: 75000,
    ecbGroup: "Tier 3 Fast Bowlers",
  },
  {
    name: "Fazalhaq Farooqi",
    role: "Bowler",
    nat: "Afghanistan",
    os: true,
    base: 75000,
    ecbGroup: "Tier 3 Fast Bowlers",
  },
  {
    name: "William O'Rourke",
    role: "Bowler",
    nat: "New Zealand",
    os: true,
    base: 75000,
    ecbGroup: "Tier 3 Fast Bowlers",
  },
  {
    name: "Matt Henry",
    role: "Bowler",
    nat: "New Zealand",
    os: true,
    base: 75000,
    ecbGroup: "Tier 3 Fast Bowlers",
  },
  {
    name: "Lungi Ngidi",
    role: "Bowler",
    nat: "South Africa",
    os: true,
    base: 50000,
    ecbGroup: "Tier 3 Fast Bowlers",
  },
  {
    name: "Chris Wood",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 3 Fast Bowlers",
  },
  {
    name: "Tymal Mills",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 75000,
    ecbGroup: "Tier 3 Fast Bowlers",
  },
  // ── TIER 3 ALL-ROUNDERS ───────────────────────────────────────────────────
  {
    name: "Wanindu Hasaranga",
    role: "All-rounder",
    nat: "Sri Lanka",
    os: true,
    base: 100000,
    ecbGroup: "Tier 3 All-rounders",
  },
  {
    name: "Sikandar Raza",
    role: "All-rounder",
    nat: "Zimbabwe",
    os: true,
    base: 100000,
    ecbGroup: "Tier 3 All-rounders",
  },
  {
    name: "Muhammad Nawaz",
    role: "All-rounder",
    nat: "Pakistan",
    os: true,
    base: 100000,
    ecbGroup: "Tier 3 All-rounders",
  },
  {
    name: "Dasun Shanaka",
    role: "All-rounder",
    nat: "Sri Lanka",
    os: true,
    base: 75000,
    ecbGroup: "Tier 3 All-rounders",
  },
  {
    name: "Aaron Hardie",
    role: "All-rounder",
    nat: "Australia",
    os: true,
    base: 75000,
    ecbGroup: "Tier 3 All-rounders",
  },
  {
    name: "Usama Mir",
    role: "All-rounder",
    nat: "Pakistan",
    os: true,
    base: 50000,
    ecbGroup: "Tier 3 All-rounders",
  },
  {
    name: "Benjamin Howell",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 3 All-rounders",
  },
  {
    name: "Daniel Mousley",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 50000,
    ecbGroup: "Tier 3 All-rounders",
  },
  // ── TIER 3 FAST BOWLERS (continued) ──────────────────────────────────────
  {
    name: "Mustafizur Rahman",
    role: "Bowler",
    nat: "Bangladesh",
    os: true,
    base: 100000,
    ecbGroup: "Tier 3 Fast Bowlers",
  },
  {
    name: "Muhammad Amir",
    role: "Bowler",
    nat: "Pakistan",
    os: true,
    base: 75000,
    ecbGroup: "Tier 3 Fast Bowlers",
  },
  {
    name: "Zaman Khan",
    role: "Bowler",
    nat: "Pakistan",
    os: true,
    base: 75000,
    ecbGroup: "Tier 3 Fast Bowlers",
  },

  // ── TIER 3 SPIN BOWLERS ───────────────────────────────────────────────────
  {
    name: "Mujeeb Ur Rahman",
    role: "Bowler",
    nat: "Afghanistan",
    os: true,
    base: 100000,
    ecbGroup: "Tier 3 Spin Bowlers",
  },
  {
    name: "Gudakesh Motie",
    role: "Bowler",
    nat: "West Indies",
    os: true,
    base: 50000,
    ecbGroup: "Tier 3 Spin Bowlers",
  },
  {
    name: "Tabraiz Shamsi",
    role: "Bowler",
    nat: "South Africa",
    os: true,
    base: 50000,
    ecbGroup: "Tier 3 Spin Bowlers",
  },
  {
    name: "Waqar Salamkheil",
    role: "Bowler",
    nat: "Afghanistan",
    os: true,
    base: 31000,
    ecbGroup: "Tier 3 Spin Bowlers",
  },
  {
    name: "Ashton Agar",
    role: "Bowler",
    nat: "Australia",
    os: true,
    base: 31000,
    ecbGroup: "Tier 3 Spin Bowlers",
  },
  // Tier 4 Batters — senior county (Sam Billings, Pope, Roy, Jennings, Clark, Flintoff)
  // Tier 5 Batters — emerging county (Haynes, McKinney, Tribe, Pepper, Donald, Rew)
  {
    name: "Sam Billings",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Batters",
  },
  {
    name: "Ollie Pope",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Batters",
  },
  {
    name: "Jason Roy",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Batters",
  },
  {
    name: "Rocky Flintoff",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Batters",
  },
  {
    name: "Keaton Jennings",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Batters",
  },
  {
    name: "Jack Haynes",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 Batters",
  },
  {
    name: "Graham Clark",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Batters",
  },

  // Tier 4 Fast Bowlers — senior county (Topley, Pennington, Cook, Gleeson, Stanley, Currie)
  // Tier 5 Fast Bowlers — emerging & intl (Aspinwall, Minto, E.Jack, Muzarabani, Baartman, Javed)
  {
    name: "Reece Topley",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Fast Bowlers",
  },
  {
    name: "Dillon Pennington",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Fast Bowlers",
  },
  {
    name: "Sam Cook",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Fast Bowlers",
  },
  {
    name: "Blessing Muzarabani",
    role: "Bowler",
    nat: "Zimbabwe",
    os: true,
    base: 31000,
    ecbGroup: "Tier 5 Fast Bowlers",
  },
  {
    name: "Ottneil Baartman",
    role: "Bowler",
    nat: "South Africa",
    os: true,
    base: 31000,
    ecbGroup: "Tier 5 Fast Bowlers",
  },
  {
    name: "Akif Javed",
    role: "Bowler",
    nat: "Pakistan",
    os: true,
    base: 31000,
    ecbGroup: "Tier 5 Fast Bowlers",
  },
  {
    name: "Richard Gleeson",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Fast Bowlers",
  },

  // Tier 4 All-rounders — senior county (Overton, Higgins, Thompson, Lammonby, Garton, Walter)
  // Tier 5 All-rounders — emerging & intl (Linde, Harrison, Benkenstein, Albert, Revis, Falconer)
  {
    name: "Jimmy Neesham",
    role: "All-rounder",
    nat: "New Zealand",
    os: true,
    base: 31000,
    ecbGroup: "Tier 6 All-rounders",
  },
  {
    name: "Ben Raine",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 All-rounders",
  },
  {
    name: "Craig Overton",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 All-rounders",
  },
  {
    name: "Ryan Higgins",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 All-rounders",
  },
  {
    name: "Jordan Thompson",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 All-rounders",
  },
  {
    name: "Tom Lammonby",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 All-rounders",
  },
  {
    name: "George Garton",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 All-rounders",
  },
  {
    name: "Paul Walter",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 All-rounders",
  },
  {
    name: "George Linde",
    role: "All-rounder",
    nat: "South Africa",
    os: true,
    base: 31000,
    ecbGroup: "Tier 5 All-rounders",
  },
  // Tier 4 Spin Bowlers — 6 players (C.Parkinson, M.Parkinson, Briggs, Trevaskis, Hollman, Qais Ahmad)
  {
    name: "Callum Parkinson",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Spin Bowlers",
  },
  {
    name: "Matthew Parkinson",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Spin Bowlers",
  },
  {
    name: "Danny Briggs",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Spin Bowlers",
  },
  {
    name: "Liam Trevaskis",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Spin Bowlers",
  },
  {
    name: "Luke Hollman",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Spin Bowlers",
  },
  {
    name: "Qais Ahmad",
    role: "Bowler",
    nat: "Afghanistan",
    os: true,
    base: 31000,
    ecbGroup: "Tier 4 Spin Bowlers",
  },
  {
    name: "Sandeep Lamichhane",
    role: "Bowler",
    nat: "Nepal",
    os: true,
    base: 31000,
    ecbGroup: "Tier 6 Spin Bowlers",
  },

  // ── TIER 4 DOMESTIC ADDITIONS ──────────────────────────────────────────────
  // Players present in the ECB official Longlist PDF but omitted from the
  // original JS. All domestic (England), all £31K reserve price.

  // Tier 4 Batters — Longlist PDF entries
  {
    name: "Ben McKinney",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 Batters",
  },
  {
    name: "Asa Tribe",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 Batters",
  },
  {
    name: "Tazeem Ali",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Batters",
  },
  {
    name: "Tom Alsop",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Batters",
  },
  {
    name: "Michael Pepper",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 Batters",
  },
  {
    name: "Aneurin Donald",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 Batters",
  },
  {
    name: "James Rew",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 Batters",
  },

  // Tier 5 Batters — Longlist PDF entries
  {
    name: "Joe Moores",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Batters",
  },

  // Tier 4 & 5 Fast Bowlers — Longlist PDF entries
  {
    name: "Mitchell Stanley",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Fast Bowlers",
  },
  {
    name: "Scott Currie",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 4 Fast Bowlers",
  },
  {
    name: "Tom Helm",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Fast Bowlers",
  },
  {
    name: "George Scrimshaw",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Fast Bowlers",
  },
  {
    name: "Tom Aspinwall",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 Fast Bowlers",
  },
  {
    name: "James Minto",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 Fast Bowlers",
  },
  {
    name: "Edward Jack",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 Fast Bowlers",
  },
  {
    name: "Ben Mayes",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Fast Bowlers",
  },
  {
    name: "Alex Green",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Fast Bowlers",
  },

  // Tier 5 All-rounders — Longlist PDF entries
  {
    name: "Calvin Harrison",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 All-rounders",
  },
  {
    name: "Luc Benkenstein",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 All-rounders",
  },
  {
    name: "Ralphie Albert",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 All-rounders",
  },
  {
    name: "Matthew Revis",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 All-rounders",
  },
  {
    name: "Caleb Falconer",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 5 All-rounders",
  },
  {
    name: "Kasey Aldridge",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 All-rounders",
  },
  {
    name: "Jack Carson",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 All-rounders",
  },

  // Tier 4 Spin Bowlers — Longlist PDF entries (6 players; remainder moved to Tier 5)
  // (Jafer Chohan already appears in the Tier 1 Spin pool above — not duplicated here)
  {
    name: "Farhan Ahmed",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Spin Bowlers",
  },
  {
    name: "Liam Patterson-White",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Spin Bowlers",
  },

  // ── TIER 5 — DEVELOPMENT PLAYERS ──────────────────────────────────────────
  // England U19 WC 2026 squad members, England U19 WC 2024 squad members, and
  // other ECB-pathway domestic players not yet on the main longlist.
  // Reserve price £31K. Primarily here to ensure squads can reach 15-player minimum.

  // Tier 6 Batters
  {
    name: "Will Bennison",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Batters",
    note: "Eng U19 WC 2026",
  },
  {
    name: "Luke Hands",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Batters",
    note: "Eng U19 WC 2026",
  },
  {
    name: "Sebastian Morgan",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Batters",
    note: "Eng U19 WC 2024 & 2026",
  },
  {
    name: "Jaydn Denly",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Batters",
    note: "Eng U19 WC 2024",
  },
  {
    name: "Haydon Mustard",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Batters",
    note: "Eng U19 WC 2024",
  },
  {
    name: "Manny Lumsden",
    role: "Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Batters",
    note: "Eng U19 WC 2026",
  },
  {
    name: "Thomas Rew",
    role: "WK-Batter",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Batters",
    note: "Eng U19 WC 2026 captain",
  },

  // Tier 6 Fast Bowlers
  {
    name: "Ben Dawkins",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Fast Bowlers",
    note: "Eng U19 WC 2026",
  },
  {
    name: "Alex French",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Fast Bowlers",
    note: "Eng U19 WC 2026",
  },
  {
    name: "Noah Thain",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Fast Bowlers",
    note: "Eng U19 WC 2024",
  },
  {
    name: "Theo Wylie",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Fast Bowlers",
    note: "Eng U19 WC 2024",
  },
  {
    name: "Charlie Barnard",
    role: "Bowler",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 Fast Bowlers",
    note: "Eng U19 WC 2024",
  },

  // Tier 6 All-rounders
  {
    name: "Ali Farooq",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 All-rounders",
    note: "Eng U19 WC 2026",
  },
  {
    name: "Charlie Allison",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 All-rounders",
    note: "Eng U19 WC 2024",
  },
  {
    name: "Hamza Shaikh",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 All-rounders",
    note: "Eng U19 WC 2024",
  },
  {
    name: "Jack Carney",
    role: "All-rounder",
    nat: "England",
    os: false,
    base: 31000,
    ecbGroup: "Tier 6 All-rounders",
    note: "Eng U19 WC 2024",
  },

];

// Build pool-categorised auction list from player data
// Removes any player already retained by a team
export function buildHundredAuctionPools(retentions, extraPlayers = []) {
  const retainedNames = new Set(
    Object.values(retentions)
      .flat()
      .map((p) => p.name),
  );
  // Merge base player list with any released retained players injected back in
  const extraNames = new Set(extraPlayers.map((p) => p.name));
  const basePlayers = HUNDRED_PLAYERS.filter(
    (p) => !retainedNames.has(p.name) && !extraNames.has(p.name),
  );
  const available = [
    ...basePlayers,
    ...extraPlayers.filter((p) => !retainedNames.has(p.name)),
  ];

  return HUNDRED_POOLS.map((pool) => ({
    ...pool,
    players: available.filter(pool.filter).sort(() => Math.random() - 0.5),
  })).filter((pool) => pool.players.length > 0);
}

// When a retained player is released back into the auction pool,
// assign them the correct base price and pool based on their profile.
// Marquee = top internationals; 75K = strong internationals; 50K = fringe; 31K = domestic depth
export function classifyReleasedPlayer(player) {
  // Assign released retained player to correct ECB group and base price
  const marqueeNames = [
    "Jos Buttler",
    "Sam Curran",
    "Jofra Archer",
    "Harry Brook",
    "Liam Livingstone",
    "Rashid Khan",
    "Andre Russell",
    "Mark Wood",
    "Jonny Bairstow",
    "Jamie Overton",
    "Chris Woakes",
    "Trent Boult",
    "Heinrich Klaasen",
    "Mitchell Santner",
    "Marcus Stoinis",
    "Tim David",
    "Marco Jansen",
    "Rachin Ravindra",
    "Phil Salt",
    "Jacob Bethell",
    "Will Jacks",
    "Nicholas Pooran",
    "Dewald Brevis",
    "Adam Zampa",
    "Mitch Marsh",
    "Noor Ahmad",
    "Ben Duckett",
    "Tom Banton",
    "David Miller",
    "Tristan Stubbs",
    "Mitchell Owen",
    "Finn Allen",
    "Brydon Carse",
    "Nathan Ellis",
    "Jamie Smith",
    "Liam Dawson",
    "Shaheen Shah Afridi",
  ];
  // Tier 2 equivalents — direct to relevant official set if possible
  const tier2AR = [
    "Tom Curran",
    "Shadab Khan",
    "Azmatullah Omarzai",
    "David Willey",
    "Saim Ayub",
    "James Coles",
    "Daniel Lawrence",
  ];
  const tier2Fast = [
    "Chris Jordan",
    "David Payne",
    "Joshua Tongue",
    "Luke Wood",
  ];
  const tier2Spin = [
    "Abrar Ahmed",
    "Keshav Maharaj",
    "Nathan Sowter",
    "Mason Crane",
    "Tom Hartley",
  ];
  // Spinners among retained players who could be released
  const spinnerNames = [
    "Rehan Ahmed",
    "Adam Zampa",
    "Rashid Khan",
    "Noor Ahmad",
    "Adil Rashid",
    "Mitchell Santner",
    "Liam Dawson",
  ];
  const tier2Bat = [
    "Tom Kohler-Cadmore",
    "Joe Clarke",
    "Leus du Plooy",
    "Tom Abell",
    "Will Smeed",
  ];
  const tier1Bat = [
    "Aiden Markram",
    "David Miller",
    "Daryl Mitchell",
    "Jordan Cox",
    "Joe Root",
    "Zak Crawley",
  ];

  let base = 31000;
  let ecbGroup = "Tier 4 All-rounders";

  if (marqueeNames.includes(player.name)) {
    base = 100000;
    ecbGroup = "Marquee Players";
  } else if (tier2AR.includes(player.name)) {
    base = player.os ? 100000 : 75000;
    ecbGroup = "Tier 2 All-rounders";
  } else if (tier2Fast.includes(player.name)) {
    base = 75000;
    ecbGroup = "Tier 2 Fast Bowlers";
  } else if (tier2Spin.includes(player.name)) {
    base = 75000;
    ecbGroup = "Tier 2 Spin Bowlers";
  } else if (tier2Bat.includes(player.name)) {
    base = 75000;
    ecbGroup = "Tier 2 Batters";
  } else if (tier1Bat.includes(player.name)) {
    base = 100000;
    ecbGroup = "Tier 1 Batters";
  } else if (player.role === "WK-Batter" || player.role === "Batter") {
    base = player.os ? 50000 : 31000;
    ecbGroup = player.os ? "Tier 3 Batters" : "Tier 4 Batters";
  } else if (spinnerNames.includes(player.name)) {
    base = player.os ? 50000 : 31000;
    ecbGroup = player.os ? "Tier 3 Spin Bowlers" : "Tier 4 Spin Bowlers";
  } else if (player.role === "Bowler") {
    base = player.os ? 50000 : 31000;
    ecbGroup = player.os ? "Tier 3 Fast Bowlers" : "Tier 4 Fast Bowlers";
  } else {
    base = player.os ? 50000 : 31000;
    ecbGroup = player.os ? "Tier 3 All-rounders" : "Tier 4 All-rounders";
  }

  return { ...player, base, ecbGroup, salary: undefined, type: undefined };
}
