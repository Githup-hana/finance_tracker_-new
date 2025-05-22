
export interface Transaction {
    id: number;
    description: string;
    amount: number;
    type: "income" | "expense";
    date:string;
  }
function getTransactions(): Transaction[] {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  }
  

  
  export { getTransactions };