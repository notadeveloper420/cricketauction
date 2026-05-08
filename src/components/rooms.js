import { supabase } from './supabase'

export async function getRoom(code) {
  const { data, error } = await supabase
    .from('auction_rooms')
    .select('data')
    .eq('id', code)
    .single()
  if (error) return null
  return data.data
}

export async function setRoom(code, roomData) {
  const { error } = await supabase
    .from('auction_rooms')
    .upsert({ id: code, data: roomData, updated_at: new Date().toISOString() })
  if (error) throw error
}

export function subscribeToRoom(code, callback) {
  // Debounce rapid Supabase events (e.g. upsert firing insert+update)
  // to avoid double-firing callbacks that can cause navigation glitches
  let debounceTimer = null
  let lastPayloadStr = null

  const channel = supabase
    .channel(`room:${code}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'auction_rooms', filter: `id=eq.${code}` },
      (payload) => {
        if (!payload.new?.data) return
        // Deduplicate identical payloads
        const payloadStr = JSON.stringify(payload.new.data)
        if (payloadStr === lastPayloadStr) return
        lastPayloadStr = payloadStr
        // Debounce 50ms to collapse any double-fires
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
          callback(payload.new.data)
        }, 50)
      }
    )
    .subscribe()

  return () => {
    clearTimeout(debounceTimer)
    supabase.removeChannel(channel)
  }
}
