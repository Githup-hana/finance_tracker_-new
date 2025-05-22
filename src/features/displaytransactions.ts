import { getTransactions } from "./getTransactions";


function displayData(): void {
  const transactionList = document.getElementById("transaction-list");
  const filterSelect = document.getElementById("filter-description") as HTMLSelectElement;
  const dateSelect = document.getElementById("filter-date") as HTMLInputElement;
  const filterButton = document.getElementById("filter-button") as HTMLButtonElement;

  if (transactionList) {
    const transactions = getTransactions();

    transactionList.innerHTML = transactions
      .map((transaction) => {
        const date = new Date(transaction.id).toLocaleDateString('de-DE'); 
        return `
        <li class="flex justify-between items-center p-4 mb-2 border-b border-gray-300">
          <div class="flex items-center space-x-3">
            <span class="text-lg">${getTransactionIcon(transaction.description)}</span>
            <div>
              <h3 class="text-gray-800 font-medium">${transaction.description}</h3>
              <p class="text-sm text-gray-500">${transaction.type === "income" ? "Einnahme" : "Ausgabe"}</p>
            </div>
          </div>
          <p class="text-lg font-semibold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}">${transaction.amount} €</p>
          <p class="text-sm text-gray-500">${date}</p>
        </li>`;
      })
      .join("");

   
    filterButton.addEventListener("click", () => {
      const selectedFilter = filterSelect.value;
      const selectedDate = dateSelect.value; 

      let filteredTransactions = transactions;

    
      if (selectedFilter) {
        filteredTransactions = filteredTransactions.filter(
          (transaction) => transaction.description.toLowerCase() === selectedFilter.toLowerCase()
        );
      }

   
      if (selectedDate) {
        const selectedDateFormatted = selectedDate;

        filteredTransactions = filteredTransactions.filter((transaction) => {
          const transactionDate = new Date(transaction.id);
          const transactionDateFormatted = transactionDate.toISOString().split('T')[0]; // "yyyy-mm-dd" Format
          return transactionDateFormatted === selectedDateFormatted;
        });
      }

      
      if (filteredTransactions.length === 0) {
        transactionList.innerHTML = `<p class="text-center text-gray-500 mt-4">Keine Transaktionen gefunden.</p>`;
        return;
      }

      transactionList.innerHTML = filteredTransactions
        .map((transaction) => {
          const date = new Date(transaction.id).toLocaleDateString('de-DE');
          return `
            <li class="flex justify-between items-center p-4 mb-2 border-b border-gray-300">
              <div class="flex items-center space-x-3">
                <span class="text-lg">${getTransactionIcon(transaction.description)}</span>
                <div>
                  <h3 class="text-gray-800 font-medium">${transaction.description}</h3>
                  <p class="text-sm text-gray-500">${transaction.type === "income" ? "Einnahme" : "Ausgabe"}</p>
                </div>
              </div>
              <p class="text-lg font-semibold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}">${transaction.amount} €</p>
              <p class="text-sm text-gray-500">${date}</p>
            </li>`;
        })
        .join("");
    });
  }
}

function getTransactionIcon(description: string): string {
  const icons: { [key: string]: string } = {
    Gehalt: "💰",
    Miete: "🏠",
    Lebensmittel: "🛒",
    Freizeit: "🎉",
    Sonstiges: "🔹",
    Transport: "🚗",
    Shopping: "🛍️",
    Versicherung: "🛡️",
  };
  return icons[description] || "💳";
}

export { displayData };
