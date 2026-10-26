const CACHE = "mate-v2";
const ARCHIVOS = ["./", "index.html", "manifest.json", "icon-180.png", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(r => { const copia = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match("index.html")))
  );
});

self.addEventListener("push", e => {
  let d = {};
  try { d = e.data.json(); } catch (_) { d = { body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "Camino al Mate", {
    body: d.body || "", icon: "icon-192.png", badge: "icon-192.png", tag: d.tag, data: { url: d.url || "" }
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const hash = (e.notification.data && e.notification.data.url) || "";
  const destino = new URL("./" + hash, self.registration.scope).href;
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(ventanas => {
    const v = ventanas.find(w => "focus" in w);
    if (v) { v.postMessage({ tab: hash.slice(1) }); return v.focus(); }
    return clients.openWindow(destino);
  }));
});
