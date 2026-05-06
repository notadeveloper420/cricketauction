# Cricket Auction Simulator

Real-time multiplayer cricket auction game — IPL, The Hundred, SA20.  
Friends join on their own devices via a shared room code.

---

## Quick setup (takes ~10 minutes)

### Step 1 — Get the code running locally

You need [Node.js](https://nodejs.org) installed (version 18+).

```bash
# Install dependencies
npm install

# Copy the environment variables template
cp .env.example .env.local
```

### Step 2 — Create a free Supabase project

1. Go to [supabase.com](https://supabase.com) and sign up (free, no credit card)
2. Click **New project**, give it a name (e.g. `cricket-auction`), set a password, pick a region close to you
3. Wait ~2 minutes for the project to be ready

### Step 3 — Set up the database

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Open the file `supabase-schema.sql` from this project and paste its contents
4. Click **Run** — you should see "Success"

### Step 4 — Add your Supabase credentials

1. In Supabase dashboard, go to **Settings → API**
2. Copy the **Project URL** and **anon public** key
3. Open `.env.local` and fill them in:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 5 — Run it

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — you should see the auction home screen.

---

## Playing with friends

### Option A — Local network (same WiFi)
Find your local IP address (e.g. `192.168.1.42`) and share `http://192.168.1.42:5173` with friends on the same network.

### Option B — Deploy to the internet (recommended)

Deploy for free on [Vercel](https://vercel.com):

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com), sign in with GitHub
3. Click **New Project**, import your repo
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
5. Click **Deploy** — Vercel gives you a public URL like `https://cricket-auction.vercel.app`
6. Share that URL with friends — they can join from anywhere

---

## How to play

1. **Host** clicks "Host auction", picks a league and timer speed, creates a room
2. **Friends** go to the same URL, click "Join room", enter the room code
3. Empty team slots are filled by AI bots
4. Host clicks **Start auction**
5. Players come up one at a time — anyone can bid at any time
6. Timer resets on every new bid — last bidder when timer hits zero wins the player
7. Overseas caps and squad limits are enforced automatically

---

## Leagues

| League | Teams | Cap | Overseas limit | Squad min |
|--------|-------|-----|----------------|-----------|
| IPL 2025 | 10 | ₹120 Cr | 8 (4 per XI) | 18 |
| The Hundred | 8 | £2M | 3 per squad | 15 |
| SA20 | 6 | R45M | 6 (4 per XI) | 16 |

---

## Project structure

```
src/
  components/
    HomeScreen.jsx       — Landing page
    HostSetupScreen.jsx  — Create a room
    JoinScreen.jsx       — Join with a code
    LobbyScreen.jsx      — Pre-auction waiting room
    AuctionScreen.jsx    — Live bidding (main screen)
    ResultsScreen.jsx    — Final squads
  data/
    leagues.js           — All league/player data + helpers
  lib/
    supabase.js          — Supabase client
    rooms.js             — Room read/write/subscribe
  App.jsx                — Screen router
  main.jsx               — Entry point
  index.css              — Global styles
```

---

## Coming soon / planned features

- Pre-auction player retentions (IPL/Hundred style)
- RTM (Right to Match) cards
- Custom player lists
- More leagues (BBL, CPL)
