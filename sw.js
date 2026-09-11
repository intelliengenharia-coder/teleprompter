/* Guarda a pagina para ela abrir sem internet.
   VERSAO precisa mudar a cada build, senao o aparelho continua servindo a
   copia velha e a correcao nunca chega em quem ja abriu uma vez. */
var VERSAO = "tp-20260911-143538";
var PROPRIOS = ["./", "index.html", "manifest.webmanifest", "icone.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSAO).then(function (c) { return c.addAll(PROPRIOS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (nomes) {
      return Promise.all(nomes.map(function (n) {
        if (n !== VERSAO) return caches.delete(n);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  var fonte = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";

  // Proprios e fontes: serve do aparelho primeiro, busca so o que faltar.
  // As fontes vem de fora, entao guardamos na primeira vez que houver rede e
  // dali em diante a pagina abre com a letra certa mesmo sem sinal.
  if (url.origin === self.location.origin || fonte) {
    e.respondWith(
      caches.match(req).then(function (achado) {
        if (achado) return achado;
        return fetch(req).then(function (resp) {
          var copia = resp.clone();
          caches.open(VERSAO).then(function (c) { c.put(req, copia); });
          return resp;
        }).catch(function () {
          return caches.match("index.html");
        });
      })
    );
  }
});
