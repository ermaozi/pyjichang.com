(function(){
  if (!["pyjichang.com", "www.pyjichang.com"].includes(location.hostname) || window.__siteCfRumLoaded || document.querySelector('script[src^="https://static.cloudflareinsights.com/beacon"]')) return;
  window.__siteCfRumLoaded = true;
  const script = document.createElement('script');
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.defer = true;
  script.setAttribute('data-cf-beacon', JSON.stringify({token:"4e98ce8ae3364967acc0e2828fd792f6"}));
  document.head.appendChild(script);
})();
