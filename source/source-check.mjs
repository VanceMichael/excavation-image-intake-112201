export async function exercise({request,move,data,assert}) {
  const first = await data('/survey');
  assert.equal(first.ties[0].to, 'B1');
  const raw = Buffer.from(await (await request('/plates/A1')).arrayBuffer());
  assert.equal(raw.toString('ascii',0,13),'P5\n16 12\n255\n');
  assert.equal(raw.length,205);
  assert.equal((await request('/plates/B1')).status,200);
  assert.equal((await request('/plates/C1')).status,429);
  await move(1);
  assert.equal((await request('/plates/B1')).status,410);
  assert.equal((await data('/survey')).ties.length,3);
  assert.equal((await request('/plates/C1')).status,200);
  await move(2);
  assert.equal((await data('/survey')).ties.length,2);
}
