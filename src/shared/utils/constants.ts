export const ROUTES = {
  home: { path: "/", title: "Мессенджер" },
  login: { path: "/sign-in", title: "Авторизация" },
  register: { path: "/sign-up", title: "Регистрация" },
  messenger: { path: "/messenger", title: "Мессенджер" },
  chat: { path: "/messenger/:id", title: "Чат" },
  profile: { path: "/settings", title: "Профиль" },
  profileEditAvatar: { path: "/settings_edit_avatar", title: "Изменить аватар" },
  profileEditInfo: { path: "/settings_edit_info", title: "Изменить данные" },
  profileEditPassword: { path: "/settings_edit_password", title: "Изменить пароль" },
  page_500: { path: "/500", title: "Внутренняя ошибка сервера" },
  page_404: { path: "*", title: "Страница не найдена" },
};
