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
  const channel = supabase
    .channel(`room:${code}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'auction_rooms', filter: `id=eq.${code}` },
      (payload) => {
        if (payload.new && payload.new.data) {
          callback(payload.new.data)
        }
      }
    )
    .subscribe()

  return () => supabase.removeChannel(channel)
}
