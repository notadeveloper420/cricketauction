import { useState } from 'react'
import { LEAGUES, genCode, calcHundredDeduction } from '../data/leagues.js'
import { HUNDRED_RETENTIONS, HUNDRED_PLAYERS, buildHundredAuctionPools } from '../data/hundred.js'
import { setRoom } from '../lib/rooms.js'

export default function HostSetupScreen({ goTo }) {
  const [name, setName] = useState('')
  const [league, setLeague] = useState(null)
  const [timerSecs, setTimerSecs] = useState(10)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function createRoom() {
    if (!name.trim()) { setError('Enter your name'); return }
    if (!league) { setError('Select a league'); return }
    setError('')
    setLoading(true)
    try {
      const code = genCode()
      const l = LEAGUES[league]

      let players, retentions = null, auctionPools = null

      if (league === 'hundred') {
        // Deep-clone retentions so they can be edited in the lobby
        retentions = JSON.parse(JSON.stringify(HUNDRED_RETENTIONS))
        // Build pool-categorised player list (excludes retained players)
        auctionPools = buildHundredAuctionPools(retentions)
        // Flatten pools into players array — pool info preserved on each player
        players = auctionPools.flatMap(pool =>
          pool.players.map(p => ({ ...p, poolId: pool.id, poolLabel: pool.label }))
        )
      } else {
        players = [...l.players].sort(() => Math.random() - 0.5)
      }

      // Build teams — for Hundred, deduct retention salaries from cap
      const teams = l.teams.map(t => {
        const retained = retentions ? (retentions[t] || []) : []
        // Tiered deduction: 1=£350K, 2=£650K, 3=£850K, 4=£950K
        const deduction = league === 'hundred' ? calcHundredDeduction(retained.length) : retained.reduce((s,p) => s+p.salary, 0)
        return {
          name: t,
          human: null,
          budget: l.cap - deduction,
          squad: retained.map(p => ({ ...p, price: p.salary, retained: true })),
        }
      })

      const roomData = {
        code, league, hostName: name.trim(), timerSecs,
        teams,
        players,
        retentions, // stored so lobby can edit
        auctionPools: auctionPools ? auctionPools.map(p => ({ id: p.id, label: p.label, desc: p.desc, color: p.color, playerCount: p.players.length })) : null,
        currentPoolIdx: 0,
        currentIdx: 0,
        currentBid: players[0]?.base ?? 0,
        currentLeader: null,
        phase: 'lobby',
        log: [`${name.trim()} created the room`],
        timerEnd: null,
        soldResult: null,
        timerHandled: false,
      }

      await setRoom(code, roomData)
      goTo('lobby', { roomCode: code, myName: name.trim(), myTeam: null, isHost: true, league })
    } catch (e) {
      setError('Failed to create room: ' + e.message)
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: '1.5rem' }}>Set up auction</h2>

      <div style={{ marginBottom: 16 }}>
        <label>Your name (host)</label>
        <input
          type="text" value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Rohit"
          onKeyDown={e => e.key === 'Enter' && createRoom()}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ marginBottom: 10 }}>Choose league</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {Object.entries(LEAGUES).map(([key, l]) => (
            <div
              key={key}
              className={`league-card${league === key ? ' selected' : ''}`}
              onClick={() => setLeague(key)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: 'Barlow Condensed', fontSize: 18, fontWeight: 700 }}>{l.name}</span>
                <span className={`badge badge-${key}`}>{l.capLabel} cap</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
                {l.teams.length} teams · {
                  key === 'hundred'
                    ? `${HUNDRED_PLAYERS.length} auction players + ${Object.values(HUNDRED_RETENTIONS).flat().length} retained`
                    : `${l.players.length} players`
                }
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{l.limitsLabel}</div>
              {key === 'hundred' && (
                <div style={{ fontSize: 12, color: 'var(--blue)', marginTop: 4 }}>
                  ★ Real 2025 retentions · Pool-based auction · 2026 rules
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ marginBottom: 8 }}>Bid countdown timer</label>
        <div className="timer-opts">
          {[5, 10, 15, 20].map(s => (
            <button key={s} className={`timer-opt${timerSecs === s ? ' selected' : ''}`} onClick={() => setTimerSecs(s)}>
              {s}s
            </button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 6 }}>Resets on every new bid</p>
      </div>

      {error && <div className="banner banner-error" style={{ marginBottom: 12 }}>{error}</div>}

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-primary" onClick={createRoom} disabled={loading}>
          {loading ? 'Creating…' : 'Create room'}
        </button>
        <button className="btn btn-ghost" onClick={() => goTo('home')}>Back</button>
      </div>
    </div>
  )
}
