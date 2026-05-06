import { useEffect, useState, useRef, useCallback } from 'react'
import { LEAGUES, fmtMoney, canBid, getIncrement, hundredIncrement, hundredIncrementLabel } from '../data/leagues.js'
import SquadViewer from './SquadViewer.jsx'
import { getRoom, setRoom, subscribeToRoom } from '../lib/rooms.js'

// ── AI bot logic ──────────────────────────────────────────────────────────────
function runBotBids(room) {
  const l = LEAGUES[room.league]
  const player = room.players[room.currentIdx]
  if (!player || room.phase !== 'bidding') return room

  const botsCanBid = room.teams.filter(t => {
    if (t.human) return false
    if (t.name === room.currentLeader) return false
    const check = canBid(room, t.name, player.os)
    if (!check.ok) return false
    const inc = getIncrement(room.league, room.currentBid, 0)
    if (t.budget < room.currentBid + inc) return false
    return true
  })
  if (botsCanBid.length === 0) return room

  const bidChance = Math.min(0.7, 0.3 + (player.base / (l.cap * 0.1)) * 0.1)
  if (Math.random() > bidChance) return room

  const bot = botsCanBid[Math.floor(Math.random() * botsCanBid.length)]
  const newBid = isFirstBotBid
    ? room.currentBid
    : room.currentBid + getIncrement(room.league, room.currentBid, 0)
  if (bot.budget < newBid) return room
  if (newBid / bot.budget > 0.4 && Math.random() < 0.5) return room

  room.currentBid = newBid
  room.currentLeader = bot.name
  // Add 5s on bot bid but cap at timerSecs
  const botRemaining = Math.max(0, room.timerEnd - Date.now())
  room.timerEnd = Date.now() + Math.min(botRemaining + 5000, room.timerSecs * 1000)
  room.log.push(`${bot.name} bid ${fmtMoney(newBid, room.league)}`)
  return room
}

// ── Countdown hook ────────────────────────────────────────────────────────────
function useCountdown(timerEnd, paused) {
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    if (!timerEnd) return
    const tick = () => setSecs(Math.max(0, Math.ceil((timerEnd - Date.now()) / 1000)))
    tick()
    if (paused) return // don't start interval while paused
    const id = setInterval(tick, 250)
    return () => clearInterval(id)
  }, [timerEnd, paused])
  return secs
}

// ── Sold countdown - shown to host after a player is sold ───────────────────
function SoldCountdown({ onAdvance }) {
  const [secs, setSecs] = useState(3)
  useEffect(() => {
    if (secs <= 0) return
    const id = setTimeout(() => setSecs(s => s - 1), 1000)
    return () => clearTimeout(id)
  }, [secs])
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: 'var(--bg-elevated)', border: '2px solid var(--green)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Barlow Condensed', fontSize: 16, fontWeight: 700, color: 'var(--green)',
      }}>
        {secs > 0 ? secs : '→'}
      </div>
      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Next player in {secs}s…</span>
      <button
        className="btn btn-ghost"
        style={{ fontSize: 12, padding: '3px 12px', marginLeft: 4 }}
        onClick={onAdvance}
      >
        Skip
      </button>
    </div>
  )
}

// ── Pool progress banner (Hundred only) ──────────────────────────────────────
function PoolProgress({ room }) {
  if (!room.auctionPools) return null
  const pools = room.auctionPools
  const player = room.players[room.currentIdx]
  const currentPoolId = player?.poolId

  return (
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
      {pools.map(pool => {
        const isCurrent = pool.id === currentPoolId
        // Determine if pool is complete: all its players have been auctioned
        const poolPlayers = room.players.filter(p => p.poolId === pool.id)
        const poolStart = room.players.findIndex(p => p.poolId === pool.id)
        const isDone = poolStart >= 0 && room.currentIdx > poolStart + poolPlayers.length - 1
        return (
          <div
            key={pool.id}
            title={pool.label}
            style={{
              padding: '3px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600,
              background: isCurrent ? pool.color : isDone ? 'var(--bg-elevated)' : 'var(--bg-surface)',
              color: isCurrent ? '#0d1117' : isDone ? 'var(--text-dim)' : 'var(--text-muted)',
              border: `1px solid ${isCurrent ? pool.color : 'var(--border)'}`,
              fontFamily: 'Barlow Condensed',
            }}
          >
            {pool.label}
          </div>
        )
      })}
    </div>
  )
}


