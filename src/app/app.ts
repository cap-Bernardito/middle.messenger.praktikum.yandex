// eslint-disable-next-line simple-import-sort/imports
import "./registerComponents";

import { Block, renderDOM } from "shared/core";

import {
  ChatPage,
  LoginPage,
  Page_404,
  Page_500,
  ProfileAvatarPage,
  ProfileEditInfoPage,
  ProfileEditPasswordPage,
  ProfilePage,
  RegisterPage,
} from "../pages";

import "./styles/index.scss";

const pages: { [K: string]: { title: string; component: Block } } = {
  "/login": { title: "Авторизация", component: new LoginPage() },
  "/register": { title: "Регистрация", component: new RegisterPage() },
  "/profile": { title: "Профиль", component: new ProfilePage() },
  "/profile_edit_avatar": { title: "Изменить аватар", component: new ProfileAvatarPage() },
  "/profile_edit_info": { title: "Изменить данные", component: new ProfileEditInfoPage() },
  "/profile_edit_password": { title: "Изменить пароль", component: new ProfileEditPasswordPage() },
  "/chat": { title: "Чат", component: new ChatPage() },
  "/404": { title: "404", component: new Page_404() },
  "/500": { title: "500", component: new Page_500() },
};

const currentRoute = location.pathname;
let html: Block;

if (!pages[currentRoute]) {
  const indexPage = Object.entries(pages)
    .map(([url, { title }]) => `<li><a href="${url}">${title}</a></li>`)
    .join("");

  html = new (class extends Block {
    render() {
      return `
        {{#LayoutCentered}}
          <ul class="list-intro">${indexPage}</ul>
        {{/LayoutCentered}}
      `;
    }
  })();
} else {
  html = pages[currentRoute]["component"];
}

renderDOM(html);
