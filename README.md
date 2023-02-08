# Веб-приложение «Чат»

[![Build Status](https://github.com/cap-Bernardito/middle.messenger.praktikum.yandex/workflows/Messenger/badge.svg)](https://github.com/cap-Bernardito/middle.messenger.praktikum.yandex/actions/workflows/main.yml?query=branch%3Amain)

Учебный проект, разработанный в рамках курса "Мидл фронтенд-разработчик".
Написан на чистом JS(TS).

Реализованы следующие фичи:

- авторизация/регистрация/редактирование пользователей
- создание/удаление/редактирование чатов
- добавление/удаление пользователей из чата
- пересылка сообщений на основе Websocket
- роутинг

В разработке используется своя реализация жизненного цикла компонент на чистом JS в связке с паттерном шины событий.

Написаны собственные абстракции над XMLHttpRequest и WebSocket для упрощения взаимодействия с API.

В проекте используются:

- методология [FSD](https://feature-sliced.design/ru/docs/reference/units/layers) для организация структуры папок проекта
- Typescript
- SASS
- Handlebars
- Jest
- Webpack
- ESLint, stylelint, prettier, husky
- GitHub Actions
- Docker

Ссылка на приложение - [Netlify](https://cap-bernardito-ya-messenger.netlify.app), [Render.com](https://cap-bernardito-messenger.onrender.com)

![Страница входа](images/app_1.jpg)
![Чат](images/app_2.jpg)
![Панель настроек](images/app_3.jpg)
![Настройки пользователя](images/app_4.jpg)
![Настройки чата](images/app_5.jpg)

## Доступные команды

```bash
// Установка зависимостей
$ npm install

// Запуск проекта в режиме разработки
$ npm run dev

// Сборка проекта в папку `dist`
$ npm run build

// Сборка проекта в папку `dist` и раздача статики из нее с помощью `express`
$ npm run start

// Запуск тестов
$ npm run test
```
