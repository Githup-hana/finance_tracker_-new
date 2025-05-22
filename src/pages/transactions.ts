

async function transactionPage() {
  const response = await fetch("/src/pages/html/transaction.html");
  const html = await response.text();
 
  return html;
}

export default transactionPage;
