interface CoinData {
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  ath: number;
  ath_change_percentage: number;
  last_updated: string;
}

export async function getCryptoPrice() {
  const cryptoPriceContainer = document.querySelector(
    "#crypto-price-display"
  ) as HTMLDivElement;

  const cryptoInput = document.querySelector(
    "#crypto-input"
  ) as HTMLInputElement;

  const currencySelect = document.querySelector(
    "#currency-select"
  ) as HTMLSelectElement;

  const crypto = cryptoInput.value.toLowerCase().trim();
  const currency = currencySelect.value;

  if (!crypto || !currency) {
    alert("Bitte gib eine Kryptowährung und eine Währung ein.");
    return;
  }

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${crypto}`;

  if (cryptoPriceContainer) cryptoPriceContainer.innerHTML = "";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der API-Daten");
    }

    const data = await response.json();

    if (data) {
      displayCrypto(data[0]);
    } else {
      alert("Kryptowährung nicht gefunden!");
    }
  } catch (error) {
    alert("Fehler beim Abrufen der Krypto-Preise.");
  }
}

export async function displayCrypto(coinData: CoinData) {
  const cryptoPriceContainer = document.querySelector(
    "#crypto-price-display"
  ) as HTMLDivElement;

  cryptoPriceContainer.innerHTML = `
    <div class="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto space-y-4">
     
      <h2 class="text-3xl font-semibold text-center text-gray-800">${coinData.name}</h2>
      <div class="space-y-2 text-center text-gray-700">
        <p class="text-lg font-bold">Aktueller Preis: 
          <span class="text-xl font-semibold text-green-600">${coinData.current_price} €</span>
        </p>
        <p class="text-sm">Marktkapitalisierung: <span class="font-semibold">${coinData.market_cap} €</span></p>
        <p class="text-sm text-green-600">24h Hoch: <span class="font-semibold">${coinData.high_24h} €</span></p>
        <p class="text-sm text-red-600">24h Tief: <span class="font-semibold">${coinData.low_24h} €</span></p>
        <p class="text-sm ${coinData.price_change_24h < 0 ? "text-red-500" : "text-green-500"}">
          Änderung (24h): <span class="font-semibold">${coinData.price_change_24h} € (${coinData.price_change_percentage_24h}%)</span>
        </p>
      </div>
    </div>
  `;
}

// Investieren und speichern der Investition im localStorage
export async function handleInvestment() {
  const cryptoInput = document.querySelector(
    "#crypto-input-invest"
  ) as HTMLInputElement;
  const currencySelect = document.querySelector(
    "#currency-select-invest"
  ) as HTMLSelectElement;
  const investmentAmountInput = document.querySelector(
    "#investment-amount"
  ) as HTMLInputElement;

  const crypto = cryptoInput.value.toLowerCase().trim();
  const currency = currencySelect.value;
  const investmentAmount = parseFloat(investmentAmountInput.value);

  if (!crypto || !currency || isNaN(investmentAmount)) {
    alert("Bitte gib eine Kryptowährung, Währung und Investitionsbetrag ein.");
    return;
  }

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${crypto}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data[0]) {
      const coinData = data[0];
      const amountOfCrypto = investmentAmount / coinData.current_price;

      const investmentData = {
        crypto,
        amount: amountOfCrypto,
        investmentAmount,
        priceAtInvestment: coinData.current_price,
        currency,
        date: new Date().toLocaleDateString()
      };

      localStorage.setItem("investment", JSON.stringify(investmentData));

      alert(`Du hast ${amountOfCrypto.toFixed(6)} ${crypto.toUpperCase()} für ${investmentAmount} ${currency.toUpperCase()} gekauft!`);
    } else {
      alert("Kryptowährung nicht gefunden!");
    }
  } catch (error) {
    alert("Fehler beim Abrufen der Krypto-Preise.");
  }
}

// Überprüfung der Investition und Berechnung von Gewinn oder Verlust
export function checkInvestment() {
  const investmentData = JSON.parse(localStorage.getItem("investment") || "{}");

  if (!investmentData.crypto) {
    alert("Keine Investition gefunden.");
    return;
  }

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${investmentData.currency}&ids=${investmentData.crypto}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data && data[0]) {
        const coinData = data[0];
        const currentValue = investmentData.amount * coinData.current_price;
        const profitLoss = currentValue - investmentData.investmentAmount;
        const profitLossPercentage = (profitLoss / investmentData.investmentAmount) * 100;

        let resultMessage = `Aktueller Wert der Investition: ${currentValue.toFixed(2)} ${investmentData.currency.toUpperCase()}\n`;

        if (profitLoss >= 0) {
          resultMessage += `Gewinn: ${profitLoss.toFixed(2)} ${investmentData.currency.toUpperCase()} (${profitLossPercentage.toFixed(2)}%)`;
        } else {
          resultMessage += `Verlust: ${Math.abs(profitLoss).toFixed(2)} ${investmentData.currency.toUpperCase()} (${Math.abs(profitLossPercentage).toFixed(2)}%)`;
        }

        alert(resultMessage);
      } else {
        alert("Kryptowährung nicht gefunden!");
      }
    })
    .catch(() => alert("Fehler beim Abrufen der Krypto-Preise."));
}
