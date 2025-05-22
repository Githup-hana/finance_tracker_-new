import { getTransactions, Transaction } from "./getTransactions";



function savingTransaction() {
  const form = document.getElementById("transaction-form") as HTMLFormElement;
  const typeInput = document.getElementById(
    "type-of-transactions"
  ) as HTMLSelectElement;
  const amountInput = document.getElementById("amount") as HTMLInputElement;
  const descInput = document.getElementById("description") as HTMLInputElement;

  const transactions: Transaction = {
    id: Date.now(),
    description: descInput.value,
    amount: parseFloat(amountInput.value),
    type: typeInput.value as "income" | "expense",
    date:new Date(Date.now()).toLocaleDateString()
  };
  
  const existingTransactions = getTransactions();
  existingTransactions.push(transactions);
  const newTransaction = JSON.stringify(existingTransactions);
  localStorage.setItem("transactions", newTransaction);
  form.reset();
 
}

export { savingTransaction };
