// eslint-disable-next-line simple-import-sort/imports
import "./registerComponents";

import { Route, router } from "shared/core";

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

// TODO: Заменить на store
const state = {
  user: true,
};

const routes: TRouteObject[] = [
  {
    path: "/chat/:id",
    title: "Чат",
    element: ChatPage,
    shouldAuthorized: true,
  },
  {
    path: "/chat",
    title: "Мессенджер",
    element: ChatPage,
    shouldAuthorized: true,
  },
  {
    path: "/login",
    title: "Авторизация",
    element: LoginPage,
    shouldAuthorized: false,
  },
  {
    path: "/register",
    title: "Регистрация",
    element: RegisterPage,
    shouldAuthorized: false,
  },
  {
    path: "/profile",
    title: "Профиль",
    element: ProfilePage,
    shouldAuthorized: true,
  },
  {
    path: "/profile_edit_avatar",
    title: "Изменить аватар",
    element: ProfileAvatarPage,
    shouldAuthorized: true,
  },
  {
    path: "/profile_edit_info",
    title: "Изменить данные",
    element: ProfileEditInfoPage,
    shouldAuthorized: true,
  },
  {
    path: "/profile_edit_password",
    title: "Изменить пароль",
    element: ProfileEditPasswordPage,
    shouldAuthorized: true,
  },
  {
    path: "/500",
    title: "500",
    element: Page_500,
    shouldAuthorized: true,
  },
  {
    path: "*",
    title: "404",
    element: Page_404,
    shouldAuthorized: false,
  },
  {
    path: "/",
    element: ChatPage,
    shouldAuthorized: false,
    routeShouldMount: () => {
      if (state.user) {
        router.go("/chat");
      } else {
        router.go("/login");
      }

      return false;
    },
  },
];

routes.forEach((routeProps) => {
  router.use(routeProps, (route: Route) => {
    if (!route.isPrivate() || Boolean(state.user)) {
      return true;
    }

    router.go("/login");

    return false;
  });
});

router.start();
