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

export async function displayCrypto(coinData: CoinData) {
  const cryptoPriceContainer = document.querySelector(
    "#crypto-price"
  ) as HTMLDivElement; 

  cryptoPriceContainer.innerHTML = `
    <div class="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto space-y-4">
      <img src="${coinData.image}" alt="${
    coinData.name
  }" class="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-gray-200">
      
      <h2 class="text-3xl font-semibold text-center text-gray-800">${
        coinData.name
      }</h2>
      
      <div class="space-y-2 text-center text-gray-700">
        <p class="text-lg font-bold">Aktueller Preis: 
          <span class="text-xl font-semibold text-green-600">${
            coinData.current_price
          } €</span>
        </p>
        <p class="text-sm">Marktkapitalisierung: <span class="font-semibold">${
          coinData.market_cap
        } €</span></p>
        <p class="text-sm text-green-600">24h Hoch: <span class="font-semibold">${
          coinData.high_24h
        } €</span></p>
        <p class="text-sm text-red-600">24h Tief: <span class="font-semibold">${
          coinData.low_24h
        } €</span></p>
        <p class="text-sm ${
          coinData.price_change_24h < 0 ? "text-red-500" : "text-green-500"
        }">
          Änderung (24h): <span class="font-semibold">${
            coinData.price_change_24h
          } € (${coinData.price_change_percentage_24h}%)</span>
        </p>
        
       
      </div>
    </div>
  `;
}
