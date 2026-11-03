// Opens the sealed files in `e/`. With no key it does nothing, so every page is the password box.
const scope = self.registration.scope;
let key = null, map = null, open = null;

addEventListener('install', () => skipWaiting());
addEventListener('activate', e => e.waitUntil(clients.claim()));

const held = () => new Promise(done => {
  const open = indexedDB.open('share', 1);
  open.onupgradeneeded = () => open.result.createObjectStore('key');
  open.onerror = () => done(undefined);
  open.onsuccess = () => {
    const r = open.result.transaction('key').objectStore('key').get('raw');
    r.onsuccess = () => done(r.result);
    r.onerror = () => done(undefined);
  };
});

async function opened(url) {
  const sealed = await (await fetch(url, url.includes('map') ? { cache: 'no-cache' } : {})).arrayBuffer();
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: sealed.slice(0, 12) }, key, sealed.slice(12));
}

async function serve(request, path) {
  // A page left open is served as it is, so the key never brings back an older sealed copy of it.
  if (!open || request.mode === 'navigate') open = await fetch(`${scope}open.json`, { cache: 'no-cache' }).then(r => (r.ok ? r.json() : []), () => []);
  if (open.includes(path || 'index.html')) return fetch(request);
  const raw = key ?? await held();
  if (!raw) return fetch(request);
  try {
    key ??= await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
    // A new page is when a new deploy can show up.
    if (!map || request.mode === 'navigate') map = JSON.parse(new TextDecoder().decode(await opened(`${scope}e/map.bin`)));
    const file = map[path || 'index.html'];
    if (!file) return fetch(request);
    return new Response(await opened(`${scope}e/${file[0]}.bin`), { headers: { 'content-type': file[1] } });
  } catch {
    return fetch(request);
  }
}

addEventListener('fetch', e => {
  const { href, search, hash } = new URL(e.request.url);
  if (e.request.method !== 'GET' || !href.startsWith(scope)) return;
  e.respondWith(serve(e.request, href.slice(scope.length, href.length - search.length - hash.length)));
});
