(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();async function g(){return await(await fetch("/src/pages/html/crypto.html")).text()}async function y(){return await(await fetch("/src/pages/html/home.html")).text()}async function h(){return await(await fetch("/src/pages/html/transaction.html")).text()}const x=[{path:"/",page:y},{path:"/Transactions",page:h},{path:"/cryptoPrice",page:g}];function p(){const e=localStorage.getItem("transactions");return e?JSON.parse(e):[]}function u(){const e=document.getElementById("balance"),o=p().reduce((s,t)=>t.type==="income"?s+t.amount:s-t.amount,0);e&&(e.textContent=`${o.toFixed(2)} €`)}function b(){const e=document.getElementById("transaction-form"),r=document.getElementById("type-of-transactions"),o=document.getElementById("amount"),s=document.getElementById("description"),t={id:Date.now(),description:s.value,amount:parseFloat(o.value),type:r.value,date:new Date(Date.now()).toLocaleDateString()},n=p();n.push(t);const c=JSON.stringify(n);localStorage.setItem("transactions",c),e.reset()}function w(){const e=document.getElementById("transaction-list"),r=document.getElementById("filter-description"),o=document.getElementById("filter-date"),s=document.getElementById("filter-button");if(e){const t=p();e.innerHTML=t.map(n=>{const c=new Date(n.id).toLocaleDateString("de-DE");return`
        <li class="flex justify-between items-center p-4 mb-2 border-b border-gray-300">
          <div class="flex items-center space-x-3">
            <span class="text-lg">${m(n.description)}</span>
            <div>
              <h3 class="text-gray-800 font-medium">${n.description}</h3>
              <p class="text-sm text-gray-500">${n.type==="income"?"Einnahme":"Ausgabe"}</p>
            </div>
          </div>
          <p class="text-lg font-semibold ${n.type==="income"?"text-green-500":"text-red-500"}">${n.amount} €</p>
          <p class="text-sm text-gray-500">${c}</p>
        </li>`}).join(""),s.addEventListener("click",()=>{const n=r.value,c=o.value;let i=t;if(n&&(i=i.filter(a=>a.description.toLowerCase()===n.toLowerCase())),c){const a=c;i=i.filter(d=>new Date(d.id).toISOString().split("T")[0]===a)}if(i.length===0){e.innerHTML='<p class="text-center text-gray-500 mt-4">Keine Transaktionen gefunden.</p>';return}e.innerHTML=i.map(a=>{const d=new Date(a.id).toLocaleDateString("de-DE");return`
            <li class="flex justify-between items-center p-4 mb-2 border-b border-gray-300">
              <div class="flex items-center space-x-3">
                <span class="text-lg">${m(a.description)}</span>
                <div>
                  <h3 class="text-gray-800 font-medium">${a.description}</h3>
                  <p class="text-sm text-gray-500">${a.type==="income"?"Einnahme":"Ausgabe"}</p>
                </div>
              </div>
              <p class="text-lg font-semibold ${a.type==="income"?"text-green-500":"text-red-500"}">${a.amount} €</p>
              <p class="text-sm text-gray-500">${d}</p>
            </li>`}).join("")})}}function m(e){return{Gehalt:"💰",Miete:"🏠",Lebensmittel:"🛒",Freizeit:"🎉",Sonstiges:"🔹",Transport:"🚗",Shopping:"🛍️",Versicherung:"🛡️"}[e]||"💳"}async function v(){const e=document.querySelector("#crypto-price-display"),r=document.querySelector("#crypto-input"),o=document.querySelector("#currency-select"),s=r.value.toLowerCase().trim(),t=o.value;if(!s||!t){alert("Bitte gib eine Kryptowährung und eine Währung ein.");return}const n=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${t}&ids=${s}`;e&&(e.innerHTML="");try{const c=await fetch(n);if(!c.ok)throw new Error("Fehler beim Abrufen der API-Daten");const i=await c.json();i?L(i[0]):alert("Kryptowährung nicht gefunden!")}catch{alert("Fehler beim Abrufen der Krypto-Preise.")}}async function L(e){const r=document.querySelector("#crypto-price-display");r.innerHTML=`
    <div class="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto space-y-4">
      <img src="${e.image}" alt="${e.name}" class="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-gray-200">
      <h2 class="text-3xl font-semibold text-center text-gray-800">${e.name}</h2>
      <div class="space-y-2 text-center text-gray-700">
        <p class="text-lg font-bold">Aktueller Preis: 
          <span class="text-xl font-semibold text-green-600">${e.current_price} €</span>
        </p>
        <p class="text-sm">Marktkapitalisierung: <span class="font-semibold">${e.market_cap} €</span></p>
        <p class="text-sm text-green-600">24h Hoch: <span class="font-semibold">${e.high_24h} €</span></p>
        <p class="text-sm text-red-600">24h Tief: <span class="font-semibold">${e.low_24h} €</span></p>
        <p class="text-sm ${e.price_change_24h<0?"text-red-500":"text-green-500"}">
          Änderung (24h): <span class="font-semibold">${e.price_change_24h} € (${e.price_change_percentage_24h}%)</span>
        </p>
      </div>
    </div>
  `}async function l(e){const r=window.location.pathname,o=x.find(s=>s.path===r);if(!o){console.error(`Route nicht gefunden: ${r}`),e.innerHTML="<h2>404 - Seite nicht gefunden</h2>";return}try{const s=await o.page();if(e.innerHTML=s,r==="/"){const t=document.getElementById("transaction-form");u(),t.addEventListener("submit",n=>{n.preventDefault(),b(),u()})}r==="/Transactions"&&w(),r==="/cryptoPrice"&&document.querySelector("#crypto-but").addEventListener("click",v)}catch(s){console.error("Fehler beim Laden der Seite:",s),e.innerHTML="<h2>Fehler beim Laden der Seite</h2>"}}function S(e){document.body.addEventListener("click",async r=>{const o=r.target;o.tagName==="A"&&o.getAttribute("href")?.startsWith("/")&&(r.preventDefault(),window.history.pushState({},"",o.href),await l(e))}),window.addEventListener("popstate",()=>l(e)),window.addEventListener("load",()=>l(e))}const $=document.querySelectorAll("a");function E(e){$.forEach(r=>{r.addEventListener("click",o=>{o.preventDefault();const s=o.target.getAttribute("href");history.pushState({},"",s),l(e)})})}const f=document.querySelector("#app");S(f);E(f);
