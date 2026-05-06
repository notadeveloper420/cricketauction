import { useState } from 'react'
import { LEAGUES, fmtMoney } from '../data/leagues.js'

const ROLE_ORDER = ['WK-Batter', 'Batter', 'All-rounder', 'Bowler']
const ROLE_COLORS = {
  'WK-Batter':   { bg: 'rgba(88,166,255,0.1)',  color: '#58a6ff',  border: 'rgba(88,166,255,0.25)' },
  'Batter':      { bg: 'rgba(63,185,80,0.1)',   color: '#3fb950',  border: 'rgba(63,185,80,0.25)' },
  'All-rounder': { bg: 'rgba(210,153,34,0.1)',  color: '#d29922',  border: 'rgba(210,153,34,0.25)' },
  'Bowler':      { bg: 'rgba(248,81,73,0.1)',   color: '#f85149',  border: 'rgba(248,81,73,0.25)' },
}

function RolePill({ role }) {
  const c = ROLE_COLORS[role] || { bg: 'var(--bg-elevated)', color: 'var(--text-muted)', border: 'var(--border)' }
  return (
    <span style={{
      fontSize: 10, padding: '1px 6px', borderRadius: 10,
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
      fontWeight: 600, fontFamily: 'Barlow Condensed', letterSpacing: '0.04em',
    }}>
      {role}
    </span>
  )
}

export default function SquadViewer({ teams, league, myTeamName }) {
  const l = LEAGUES[league]
  const [expanded, setExpanded] = useState(myTeamName ? [myTeamName] : [])

  function toggle(name) {
    setExpanded(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }

  return (
    <div>
      {teams.map(t => {
        const isMe = t.name === myTeamName
        const isOpen = expanded.includes(t.name)
        const osCount = t.squad.filter(p => p.os).length
        const totalSpend = t.squad.reduce((s, p) => s + (p.price || 0), 0)

        // Group by role
        const byRole = {}
        ROLE_ORDER.forEach(r => { byRole[r] = [] })
        t.squad.forEach(p => {
          const r = ROLE_ORDER.includes(p.role) ? p.role : 'All-rounder'
          byRole[r].push(p)
        })

        return (
          <div
            key={t.name}
            style={{
              marginBottom: 8,
              border: isMe ? '1px solid var(--green)' : '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'var(--bg-surface)',
            }}
          >
            {/* Header row - always visible */}
            <div
              onClick={() => toggle(t.name)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', cursor: 'pointer',
                background: isMe ? 'var(--green-bg)' : 'transparent',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  fontFamily: 'Barlow Condensed', fontSize: 15, fontWeight: 700,
                  color: isMe ? 'var(--green)' : 'var(--text)',
                }}>
                  {t.name}{isMe ? ' ★' : ''}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {t.squad.length} players
                </span>
                {osCount > 0 && (
                  <span style={{ fontSize: 11, padding: '1px 6px', borderRadius: 10, background: 'var(--blue-bg)', color: 'var(--blue)', border: '1px solid rgba(88,166,255,0.25)' }}>
                    {osCount} OS
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {fmtMoney(t.budget, league)} left
                </span>
                <span style={{ fontSize: 14, color: 'var(--text-dim)' }}>
                  {isOpen ? '▲' : '▼'}
                </span>
              </div>
            </div>

            {/* Expanded squad */}
            {isOpen && (
              <div style={{ padding: '0 14px 12px' }}>
                {t.squad.length === 0 ? (
                  <div style={{ fontSize: 13, color: 'var(--text-dim)', padding: '8px 0' }}>No players yet</div>
                ) : (
                  ROLE_ORDER.map(role => {
                    const players = byRole[role]
                    if (players.length === 0) return null
                    return (
                      <div key={role} style={{ marginTop: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <RolePill role={role} />
                          <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{players.length}</span>
                        </div>
                        {players.map((p, i) => (
                          <div
                            key={i}
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '4px 0', borderBottom: '1px solid var(--border)',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontSize: 13 }}>{p.name}</span>
                              {p.os && (
                                <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 8, background: 'var(--blue-bg)', color: 'var(--blue)', border: '1px solid rgba(88,166,255,0.25)', fontWeight: 600 }}>
                                  OS
                                </span>
                              )}

                            </div>
                            <span style={{
                              fontSize: 12, fontFamily: 'Barlow Condensed', fontWeight: 500,
                              color: p.retained ? 'var(--text-muted)' : 'var(--text)',
                            }}>
                              {p.price ? fmtMoney(p.price, league) : '—'}
                              {p.retained && <span style={{ fontSize: 10, color: 'var(--text-dim)', marginLeft: 4 }}>(retained)</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                    )
                  })
                )}

                {/* Cap summary */}
                <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
                  <span>Spent: {fmtMoney(l.cap - t.budget, league)}</span>
                  <span>Remaining: <span style={{ color: t.budget < l.cap * 0.1 ? 'var(--red)' : 'var(--green)', fontWeight: 500 }}>{fmtMoney(t.budget, league)}</span></span>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
