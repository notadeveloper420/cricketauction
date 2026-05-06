import { useEffect, useState } from 'react'
import { LEAGUES, fmtMoney } from '../data/leagues.js'
import { getRoom, subscribeToRoom } from '../lib/rooms.js'

export default function ResultsScreen({ session, goTo }) {
  const [room, setRoomState] = useState(session.finalRoom || null)

  useEffect(() => {
    if (!room) getRoom(session.roomCode).then(r => r && setRoomState(r))
    const unsub = subscribeToRoom(session.roomCode, r => setRoomState(r))
    return unsub
  }, [session.roomCode])

  if (!room) return <p style={{ color: 'var(--text-muted)' }}>Loading results…</p>

  const l = LEAGUES[room.league]
  const isHundred = room.league === 'hundred'

  return (
    <div>
      <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>Auction complete</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{l.name} — Final squads</p>

      {room.teams.map(t => {
        const isMe = t.name === (room.teams.find(x => x.human === session.myName)?.name ?? session.myTeam)
        const retained = t.squad.filter(p => p.retained)
        const acquired = t.squad.filter(p => !p.retained)
        const spent = l.cap - t.budget
        const osAcquired = acquired.filter(p => p.os).length
        const meetsMin = t.squad.length >= l.squadMin

        return (
          <div className={`card${isMe ? ' my-team-card' : ''}`} key={t.name} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontFamily: 'Barlow Condensed', fontSize: 20, fontWeight: 700, color: isMe ? 'var(--green)' : 'var(--text)' }}>
                  {t.name}{isMe ? ' (you)' : ''}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.human ? t.human : '🤖 Bot'}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{fmtMoney(spent, room.league)} spent</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {t.squad.length} players · OS: {osAcquired}/{l.overseasMax}
                </div>
                {!meetsMin && <div style={{ fontSize: 12, color: 'var(--red)' }}>Below min squad ({l.squadMin})</div>}
              </div>
            </div>

            {/* Retained players section */}
            {isHundred && retained.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                  Retained ({retained.length})
                </div>
                {retained.map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <span>
                      {p.name}
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6 }}>{p.role}{p.os ? ' · OS' : ''}</span>
                    </span>
                    <span style={{ fontFamily: 'Barlow Condensed', color: 'var(--blue)' }}>{fmtMoney(p.price, room.league)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Auction acquisitions */}
            {acquired.length > 0 && (
              <div>
                {isHundred && retained.length > 0 && (
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                    Auction ({acquired.length})
                  </div>
                )}
                {acquired.map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                    <span>
                      {p.name}
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6 }}>
                        {p.role}{p.os ? ' · OS' : ''}
                        {isHundred && p.poolLabel ? ` · ${p.poolLabel}` : ''}
                      </span>
                    </span>
                    <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 500 }}>{fmtMoney(p.price, room.league)}</span>
                  </div>
                ))}
              </div>
            )}

            {t.squad.length === 0 && (
              <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>No players acquired</div>
            )}
          </div>
        )
      })}

      <button
        className="btn btn-primary"
        style={{ marginTop: '1rem', fontFamily: 'Barlow Condensed', letterSpacing: '0.05em', fontSize: 16 }}
        onClick={() => goTo('home', { finalRoom: null })}
      >
        NEW AUCTION
      </button>
    </div>
  )
}
