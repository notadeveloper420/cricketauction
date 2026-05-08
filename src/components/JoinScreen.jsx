import { useState } from 'react'
import { getRoom, setRoom } from '../lib/rooms.js'

export default function JoinScreen({ goTo }) {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function joinRoom() {
    if (!name.trim()) { setError('Enter your name'); return }
    if (!code.trim()) { setError('Enter a room code'); return }
    setError('')
    setLoading(true)
    try {
      const upperCode = code.trim().toUpperCase()
      const myName = name.trim()
      const room = await getRoom(upperCode)
      if (!room) { setError('Room not found — check the code and try again'); setLoading(false); return }

      // ── Rejoin: already have a team or are the host ────────────────────
      const isHost = room.hostName === myName
      const existingTeam = room.teams.find(t => t.human === myName)
      if (existingTeam || isHost) {
        const dest = room.phase === 'complete' ? 'results'
                   : room.phase === 'lobby'    ? 'lobby'
                   : 'auction'
        goTo(dest, { roomCode: upperCode, myName, myTeam: existingTeam?.name ?? null, isHost, league: room.league })
        return
      }

      // ── New join: lobby only ─────────────────────────────────────────────
      if (room.phase !== 'lobby') {
        // Allow spectator rejoin for in-progress rooms — drop them into auction as observer
        // They won't have a team but can watch
        const dest = room.phase === 'complete' ? 'results' : 'auction'
        goTo(dest, { roomCode: upperCode, myName, myTeam: null, isHost: false, league: room.league })
        return
      }

      // Claim a free slot
      const freeTeam = room.teams.find(t => !t.human)
      if (!freeTeam) { setError('Room is full — all team slots are taken'); setLoading(false); return }
      freeTeam.human = myName
      room.log.push({ type: 'system', text: `${myName} joined as ${freeTeam.name}`, t: Date.now() })
      await setRoom(upperCode, room)
      goTo('lobby', { roomCode: upperCode, myName, myTeam: freeTeam.name, isHost: false, league: room.league })
    } catch (e) {
      setError('Error joining room: ' + e.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 400 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: '1.5rem' }}>Join a room</h2>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Already in a room? Enter your name exactly as before and the same room code to rejoin.
      </p>

      <div style={{ marginBottom: 14 }}>
        <label>Your name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Virat" />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Room code</label>
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          placeholder="e.g. CRICKET42"
          style={{ letterSpacing: '3px', textTransform: 'uppercase' }}
          onKeyDown={e => e.key === 'Enter' && joinRoom()}
        />
      </div>

      {error && <div className="banner banner-error" style={{ marginBottom: 12 }}>{error}</div>}

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-primary" onClick={joinRoom} disabled={loading}>
          {loading ? 'Joining…' : 'Join auction'}
        </button>
        <button className="btn btn-ghost" onClick={() => goTo('home')}>Back</button>
      </div>
    </div>
  )
}
