-- Run this in your Supabase project's SQL Editor
-- Dashboard -> SQL Editor -> New query -> paste this -> Run

-- Auction rooms table
create table if not exists auction_rooms (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- Enable row-level security but allow all for anon (public game)
alter table auction_rooms enable row level security;

create policy "Allow all on auction_rooms"
  on auction_rooms for all
  using (true)
  with check (true);

-- Enable realtime on this table
alter publication supabase_realtime add table auction_rooms;
