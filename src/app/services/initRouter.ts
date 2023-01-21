import * as authLib from "processes/auth/model/lib";

import {
  LoginPage,
  MessengerPage,
  Page_404,
  Page_500,
  ProfileAvatarPage,
  ProfileEditInfoPage,
  ProfileEditPasswordPage,
  ProfilePage,
  RegisterPage,
} from "pages";

import { Route, router } from "shared/core";
import { Store } from "shared/core/store";
import { ROUTES } from "shared/utils/constants";

const routes: TRouteObject[] = [
  {
    path: ROUTES.home.path,
    title: ROUTES.home.title,
    shouldAuthorized: false,
    routeShouldMount: () => {
      const { user } = authLib.selectUser();

      if (user) {
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
      const { user } = authLib.selectUser();

      if (user) {
        router.go(ROUTES.messenger.path);

        return false;
      }

      return true;
    },
  },
  {
    path: ROUTES.register.path,
    title: ROUTES.register.title,
    element: RegisterPage,
    shouldAuthorized: false,
    routeShouldMount: () => {
      const { user } = authLib.selectUser();

      if (user) {
        router.go(ROUTES.messenger.path);

        return false;
      }

      return true;
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
    element: MessengerPage,
    shouldAuthorized: true,
  },
  {
    path: ROUTES.messenger.path,
    title: ROUTES.messenger.title,
    element: MessengerPage,
    shouldAuthorized: true,
  },
];

export const initRouter = (store: Store<AppState>) => {
  routes.forEach((routeProps) => {
    router.use(routeProps, (route: Route) => {
      const { user } = authLib.selectUser();

      if (!route.isPrivate() || Boolean(user)) {
        return true;
      }

      router.go(ROUTES.login.path);

      return false;
    });
  });

  store.on("changed", (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }
  });
};
