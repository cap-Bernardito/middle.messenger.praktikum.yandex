import { TMessageProps } from "shared/ui/message";

export const dateMock = ["Пн", "Вчера", "Сегодня", "10:49", "12:05", "07:59", "03.12.2022"];

export const messagesMock: TMessageProps[] = [
  {
    type: "date",
    date: `19 июня`,
  },
  {
    type: "out",
    text: `Привет.`,
    date: "12:23",
  },
  {
    type: "out",
    text: `Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
    date: "12:23",
  },
  {
    type: "in",
    text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.`,
    date: "11:40",
  },
  {
    type: "in",
    text: `Че скажешь?`,
    date: "11:56",
  },
  {
    type: "out",
    text: `Круто!`,
    date: "12:23",
  },
];