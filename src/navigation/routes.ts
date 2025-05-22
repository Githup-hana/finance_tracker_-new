import cryptoPage from "../pages/crypto";
import homePage from "../pages/home";
import transactionPage from "../pages/transactions";

const routes = [
  {
    path: "/",
    page: homePage,
  },
  {
    path: "/Transactions",
    page: transactionPage,
  },
  {
    path: "/cryptoPrice",
    page: cryptoPage,
  },
];

export { routes };
