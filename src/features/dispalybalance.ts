import { getTransactions } from "./getTransactions";


interface Transaction {
  type: "income" | "expense";
  amount: number;
}

function displayBalance() {
  const balanceDisplay = document.getElementById("balance");
 
  const transactions = getTransactions();
  const balance = transactions.reduce(
    (sum: number, t: Transaction) =>
      t.type === "income" ? sum + t.amount : sum - t.amount,
    0
  );
  if (balanceDisplay) {
    balanceDisplay.textContent = `${balance.toFixed(2)} €`;
  }
}

export { displayBalance };
