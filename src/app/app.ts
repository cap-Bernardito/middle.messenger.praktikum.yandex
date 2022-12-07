import { renderLayoutCentered } from "shared/ui/layouts/centered/centered";

import { loginPage, registerPage } from "../pages";

import "./styles/index.scss";

const pages: { [K: string]: { title: string; component: string } } = {
  "/login": { title: "Авторизация", component: loginPage },
  "/register": { title: "Регистрация", component: registerPage },
};

const currentRoute = location.pathname;
let html = "";

if (!pages[currentRoute]) {
  const indexPage = Object.entries(pages)
    .map(([url, { title }]) => `<li><a href="${url}">${title}</a></li>`)
    .join("");

  html = `<ul class="list-intro">${indexPage}</ul>`;
} else {
  html = pages[currentRoute]["component"];
}

const root = document.querySelector("#root") as HTMLDivElement;

root.innerHTML = renderLayoutCentered({ body: html });
