import { useState } from 'react'
import HomeScreen from './components/HomeScreen.jsx'
import HostSetupScreen from './components/HostSetupScreen.jsx'
import JoinScreen from './components/JoinScreen.jsx'
import LobbyScreen from './components/LobbyScreen.jsx'
import AuctionScreen from './components/AuctionScreen.jsx'
import ResultsScreen from './components/ResultsScreen.jsx'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [session, setSession] = useState(null)
  // session: { roomCode, myName, myTeam, isHost, league }

  function goTo(s, data) {
    if (data) setSession(prev => ({ ...prev, ...data }))
    setScreen(s)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span
            style={{ fontFamily: 'Barlow Condensed', fontSize: 22, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--green)', cursor: 'pointer' }}
            onClick={() => goTo('home')}
          >CRICKET AUCTION</span>
          {session?.league && screen !== 'home' && (
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {session.roomCode}
            </span>
          )}
        </div>

        {screen === 'home' && <HomeScreen goTo={goTo} />}
        {screen === 'host-setup' && <HostSetupScreen goTo={goTo} />}
        {screen === 'join' && <JoinScreen goTo={goTo} />}
        {screen === 'lobby' && <LobbyScreen session={session} goTo={goTo} />}
        {screen === 'auction' && <AuctionScreen session={session} goTo={goTo} />}
        {screen === 'results' && <ResultsScreen session={session} goTo={goTo} />}
      </div>
    </div>
  )
}
