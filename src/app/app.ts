// eslint-disable-next-line simple-import-sort/imports
import "./registerComponents";

import { Route, router } from "shared/core";
import { ROUTES } from "shared/utils/constants";

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
    path: ROUTES.home.path,
    title: ROUTES.home.title,
    shouldAuthorized: false,
    routeShouldMount: () => {
      if (state.user) {
        router.go(ROUTES.messenger.path);
      } else {
        router.go(ROUTES.login.path);
      }

      return false;
    },
  },
  {
    path: ROUTES.login.path,
    title: ROUTES.login.title,
    element: LoginPage,
    shouldAuthorized: false,
    routeShouldMount: () => {
      if (state.user) {
        router.go(ROUTES.messenger.path);
      }

      return false;
    },
  },
  {
    path: ROUTES.register.path,
    title: ROUTES.register.title,
    element: RegisterPage,
    shouldAuthorized: false,
    routeShouldMount: () => {
      if (state.user) {
        router.go(ROUTES.messenger.path);
      }

      return false;
    },
  },
  {
    path: ROUTES.page_500.path,
    title: ROUTES.page_500.title,
    element: Page_500,
    shouldAuthorized: false,
  },
  {
    path: ROUTES.page_404.path,
    title: ROUTES.page_404.title,
    element: Page_404,
    shouldAuthorized: false,
  },
  {
    path: ROUTES.profile.path,
    title: ROUTES.profile.title,
    element: ProfilePage,
    shouldAuthorized: true,
  },
  {
    path: ROUTES.profileEditAvatar.path,
    title: ROUTES.profileEditAvatar.title,
    element: ProfileAvatarPage,
    shouldAuthorized: true,
  },
  {
    path: ROUTES.profileEditInfo.path,
    title: ROUTES.profileEditInfo.title,
    element: ProfileEditInfoPage,
    shouldAuthorized: true,
  },
  {
    path: ROUTES.profileEditPassword.path,
    title: ROUTES.profileEditPassword.title,
    element: ProfileEditPasswordPage,
    shouldAuthorized: true,
  },
  {
    path: ROUTES.chat.path,
    title: ROUTES.chat.title,
    element: ChatPage,
    shouldAuthorized: true,
  },
  {
    path: ROUTES.messenger.path,
    title: ROUTES.messenger.title,
    element: ChatPage,
    shouldAuthorized: true,
  },
];

routes.forEach((routeProps) => {
  router.use(routeProps, (route: Route) => {
    if (!route.isPrivate() || Boolean(state.user)) {
      return true;
    }

    router.go(ROUTES.login.path);

    return false;
  });
});

router.start();
