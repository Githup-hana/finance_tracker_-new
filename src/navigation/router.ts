import { routes } from "./routes";
import { displayBalance } from "../features/dispalybalance";
import { savingTransaction } from "../features/savingTransaction";
import { displayData } from "../features/displaytransactions";
import { getCryptoPrice } from "../features/cryptoPrice";

async function updateAppContent(appEl: HTMLDivElement) {
  const currentPath = window.location.pathname;

  const route = routes.find((route) => route.path === currentPath);

  if (!route) {
    console.error(`Route nicht gefunden: ${currentPath}`);
    appEl.innerHTML = "<h2>404 - Seite nicht gefunden</h2>";
    return;
  }

  try {
    const content = await route.page();
    appEl.innerHTML = content;

    if (currentPath === "/") {
      const form = document.getElementById(
        "transaction-form"
      ) as HTMLFormElement;

      displayBalance();
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        savingTransaction();
        displayBalance();
      });
    }
    if (currentPath === "/Transactions") {
      displayData();
    }
    if (currentPath === "/cryptoPrice") {
      const cryptoButton = document.querySelector(
        "#crypto-but"
      ) as HTMLButtonElement;
      cryptoButton.addEventListener("click", getCryptoPrice);
    }
  } catch (error) {
    console.error("Fehler beim Laden der Seite:", error);
    appEl.innerHTML = "<h2>Fehler beim Laden der Seite</h2>";
  }
}

function initRouter(appEl: HTMLDivElement) {
  document.body.addEventListener("click", async (event) => {
    const target = event.target as HTMLAnchorElement;

    if (
      target.tagName === "A" &&
      target.getAttribute("href")?.startsWith("/")
    ) {
      event.preventDefault();

      window.history.pushState({}, "", target.href);

      await updateAppContent(appEl);
    }
  });

  window.addEventListener("popstate", () => updateAppContent(appEl));

  window.addEventListener("load", () => updateAppContent(appEl));
}

export { updateAppContent, initRouter };
