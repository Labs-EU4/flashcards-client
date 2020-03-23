if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
  );

  // Global workbox
  if (workbox) {
    console.log("Workbox is loaded");

    // Disable logging
    workbox.setConfig({debug: true});

    //`generateSW` and `generateSWString` provide the option
    // to force update an exiting service worker.
    // Since we're using `injectManifest` to build SW,
    // manually overriding the skipWaiting();
    self.addEventListener("install", event => {
      self.skipWaiting();
    });

    // Manual injection point for manifest files.
    // All assets under build/ and 5MB sizes are precached.
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
    workbox.precaching.cleanupOutdatedCaches();
    // Font caching
    workbox.routing.registerRoute(
      new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
      new workbox.strategies.CacheFirst({
        cacheName: "googleapis",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 30,
          }),
        ],
      })
    );

    // Image caching
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
      new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    // JS, CSS caching
    workbox.routing.registerRoute(
      /\.(?:js|css|html)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "static-resources",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 20 * 24 * 60 * 60, // 20 Days
          }),
        ],
      })
    );

    // Runtime response caching
    workbox.routing.registerRoute(
      /api\/(?:decks|cards|users|auth)/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "api-cache",
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 20 * 24 * 60 * 60, // 20 Days
          }),
        ],
      })
    );
  } else {
    console.error("Workbox could not be loaded. No offline support");
  }
}
