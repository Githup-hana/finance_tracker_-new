import { navigation } from "./navigation/navigation";
import { initRouter } from "./navigation/router";
import "./style.css";

const appEl = document.querySelector<HTMLDivElement>("#app");

initRouter(appEl!);
navigation(appEl!);




