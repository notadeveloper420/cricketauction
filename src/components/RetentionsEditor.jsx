import { useState } from 'react'
import { fmtMoney, calcHundredDeduction } from '../data/leagues.js'
import { HUNDRED_PLAYERS } from '../data/hundred.js'

const CAP = 2050000

export default function RetentionsEditor({ retentions, onChange }) {
  const [addingTo, setAddingTo] = useState(null)
  const [search, setSearch] = useState('')

  const allRetained = new Set(Object.values(retentions).flat().map(p => p.name))

  function removePlayer(teamName, playerName) {
    onChange({ ...retentions, [teamName]: retentions[teamName].filter(p => p.name !== playerName) })
  }

  function addPlayer(teamName, player) {
    if (allRetained.has(player.name)) return
    const updated = {
      ...retentions,
      [teamName]: [...(retentions[teamName] || []), {
        ...player,
        salary: 237500, // approximate equal split
        type: 'Added',
      }],
    }
    onChange(updated)
    setSearch('')
    setAddingTo(null)
  }

  const searchResults = search.length >= 2
    ? HUNDRED_PLAYERS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        !allRetained.has(p.name)
      ).slice(0, 8)
    : []

  return (
    <div>
      {/* Summary banner */}
      <div className="banner banner-muted" style={{ marginBottom: 14, fontSize: 13 }}>
        Deductions: 1 player=£350K · 2=£650K · 3=£850K · 4=£950K. Remaining goes to auction from £2.05M cap.
        Individual salary splits are approximate (exact figures not published by ECB).
      </div>

      {Object.entries(retentions).map(([teamName, players]) => {
        const osCount = players.filter(p => p.os).length
        const deduction = calcHundredDeduction(players.length)

        return (
          <div key={teamName} style={{ marginBottom: 14, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ fontFamily: 'Barlow Condensed', fontSize: 15, fontWeight: 700 }}>{teamName}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>
                  {players.length} players · {osCount} overseas ·{' '}
                  <span style={{ color: 'var(--red)' }}>−£{(deduction/1000).toFixed(0)}K</span>
                  {' '}→ <span style={{ color: 'var(--green)' }}>£{((CAP-deduction)/1000).toFixed(0)}K for auction</span>
                </div>
              </div>
              <button
                className="btn btn-ghost"
                style={{ fontSize: 12, padding: '3px 10px' }}
                onClick={() => { setAddingTo(addingTo === teamName ? null : teamName); setSearch('') }}
              >
                {addingTo === teamName ? 'Cancel' : '+ Add'}
              </button>
            </div>

            {players.length === 0 && (
              <div style={{ fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic' }}>No pre-auction signings</div>
            )}

            {players.map(p => (
              <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <span style={{ fontSize: 13 }}>{p.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6 }}>
                    {p.role} · {p.os ? 'OS' : 'Dom'}
                  </span>
                  {p.type && (
                    <span style={{
                      fontSize: 10, marginLeft: 6, padding: '1px 6px', borderRadius: 10,
                      background: p.type === 'Retention' ? 'var(--green-bg)' : 'var(--blue-bg)',
                      color: p.type === 'Retention' ? 'var(--green)' : 'var(--blue)',
                      border: `1px solid ${p.type === 'Retention' ? 'rgba(63,185,80,0.3)' : 'rgba(88,166,255,0.25)'}`,
                    }}>
                      {p.type}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                    ~{fmtMoney(p.salary, 'hundred')}
                  </span>
                  <button
                    onClick={() => removePlayer(teamName, p.name)}
                    style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: 14, padding: '0 2px' }}
                    title="Remove"
                  >✕</button>
                </div>
              </div>
            ))}

            {addingTo === teamName && (
              <div style={{ marginTop: 8 }}>
                <input
                  type="text"
                  placeholder="Search player to add…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  autoFocus
                  style={{ marginBottom: 6 }}
                />
                {searchResults.map(p => (
                  <div
                    key={p.name}
                    onClick={() => addPlayer(teamName, p)}
                    style={{
                      padding: '6px 10px', cursor: 'pointer', borderRadius: 6,
                      display: 'flex', justifyContent: 'space-between',
                      background: 'var(--bg-elevated)', marginBottom: 3, fontSize: 13,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-input)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                  >
                    <span>
                      {p.name}
                      <span style={{ color: 'var(--text-muted)', fontSize: 11, marginLeft: 6 }}>
                        {p.role} · {p.os ? 'OS' : 'Dom'}
                      </span>
                    </span>
                    <span style={{ fontFamily: 'Barlow Condensed', color: 'var(--green)', fontSize: 13 }}>
                      £{(p.base/1000).toFixed(0)}K base
                    </span>
                  </div>
                ))}
                {search.length >= 2 && searchResults.length === 0 && (
                  <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>No matching available players</div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
