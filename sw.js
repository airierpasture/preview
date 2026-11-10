// Opens the sealed files in `e/`. With no key it does nothing, so every page is the password box.
const scope = self.registration.scope;
let key = null, map = null, open = null;
// Each tab is served from the publish it was opened on, so a tab left open never gets one file from it and the next from a newer one.
// Kept beside the key, by tab, as the worker can be stopped and started again between a tab's requests.
const maps = new Map();

addEventListener('install', () => skipWaiting());
addEventListener('activate', e => e.waitUntil(clients.claim()));

const db = (name, store) => new Promise(done => {
  const open = indexedDB.open(name, 1);
  open.onupgradeneeded = () => open.result.createObjectStore(store);
  open.onerror = () => done(undefined);
  open.onsuccess = () => done(open.result);
});
const ask = (d, store, act) => new Promise(done => {
  if (!d) return done(undefined);
  const r = act(d.transaction(store, 'readwrite').objectStore(store));
  r.onsuccess = () => done(r.result);
  r.onerror = () => done(undefined);
});
const held = async () => ask(await db('share', 'key'), 'key', s => s.get('raw'));
const tabs = db('share-tabs', 'map');

async function opened(url) {
  const res = await fetch(url, url.includes('map') ? { cache: 'no-cache' } : {});
  if (!res.ok) throw new Error(`${url} is gone`);
  const sealed = await res.arrayBuffer();
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: sealed.slice(0, 12) }, key, sealed.slice(12));
}

/** The map a tab was opened on: a page opened now gets the newest, and forgets the tabs that have closed. */
async function mapOf(request, tab, next) {
  if (request.mode === 'navigate' || !map) {
    map = JSON.parse(new TextDecoder().decode(await opened(`${scope}e/map.bin`)));
    if (request.mode !== 'navigate') return map;
    const live = new Set((await clients.matchAll()).map(c => c.id));
    for (const id of maps.keys()) if (!live.has(id)) maps.delete(id);
    const d = await tabs;
    maps.set(next, map);
    await ask(d, 'map', s => s.put(map, next));
    for (const id of (await ask(d, 'map', s => s.getAllKeys())) ?? []) if (!live.has(id) && id !== next) await ask(d, 'map', s => s.delete(id));
    return map;
  }
  if (!maps.has(tab)) maps.set(tab, (await ask(await tabs, 'map', s => s.get(tab))) ?? map);
  return maps.get(tab);
}

/** A tab whose publish has gone from the server is loaded again, on the newest. */
const stale = async tab => (await clients.get(tab))?.navigate((await clients.get(tab)).url);

async function serve(request, path, tab, next) {
  // A page left open is served as it is, so the key never brings back an older sealed copy of it.
  if (!open || request.mode === 'navigate') open = await fetch(`${scope}open.json`, { cache: 'no-cache' }).then(r => (r.ok ? r.json() : []), () => []);
  if (open.includes(path || 'index.html')) return fetch(request);
  const raw = key ?? await held();
  if (!raw) return fetch(request);
  let file;
  try {
    key ??= await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
    file = (await mapOf(request, tab, next))[path || 'index.html'];
    if (!file) return fetch(request);
    return new Response(await opened(`${scope}e/${file[0]}.bin`), { headers: { 'content-type': file[1] } });
  } catch {
    if (file && tab) stale(tab);
    return fetch(request);
  }
}

addEventListener('fetch', e => {
  const { href, search, hash } = new URL(e.request.url);
  if (e.request.method !== 'GET' || !href.startsWith(scope)) return;
  e.respondWith(serve(e.request, href.slice(scope.length, href.length - search.length - hash.length), e.clientId, e.resultingClientId));
});
