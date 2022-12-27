import { Block, renderDOM } from "shared/core";
import { renderLayoutCentered } from "shared/ui/layouts/centered";

import {
  chatPage,
  loginPage,
  page_404,
  Page_500,
  profileEditAvatarPage,
  profileEditInfoPage,
  profileEditPasswordPage,
  profilePage,
  registerPage,
} from "../pages";

import "./styles/index.scss";

const pages: { [K: string]: { title: string; component: string | Block } } = {
  "/login": { title: "Авторизация", component: loginPage },
  "/register": { title: "Регистрация", component: registerPage },
  "/profile": { title: "Профиль", component: profilePage },
  "/profile_edit_avatar": { title: "Изменить аватар", component: profileEditAvatarPage },
  "/profile_edit_info": { title: "Изменить данные", component: profileEditInfoPage },
  "/profile_edit_password": { title: "Изменить пароль", component: profileEditPasswordPage },
  "/chat": { title: "Чат", component: chatPage },
  "/404": { title: "404", component: page_404 },
  "/500": { title: "500", component: new Page_500() },
};

const currentRoute = location.pathname;
let html: string | Block = "";

function renderString(str: string) {
  const root = document.querySelector("#root") as HTMLDivElement;

  root.innerHTML = str;
}

if (!pages[currentRoute]) {
  const indexPage = Object.entries(pages)
    .map(([url, { title }]) => `<li><a href="${url}">${title}</a></li>`)
    .join("");

  html = renderLayoutCentered({ body: `<ul class="list-intro">${indexPage}</ul>` });
} else {
  html = pages[currentRoute]["component"];
}

if (html instanceof Block) {
  renderDOM(html);
} else {
  renderString(html);
}