// ── Sold transition panel ─────────────────────────────────────────────────────
function SoldTransitionPanel({ soldResult, nextPlayer, league, isHost, onAdvance, timerSecs }) {
  const [secs, setSecs] = useState(3)
  useEffect(() => {
    setSecs(3)
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [soldResult?.playerIdx])

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
      marginBottom: 16,
    }}>
      {/* Left: just sold */}
      <div className="card" style={{ borderColor: soldResult.buyer ? 'rgba(63,185,80,0.35)' : 'var(--border)' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.07em', color: soldResult.buyer ? 'var(--green)' : 'var(--text-dim)', fontWeight: 600, marginBottom: 8 }}>
          {soldResult.buyer ? '✓ Sold' : 'Unsold'}
        </div>
        <div style={{ fontFamily: 'Barlow Condensed', fontSize: 22, fontWeight: 700, lineHeight: 1.1, marginBottom: 6 }}>
          {soldResult.playerName}
        </div>
        {soldResult.buyer ? (
          <>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>joins</div>
            <div style={{ fontFamily: 'Barlow Condensed', fontSize: 16, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>
              {soldResult.buyer}
            </div>
            <div style={{ fontFamily: 'Barlow Condensed', fontSize: 26, fontWeight: 700, color: 'var(--green)' }}>
              {fmtMoney(soldResult.price, league)}
            </div>
          </>
        ) : (
          <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>No bids received</div>
        )}
      </div>

      {/* Right: next up */}
      <div className="card" style={{ borderColor: 'var(--border-mid)', position: 'relative' }}>
        <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-dim)', fontWeight: 600, marginBottom: 8 }}>
          Next up
        </div>
        {nextPlayer ? (
          <>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 6 }}>
              <span className="badge badge-role" style={{ fontSize: 10 }}>{nextPlayer.role}</span>
              {nextPlayer.os && <span className="badge badge-os" style={{ fontSize: 10 }}>Overseas</span>}
              {nextPlayer.poolLabel && <span className="badge" style={{ fontSize: 10, background: 'var(--blue-bg)', color: 'var(--blue)', border: '1px solid rgba(88,166,255,0.25)' }}>{nextPlayer.poolLabel}</span>}
            </div>
            <div style={{ fontFamily: 'Barlow Condensed', fontSize: 22, fontWeight: 700, lineHeight: 1.1, marginBottom: 6 }}>
              {nextPlayer.name}
            </div>
            <div style={{ fontFamily: 'Barlow Condensed', fontSize: 20, fontWeight: 600, color: 'var(--text-muted)' }}>
              {fmtMoney(nextPlayer.base, league)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>{nextPlayer.nat}</div>
          </>
        ) : (
          <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>Auction complete</div>
        )}
        {/* countdown + skip */}
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            background: 'var(--bg-elevated)', border: `2px solid ${secs > 0 ? 'var(--green)' : 'var(--text-dim)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Barlow Condensed', fontSize: 14, fontWeight: 700,
            color: secs > 0 ? 'var(--green)' : 'var(--text-dim)',
          }}>{secs}</div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {secs > 0 ? `Starting in ${secs}s` : 'Starting…'}
          </span>
          {isHost && (
            <button className="btn btn-ghost" style={{ fontSize: 11, padding: '2px 10px', marginLeft: 'auto' }} onClick={onAdvance}>
              Start now
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Pool list viewer ──────────────────────────────────────────────────────────
function PoolListViewer({ players, currentIdx, league }) {
  const isHundred = league === 'hundred'
  const [openPool, setOpenPool] = useState(null)

  if (!players || players.length === 0) return null

  if (!isHundred) {
    // For IPL/SA20: group by role
    const roles = ['WK-Batter','Batter','All-rounder','Bowler']
    const byRole = {}
    roles.forEach(r => { byRole[r] = [] })
    players.forEach((p, i) => {
      const role = roles.includes(p.role) ? p.role : 'All-rounder'
      byRole[role].push({ ...p, idx: i })
    })
    return (
      <div>
        {roles.map(role => {
          const ps = byRole[role]
          if (!ps.length) return null
          const isOpen = openPool === role
          return (
            <div key={role} style={{ marginBottom: 8, border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div onClick={() => setOpenPool(isOpen ? null : role)} style={{ padding: '10px 14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', background: 'var(--bg-surface)' }}>
                <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 15 }}>{role}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{ps.length} players {isOpen ? '▲' : '▼'}</span>
              </div>
              {isOpen && (
                <div style={{ padding: '4px 14px 10px' }}>
                  {[...ps].sort((a,b) => a.name.localeCompare(b.name)).map((p, i) => {
                    const done = p.idx < currentIdx
                    const current = p.idx === currentIdx
                    return (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid var(--border)', opacity: done ? 0.4 : 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {current && <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 8, background: 'var(--green-bg)', color: 'var(--green)', border: '1px solid rgba(63,185,80,0.3)' }}>NOW</span>}
                          {done && <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>✓</span>}
                          <span style={{ fontSize: 13, textDecoration: done ? 'line-through' : 'none' }}>{p.name}</span>
                          {p.os && <span className="badge badge-os" style={{ fontSize: 10 }}>OS</span>}
                        </div>
                        <span style={{ fontSize: 12, fontFamily: 'Barlow Condensed', color: 'var(--text-muted)' }}>{fmtMoney(p.base, league)}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Hundred: group by poolLabel
  const pools = []
  const seen = {}
  players.forEach((p, i) => {
    const key = p.poolLabel || 'Other'
    if (!seen[key]) { seen[key] = []; pools.push(key) }
    seen[key].push({ ...p, idx: i })
  })

  return (
    <div>
      {pools.map(poolName => {
        const ps = seen[poolName]
        const isOpen = openPool === poolName
        const doneCount = ps.filter(p => p.idx < currentIdx).length
        const currentInPool = ps.find(p => p.idx === currentIdx)
        return (
          <div key={poolName} style={{ marginBottom: 8, border: `1px solid ${currentInPool ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div onClick={() => setOpenPool(isOpen ? null : poolName)} style={{ padding: '10px 14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: currentInPool ? 'var(--green-bg)' : 'var(--bg-surface)' }}>
              <div>
                <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: 15, color: currentInPool ? 'var(--green)' : 'var(--text)' }}>{poolName}</span>
                {currentInPool && <span style={{ fontSize: 11, color: 'var(--green)', marginLeft: 8 }}>● Live now</span>}
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {doneCount}/{ps.length} done {isOpen ? '▲' : '▼'}
              </span>
            </div>
            {isOpen && (
              <div style={{ padding: '4px 14px 10px', background: 'var(--bg-surface)' }}>
                {[...ps].sort((a,b) => a.name.localeCompare(b.name)).map((p, i) => {
                  const done = p.idx < currentIdx
                  const current = p.idx === currentIdx
                  return (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid var(--border)', opacity: done ? 0.4 : 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {current && <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 8, background: 'var(--green-bg)', color: 'var(--green)', border: '1px solid rgba(63,185,80,0.3)' }}>NOW</span>}
                        {done && <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>✓</span>}
                        <span style={{ fontSize: 13, textDecoration: done ? 'line-through' : 'none' }}>{p.name}</span>
                        {p.os && <span className="badge badge-os" style={{ fontSize: 10 }}>OS</span>}
                      </div>
                      <span style={{ fontSize: 12, fontFamily: 'Barlow Condensed', color: 'var(--text-muted)' }}>{fmtMoney(p.base, league)}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AuctionScreen({ session, goTo }) {
  const [room, setRoomState] = useState(null)
  const [activeTab, setActiveTab] = useState('squads')
  const processingRef = useRef(false)
  const roomRef = useRef(null)
  const isHundred = session.league === 'hundred'

  const paused = room?.timerPaused || false
  const secs = useCountdown(room?.timerEnd, paused)

  const handleRoomUpdate = useCallback((r) => {
    roomRef.current = r
    setRoomState({ ...r })
    if (r.phase === 'complete') goTo('results', { finalRoom: r })
  }, [goTo])

  useEffect(() => {
    getRoom(session.roomCode).then(r => r && handleRoomUpdate(r))
    const unsub = subscribeToRoom(session.roomCode, handleRoomUpdate)
    return unsub
  }, [session.roomCode, handleRoomUpdate])

  // Host drives timer expiry + occasional bot bids
  useEffect(() => {
    if (!session.isHost || !room || room.phase !== 'bidding') return
    if (secs > 0) {
      if (secs <= room.timerSecs - 2 && Math.random() < 0.12) triggerBotBid()
      return
    }
    // Only expire if timerEnd is set, in the past, and not paused
    if (!room.timerEnd || room.timerEnd > Date.now()) return
    if (room.timerPaused) return
    if (!processingRef.current) {
      processingRef.current = true
      handleExpiry().finally(() => { processingRef.current = false })
    }
  }, [secs, room?.phase, session.isHost])

  // Host auto-advances after 3s when a player is sold
  const soldAdvanceRef = useRef(null)
  useEffect(() => {
    if (!session.isHost || !room) return
    if (room.phase === 'sold') {
      // Clear any existing timer first
      if (soldAdvanceRef.current) clearTimeout(soldAdvanceRef.current)
      soldAdvanceRef.current = setTimeout(() => {
        advanceToNext()
      }, 3000)
    } else {
      if (soldAdvanceRef.current) {
        clearTimeout(soldAdvanceRef.current)
        soldAdvanceRef.current = null
      }
    }
    return () => {
      if (soldAdvanceRef.current) clearTimeout(soldAdvanceRef.current)
    }
  }, [room?.phase, room?.soldResult?.playerIdx, session.isHost])

  async function triggerBotBid() {
    if (processingRef.current) return
    processingRef.current = true
    try {
      const r = await getRoom(session.roomCode)
      if (r.phase !== 'bidding' || r.timerHandled) return
      const updated = runBotBids(r)
      if (updated.currentLeader !== r.currentLeader) await setRoom(session.roomCode, updated)
    } catch (e) {}
    processingRef.current = false
  }

  async function handleExpiry() {
    const r = await getRoom(session.roomCode)
    if (!r || r.phase !== 'bidding' || r.timerHandled) return
    const player = r.players[r.currentIdx]
    r.timerHandled = true
    r.soldResult = { playerIdx: r.currentIdx, playerName: player.name, buyer: r.currentLeader, price: r.currentBid }

    if (r.currentLeader) {
      const team = r.teams.find(t => t.name === r.currentLeader)
      if (team) {
        team.budget -= r.currentBid
        team.squad.push({ name: player.name, price: r.currentBid, role: player.role, nat: player.nat, os: player.os })
      }
      r.log.push(`✓ ${player.name} → ${r.currentLeader} @ ${fmtMoney(r.currentBid, r.league)}`)
    } else {
      r.log.push(`✗ ${player.name} went unsold`)
    }

    r.phase = 'sold'
    r.currentIdx++
    if (r.currentIdx >= r.players.length) r.phase = 'complete'
    await setRoom(session.roomCode, r)
  }

  async function advanceToNext() {
    const r = await getRoom(session.roomCode)
    if (!r || r.phase !== 'sold') return
    const player = r.players[r.currentIdx]
    if (!player) { r.phase = 'complete'; await setRoom(session.roomCode, r); return }
    r.phase = 'bidding'
    r.currentBid = player.base
    r.currentLeader = null
    r.timerEnd = Date.now() + r.timerSecs * 1000
    r.timerHandled = false
    await setRoom(session.roomCode, r)
  }

  async function togglePause() {
    const r = await getRoom(session.roomCode)
    if (!r || r.phase !== 'bidding') return
    if (r.timerPaused) {
      // Resuming — extend timerEnd by the time that's elapsed since pause
      r.timerPaused = false
      // timerEnd stays as-is; secs already shows correct remaining time visually
      // but we need to reset timerEnd to now + remaining to avoid instant expiry
      const remaining = Math.max(1, secs) * 1000
      r.timerEnd = Date.now() + remaining
    } else {
      r.timerPaused = true
    }
    await setRoom(session.roomCode, r)
  }

  async function changeTimerLength(newSecs) {
    const r = await getRoom(session.roomCode)
    if (!r) return
    r.timerSecs = newSecs
    // If currently bidding, also clamp timerEnd so it doesn't exceed new length
    if (r.phase === 'bidding' && r.timerEnd && !r.timerPaused) {
      const remaining = Math.max(0, r.timerEnd - Date.now())
      const capped = Math.min(remaining, newSecs * 1000)
      r.timerEnd = Date.now() + capped
    }
    await setRoom(session.roomCode, r)
  }

  async function placeBid() {
    const r = await getRoom(session.roomCode)
    if (!r || r.phase !== 'bidding') return
    const player = r.players[r.currentIdx]
    const check = canBid(r, myTeamName, player.os)
    if (!check.ok || r.currentLeader === myTeamName) return

    // First bid lands at base price; subsequent bids add an increment
    const isFirstBid = !r.currentLeader
    let newBid
    if (isFirstBid) {
      newBid = r.currentBid // currentBid is already set to base price
    } else {
      const inc = isHundred
        ? hundredIncrement(r.currentBid)
        : (() => { const el = document.getElementById('inc-select'); return el ? parseInt(el.value) : LEAGUES[r.league].increments[0] })()
      newBid = r.currentBid + inc
    }
    const myTeam = r.teams.find(t => t.name === myTeamName)
    if (!myTeam || myTeam.budget < newBid) return

    r.currentBid = newBid
    r.currentLeader = myTeamName
    // Add 5s on bid but cap at timerSecs from now
    const remaining = Math.max(0, r.timerEnd - Date.now())
    const withBonus = remaining + 5000
    const maxAllowed = r.timerSecs * 1000
    r.timerEnd = Date.now() + Math.min(withBonus, maxAllowed)
    r.log.push(`${myTeamName} bid ${fmtMoney(newBid, r.league)}`)
    await setRoom(session.roomCode, r)
  }

  if (!room) return <p style={{ color: 'var(--text-muted)' }}>Connecting…</p>

  const l = LEAGUES[room.league]
  const player = room.players[room.currentIdx]
  const myTeam = room.teams.find(t => t.human === session.myName) || room.teams.find(t => t.name === session.myTeam)
  const myTeamName = myTeam?.name ?? session.myTeam
  const myOs = myTeam ? myTeam.squad.filter(p => p.os).length : 0
  const total = room.players.length

  const bidCheck = player ? canBid(room, myTeamName, player.os) : { ok: false, reason: '' }
  const amLeading = room.currentLeader === myTeamName
  // First bid = base price; subsequent bids = currentBid + increment
  const isFirstBid = !room.currentLeader
  const nextInc = player ? getIncrement(room.league, room.currentBid, 0) : 0
  const nextBid = isFirstBid ? room.currentBid : room.currentBid + nextInc
  const canAfford = myTeam && myTeam.budget >= nextBid
  const bidBlocked = !bidCheck.ok || amLeading || !canAfford || room.phase !== 'bidding'

  const playersLeft = total - room.currentIdx
  const needMore = myTeam && (l.squadMin - myTeam.squad.length) > playersLeft

  // Pool label for current player
  const currentPoolLabel = isHundred && player?.poolLabel ? player.poolLabel : null

  return (
    <div>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span className={`badge badge-${room.league}`}>{l.name}</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {Math.min(room.currentIdx + 1, total)} of {total}
            </span>
            {currentPoolLabel && (
              <span style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>{currentPoolLabel}</span>
            )}
          </div>
          <div className="progress-bar" style={{ width: 220 }}>
            <div className="progress-fill" style={{ width: `${Math.round(room.currentIdx / total * 100)}%`, background: 'var(--green)' }} />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Barlow Condensed', fontSize: 15, fontWeight: 600 }}>{myTeamName}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{myTeam ? fmtMoney(myTeam.budget, room.league) : '—'} remaining</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Squad: {myTeam?.squad.length ?? 0} · OS: {myOs}/{l.overseasMax}
          </div>
        </div>
      </div>

      {/* Pool progress (Hundred only) */}
      {isHundred && <PoolProgress room={room} />}

      {/* Sold transition panel - shown between sales */}
      {room.phase === 'sold' && room.soldResult && (
        <SoldTransitionPanel
          soldResult={room.soldResult}
          nextPlayer={room.players[room.currentIdx]}
          league={room.league}
          isHost={session.isHost}
          onAdvance={advanceToNext}
          timerSecs={room.timerSecs}
        />
      )}

      {needMore && (
        <div className="banner banner-warn">
          ⚠ Need {l.squadMin - (myTeam?.squad.length ?? 0)} more players, {playersLeft} left
        </div>
      )}

      {/* Player card - hidden during sold phase, SoldTransitionPanel takes over */}
      {player && room.phase !== 'sold' && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            <div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                <span className="badge badge-role">{player.role}</span>
                <span className="badge badge-role">{player.nat}</span>
                {player.os && <span className="badge badge-os">Overseas</span>}
                {currentPoolLabel && <span className="badge" style={{ background: 'var(--blue-bg)', color: 'var(--blue)', border: '1px solid rgba(88,166,255,0.25)' }}>{currentPoolLabel}</span>}
              </div>
              <div style={{ fontFamily: 'Barlow Condensed', fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{player.name}</div>
              {player.stats && <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{player.stats}</div>}
            </div>
            {room.phase === 'bidding' && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                  Timer{paused ? ' — PAUSED' : ''}
                </div>
                <div className={`timer-display${secs <= 3 && !paused ? ' warn' : ''}`}
                  style={{ color: paused ? 'var(--amber)' : undefined }}>
                  {secs}
                </div>
                {session.isHost && (
                  <div style={{ display: 'flex', gap: 5, justifyContent: 'flex-end', marginTop: 6, flexWrap: 'wrap' }}>
                    <button
                      className="btn btn-ghost"
                      style={{ fontSize: 11, padding: '3px 10px', borderColor: paused ? 'var(--amber)' : 'var(--border-mid)', color: paused ? 'var(--amber)' : 'var(--text-muted)' }}
                      onClick={togglePause}
                    >
                      {paused ? '▶ Resume' : '⏸ Pause'}
                    </button>
                    <select
                      style={{ width: 'auto', marginTop: 0, fontSize: 11, padding: '3px 6px' }}
                      value={room.timerSecs}
                      onChange={e => changeTimerLength(parseInt(e.target.value))}
                    >
                      {[5, 10, 15, 20, 30].map(s => (
                        <option key={s} value={s}>{s}s</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid3" style={{ marginBottom: 16 }}>
            <div className="stat-card">
              <div className="stat-label">Base price</div>
              <div className="stat-value">{fmtMoney(player.base, room.league)}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Current bid</div>
              <div className="stat-value bid-amount">{fmtMoney(room.currentBid, room.league)}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Leading bid</div>
              <div className="stat-value" style={{ fontSize: 15 }}>{room.currentLeader || '—'}</div>
            </div>
          </div>

          {room.phase === 'bidding' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-bid" onClick={placeBid} disabled={bidBlocked}>
                {amLeading ? 'LEADING'
                  : !bidCheck.ok ? bidCheck.reason?.toUpperCase() || 'BLOCKED'
                  : !canAfford ? 'INSUFFICIENT'
                  : `BID ${fmtMoney(nextBid, room.league)}`}
              </button>

              {/* Fixed increment display for Hundred (tiered), dropdown for others */}
              {isHundred ? (
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Increment: <span style={{ color: 'var(--text)', fontWeight: 500 }}>{hundredIncrementLabel(room.currentBid)}</span>
                  <span style={{ fontSize: 11, marginLeft: 6, color: 'var(--text-dim)' }}>(auto-tiered)</span>
                </div>
              ) : (
                <select id="inc-select" style={{ width: 'auto', marginTop: 0 }} defaultValue={l.increments[0]}>
                  {l.increments.map((v, i) => (
                    <option key={v} value={v}>{l.incrementLabels[i]}</option>
                  ))}
                </select>
              )}
            </div>
          )}


        </div>
      )}

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab-btn${activeTab === 'squads' ? ' active' : ''}`} onClick={() => setActiveTab('squads')}>Squads</button>
        <button className={`tab-btn${activeTab === 'pools' ? ' active' : ''}`} onClick={() => setActiveTab('pools')}>Lists</button>
        <button className={`tab-btn${activeTab === 'log' ? ' active' : ''}`} onClick={() => setActiveTab('log')}>Bid log</button>
      </div>

      {activeTab === 'squads' && (
        <SquadViewer teams={room.teams} league={room.league} myTeamName={myTeamName} />
      )}

      {activeTab === 'pools' && (
        <PoolListViewer players={room.players} currentIdx={room.currentIdx} league={room.league} />
      )}

      {activeTab === 'log' && (
        <div className="log-scroll">
          {[...room.log].reverse().slice(0, 30).map((entry, i) => (
            <div key={i} style={{ fontSize: 13, color: 'var(--text-muted)', padding: '5px 0', borderBottom: '1px solid var(--border)' }}>
              {entry}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
