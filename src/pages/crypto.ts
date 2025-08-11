async function cryptoPage() {
  const response = await fetch("/src/pages/html/crypto.html");
  const html = await response.text();
  return html;
}


export default cryptoPage;
