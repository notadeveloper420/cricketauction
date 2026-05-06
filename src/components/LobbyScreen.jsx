import { useEffect, useState, useRef, useCallback } from 'react'
import { LEAGUES, fmtMoney, calcHundredDeduction } from '../data/leagues.js'
import { buildHundredAuctionPools, classifyReleasedPlayer } from '../data/hundred.js'
import { getRoom, setRoom, subscribeToRoom } from '../lib/rooms.js'
import RetentionsEditor from './RetentionsEditor.jsx'

export default function LobbyScreen({ session, goTo }) {
  const [room, setRoomState] = useState(null)
  const [claiming, setClaiming] = useState(false)
  const [retentions, setRetentions] = useState(null)
  const [activeTab, setActiveTab] = useState('teams')
  const [saving, setSaving] = useState(false)
  const [pendingSave, setPendingSave] = useState(false)
  const saveTimerRef = useRef(null)

  useEffect(() => {
    getRoom(session.roomCode).then(r => {
      if (!r) return
      setRoomState(r)
      if (r.retentions) setRetentions(JSON.parse(JSON.stringify(r.retentions)))
    })
    const unsub = subscribeToRoom(session.roomCode, r => {
      setRoomState(r)
      if (r.retentions && !session.isHost) setRetentions(r.retentions)
      if (r.phase === 'bidding') goTo('auction')
    })
    return unsub
  }, [session.roomCode])

  async function claimTeam(teamName) {
    if (claiming) return
    setClaiming(true)
    try {
      const r = await getRoom(session.roomCode)
      const target = r.teams.find(t => t.name === teamName)
      if (!target || (target.human && target.human !== session.myName)) { setClaiming(false); return }
      const prev = r.teams.find(t => t.human === session.myName)
      if (prev) prev.human = null
      target.human = session.myName
      r.log.push(`${session.myName} picked ${teamName}`)
      await setRoom(session.roomCode, r)
      goTo('lobby', { myTeam: teamName })
    } catch (e) { console.error(e) }
    setClaiming(false)
  }

  async function releaseTeam() {
    if (claiming) return
    setClaiming(true)
    try {
      const r = await getRoom(session.roomCode)
      const prev = r.teams.find(t => t.human === session.myName)
      if (prev) { prev.human = null; r.log.push(`${session.myName} released ${prev.name}`); await setRoom(session.roomCode, r); goTo('lobby', { myTeam: null }) }
    } catch (e) {}
    setClaiming(false)
  }

  const saveRetentions = useCallback(async (retentionsToSave) => {
    setSaving(true)
    try {
      const r = await getRoom(session.roomCode)
      // Find players that were retained before but are no longer retained
      // (host removed them) — classify and inject back into pool
      const prevRetainedNames = new Set(
        Object.values(r.retentions || {}).flat().map(p => p.name)
      )
      const newRetainedNames = new Set(
        Object.values(retentionsToSave).flat().map(p => p.name)
      )
      // Players removed from this save vs what's stored in Supabase
      const released = []
      for (const [teamName, players] of Object.entries(r.retentions || {})) {
        for (const p of players) {
          if (!newRetainedNames.has(p.name)) {
            released.push(classifyReleasedPlayer(p))
          }
        }
      }
      // Also carry forward any previously-released players already in r.players
      // (handles multiple sequential removals where r.retentions has already been updated)
      const originalRetainedNames = new Set(
        Object.values(r.retentions || {}).flat().map(p => p.name)
      )
      const allPreviousRetentionNames = new Set([
        ...Array.from(originalRetainedNames),
        ...Object.values(retentionsToSave).flat().map(p => p.name)
      ])
      // Any player currently in r.players that was never in HUNDRED_PLAYERS is a prev-released retained player
      const alreadyReleased = (r.players || []).filter(p =>
        p.ecbGroup && !newRetainedNames.has(p.name) &&
        !released.find(r2 => r2.name === p.name)
      )
      const allReleased = [...released, ...alreadyReleased]
      // Rebuild player pool — passes all released players in so they appear in correct pool
      const pools = buildHundredAuctionPools(retentionsToSave, allReleased)
      const players = pools.flatMap(pool =>
        pool.players.map(p => ({ ...p, poolId: pool.id, poolLabel: pool.label }))
      )
      const l = LEAGUES['hundred']
      r.retentions = retentionsToSave
      r.players = players
      r.currentIdx = 0
      r.currentBid = players[0]?.base ?? 0
      r.auctionPools = pools.map(p => ({ id: p.id, label: p.label, desc: p.desc, color: p.color, playerCount: p.players.length }))
      // Rebuild team squads and budgets from updated retentions
      r.teams = r.teams.map(t => {
        const retained = retentionsToSave[t.name] || []
        const deduction = r.league === 'hundred' ? calcHundredDeduction(retained.length) : retained.reduce((s,p) => s+p.salary,0)
        return {
          ...t,
          budget: l.cap - deduction,
          squad: retained.map(p => ({ ...p, price: p.salary, retained: true })),
        }
      })
      r.log.push(`${session.myName} updated retentions`)
      await setRoom(session.roomCode, r)
      setRoomState(r)
    } catch (e) { console.error(e) }
    setSaving(false)
    setPendingSave(false)
  }, [])

  async function startAuction() {
    const r = await getRoom(session.roomCode)
    const firstPlayer = r.players[0]
    r.phase = 'bidding'
    r.currentIdx = 0
    r.currentBid = firstPlayer?.base ?? 0
    r.currentLeader = null
    r.timerHandled = false
    r.timerEnd = Date.now() + r.timerSecs * 1000
    r.log.push('Auction started!')
    await setRoom(session.roomCode, r)
  }

  if (!room) return <p style={{ color: 'var(--text-muted)' }}>Loading room…</p>

  const l = LEAGUES[room.league]
  const isHundred = room.league === 'hundred'
  const myCurrentTeam = room.teams.find(t => t.human === session.myName)

  return (
    <div>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: '1.5rem' }}>Auction lobby</h2>

      {/* Info cards */}
      <div className="grid2" style={{ marginBottom: '1.5rem' }}>
        <div className="card">
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Room code — share with friends</div>
          <div className="room-code">{session.roomCode}</div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 8 }}>Same site → "Join room" → enter code</div>
        </div>
        <div className="card">
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>League</div>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
            {l.name} <span className={`badge badge-${room.league}`}>{l.capLabel}</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>{l.limitsLabel}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>{room.players.length} players in pool</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Bid timer: {room.timerSecs}s</div>
          {isHundred && room.auctionPools && (
            <div style={{ fontSize: 12, color: 'var(--blue)', marginTop: 4 }}>
              {room.auctionPools.length} pools · tiered increments
            </div>
          )}
        </div>
      </div>

      {/* Tabs - only show retentions tab for Hundred */}
      {isHundred && (
        <div className="tabs" style={{ marginBottom: '1rem' }}>
          <button className={`tab-btn${activeTab === 'teams' ? ' active' : ''}`} onClick={() => setActiveTab('teams')}>Teams</button>
          <button className={`tab-btn${activeTab === 'retentions' ? ' active' : ''}`} onClick={() => setActiveTab('retentions')}>Retentions</button>
          {isHundred && room.auctionPools && (
            <button className={`tab-btn${activeTab === 'pools' ? ' active' : ''}`} onClick={() => setActiveTab('pools')}>Auction pools</button>
          )}
        </div>
      )}

      {/* Teams tab */}
      {activeTab === 'teams' && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>Pick your team</h3>
            {myCurrentTeam && (
              <button className="btn btn-ghost" style={{ fontSize: 12, padding: '4px 10px' }} onClick={releaseTeam} disabled={claiming}>Release team</button>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {room.teams.map(t => {
              const isMe = t.human === session.myName
              const takenByOther = t.human && !isMe
              const retainedCount = isHundred ? (room.retentions?.[t.name]?.length ?? 0) : 0
              const retainedSpend = isHundred ? (room.retentions?.[t.name] ?? []).reduce((s, p) => s + p.salary, 0) : 0

              return (
                <div
                  key={t.name}
                  onClick={() => !takenByOther && !claiming && claimTeam(t.name)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', borderRadius: 'var(--radius-lg)',
                    border: isMe ? '2px solid var(--green)' : takenByOther ? '1px solid var(--border)' : '1px solid var(--border-mid)',
                    background: isMe ? 'var(--green-bg)' : takenByOther ? 'var(--bg-surface)' : 'var(--bg-elevated)',
                    cursor: takenByOther ? 'not-allowed' : 'pointer',
                    opacity: takenByOther ? 0.55 : 1, transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, background: isMe ? 'var(--green)' : takenByOther ? 'var(--text-dim)' : 'var(--border-strong)' }} />
                    <div>
                      <div style={{ fontFamily: 'Barlow Condensed', fontSize: 16, fontWeight: 700, color: isMe ? 'var(--green)' : takenByOther ? 'var(--text-muted)' : 'var(--text)' }}>
                        {t.name}{isMe ? ' ★' : ''}
                      </div>
                      {isHundred && (
                        <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
                          {retainedCount} retained · {fmtMoney(t.budget, 'hundred')} for auction
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isMe && <span className="badge" style={{ background: 'var(--green-bg)', color: 'var(--green)', border: '1px solid rgba(63,185,80,0.3)' }}>{session.myName}</span>}
                    {takenByOther && <span className="badge" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{t.human}</span>}
                    {!takenByOther && !isMe && <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>Click to claim →</span>}
                  </div>
                </div>
              )
            })}
          </div>
          {!myCurrentTeam && (
            <div className="banner banner-warn" style={{ marginTop: 12 }}>Pick a team above. Unclaimed teams will be AI bots.</div>
          )}
        </div>
      )}

      {/* Retentions tab - Hundred only, host edits */}
      {activeTab === 'retentions' && isHundred && retentions && (
        <div style={{ marginBottom: '1.5rem' }}>
          {session.isHost ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600 }}>Pre-auction retentions</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    Based on real 2025 squads. Remove or add players, then save.
                  </p>
                </div>
                <button className="btn btn-primary" style={{ fontSize: 13 }} onClick={() => saveRetentions(retentions)} disabled={saving}>
                  {saving ? 'Saving…' : pendingSave ? 'Saving…' : 'Saved ✓'}
                </button>
              </div>
              <RetentionsEditor
                retentions={retentions}
                onChange={(updated) => {
                setRetentions(updated)
                setPendingSave(true)
                if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
                saveTimerRef.current = setTimeout(() => saveRetentions(updated), 800)
              }}
                league="hundred"
              />
            </>
          ) : (
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Pre-auction retentions</h3>
              {Object.entries(room.retentions || {}).map(([teamName, players]) => (
                <div key={teamName} className="card" style={{ marginBottom: 8 }}>
                  <div style={{ fontFamily: 'Barlow Condensed', fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{teamName}</div>
                  {players.length === 0
                    ? <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>No retentions</div>
                    : players.map(p => (
                      <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '3px 0', borderBottom: '1px solid var(--border)' }}>
                        <span>{p.name} <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{p.role}</span></span>
                        <span style={{ fontFamily: 'Barlow Condensed' }}>{fmtMoney(p.salary, 'hundred')}</span>
                      </div>
                    ))
                  }
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pools tab - Hundred only */}
      {activeTab === 'pools' && isHundred && room.auctionPools && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Auction pool order</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
            Players are auctioned pool by pool in this order. Within each pool, players come up one at a time in random order.
          </p>
          {room.auctionPools.map((pool, i) => (
            <div key={pool.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>{i + 1}</div>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: pool.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{pool.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{pool.desc} · {pool.playerCount} players</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Start / waiting */}
      {activeTab === 'teams' && (
        session.isHost ? (
          <div>
            <button
              className="btn btn-primary"
              style={{ fontSize: 16, padding: '12px 28px', fontFamily: 'Barlow Condensed', letterSpacing: '0.05em' }}
              onClick={startAuction}
            >
              START AUCTION
            </button>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 8 }}>
              Unclaimed teams become AI bots · Only you can start
            </p>
          </div>
        ) : (
          <div className="banner banner-muted">
            Waiting for host ({room.hostName}) to start the auction…
          </div>
        )
      )}
    </div>
  )
}
