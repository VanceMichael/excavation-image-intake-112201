export async function source({url,frame,memory,media,json,send}) {
  if (!url.pathname.startsWith('/plates/')) return false;
  const index = frame.feeds['/index'].data;
  const id = url.pathname.split('/').at(-1);
  if (index.void.includes(id)) return json(410,{ error:'该原幅作废' });
  if (!index.tiles.some(tile => tile.tile === id)) return json(404,{ error:'该刻度无原幅' });
  const used = memory.get(frame.tick) ?? 0;
  if (used >= index.limit) return json(429,{ error:'该档期领片额已用完' });
  memory.set(frame.tick,used+1);
  return send(200,media(id+'.pgm'),{'Content-Type':'image/x-portable-graymap'});
}
