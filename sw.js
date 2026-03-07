const CACHE_NAME = 'skin-ritual-v7';
const ASSETS = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png'];

// ---- Install & Cache ----
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => startScheduler())
  );
});

// ---- Serve from Cache ----
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

// ---- Notification Scheduler ----
let schedulerInterval = null;

function startScheduler() {
  if (schedulerInterval) clearInterval(schedulerInterval);
  schedulerInterval = setInterval(checkAndNotify, 30000); // every 30s
  checkAndNotify(); // immediate check
}

async function checkAndNotify() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const dateStr = now.toDateString();

  const cache = await caches.open('notif-tracker');

  if (h === 9 && m < 1) {
    const prev = await cache.match('last-am');
    const prevDate = prev ? await prev.text() : '';
    if (prevDate !== dateStr) {
      await cache.put('last-am', new Response(dateStr));
      self.registration.showNotification('Good morning! ☀️', {
        body: 'Time for your AM skin ritual 🌿 Glow up in 10 minutes!',
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        tag: 'am-routine',
        renotify: false,
        data: { routine: 'am' },
        actions: [
          { action: 'open-am', title: '✨ Start Now' },
          { action: 'dismiss', title: 'Later' }
        ]
      });
    }
  }

  if (h === 22 && m < 1) {
    const prev = await cache.match('last-pm');
    const prevDate = prev ? await prev.text() : '';
    if (prevDate !== dateStr) {
      await cache.put('last-pm', new Response(dateStr));
      self.registration.showNotification('Evening ritual time 🌙', {
        body: 'Wind down beautifully 💛 6 steps to glowing skin tomorrow!',
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        tag: 'pm-routine',
        renotify: false,
        data: { routine: 'pm' },
        actions: [
          { action: 'open-pm', title: '🌙 Start Ritual' },
          { action: 'dismiss', title: 'Later' }
        ]
      });
    }
  }
}

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const routine = e.notification.data?.routine;
  const action = e.action;
  if (action === 'dismiss') return;

  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      if (clients.length > 0) {
        clients[0].focus();
        clients[0].postMessage({ type: 'OPEN_ROUTINE', routine });
      } else {
        self.clients.openWindow(`/?routine=${routine}`);
      }
    })
  );
});

// Restart scheduler on message from page
self.addEventListener('message', e => {
  if (e.data?.type === 'KEEP_ALIVE') startScheduler();
});
