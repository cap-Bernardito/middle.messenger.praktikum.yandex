import { renderLayoutCentered } from "shared/ui/layouts/centered";

import { chatPage, loginPage, page_404, page_500, profilePage, registerPage } from "../pages";

import "./styles/index.scss";

const pages: { [K: string]: { title: string; component: string } } = {
  "/login": { title: "Авторизация", component: loginPage },
  "/register": { title: "Регистрация", component: registerPage },
  "/profile": { title: "Профиль", component: profilePage },
  "/chat": { title: "Чат", component: chatPage },
  "/404": { title: "404", component: page_404 },
  "/500": { title: "500", component: page_500 },
};

const currentRoute = location.pathname;
let html = "";

if (!pages[currentRoute]) {
  const indexPage = Object.entries(pages)
    .map(([url, { title }]) => `<li><a href="${url}">${title}</a></li>`)
    .join("");

  html = renderLayoutCentered({ body: `<ul class="list-intro">${indexPage}</ul>` });
} else {
  html = pages[currentRoute]["component"];
}

const root = document.querySelector("#root") as HTMLDivElement;

root.innerHTML = html;
