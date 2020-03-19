/* if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
  );

  // Global workbox
  if (workbox) {
    console.log("Workbox is loaded", workbox);
    const {registerRoute} = workbox.routing;
    const {CacheFirst, staleWhileRevalidate} = workbox.strategies;
    const {CacheableResponse} = workbox.cacheableResponse;
    self.__WB_MANIFEST;

    // Disable logging
    workbox.setConfig({debug: false});

    //`generateSW` and `generateSWString` provide the option
    // to force update an exiting service worker.
    // Since we're using `injectManifest` to build SW,
    // manually overriding the skipWaiting();
    self.addEventListener("install", event => {
      self.skipWaiting();
      window.location.reload();
    });

    // Manual injection point for manifest files.
    // All assets under build/ and 5MB sizes are precached.
    workbox.precaching.precacheAndRoute([]);

    // Font caching
    registerRoute(
      new RegExp("https://fonts.(?:.googleapis|gstatic).com/(.*)"),
      workbox.strategies.cacheFirst({
        cacheName: "googleapis",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 30,
          }),
        ],
      })
    );

    // Image caching
    registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 600,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );

    // JS, CSS caching
    registerRoute(
      /\.(?:js|css|html)$/,
      staleWhileRevalidate({
        cacheName: "static-resources",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 20 * 24 * 60 * 60, // 20 Days
          }),
        ],
      })
    );

    // API response caching
    registerRoute(
      /api/,
      staleWhileRevalidate({
        cacheName: "api-cache",
        plugins: [
          new CacheableResponse({
            statuses: [200],
            headers: {
              "X-Is-Cacheable": "true",
            },
          }),
        ],
      })
    );
  } else {
    console.error("Workbox could not be loaded. No offline support.");
  }
}
 */
