import { renderMessages } from "entities/messages";
import { renderMessagesBody } from "entities/messages-body";
import { renderMessagesFooter } from "entities/messages-footer";
import { renderMessagesHeader } from "entities/messages-header";
import { renderUserCard } from "entities/user-card";
import { renderUserList } from "entities/user-list";

import { mdiArrowRightCircle, mdiChevronRight, mdiDotsVertical, mdiPaperclip } from "@mdi/js";
import img from "shared/assets/images/tigger.jpg";
import { renderAvatar } from "shared/ui/avatar";
import { renderIcon } from "shared/ui/icon";
import { renderLayoutFullScreen } from "shared/ui/layouts/full-screen";
import { renderMessage, TMessageProps } from "shared/ui/message";
import { renderSearch } from "shared/ui/search";
import { renderTextarea } from "shared/ui/textarea";
import { _ } from "shared/utils/utils";

const dateMock = ["Пн", "Вчера", "Сегодня", "10:49", "12:05", "07:59", "03.12.2022"];
const messagesMock: TMessageProps[] = [
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

const users = _.range(14)
  .map((i, index) =>
    renderUserCard({
      avatar: renderAvatar({ className: "avatar_sm", img: index % 3 === 0 ? "" : img }),
      name: "Алексей",
      message: "Привет май френдз",
      date: dateMock[index] || `${index}.12.2022`,
      counter: index > 0 ? String(index) : undefined,
      className: index === 3 ? "active" : undefined,
    })
  )
  .join("");

const userList = renderUserList({
  header_link: `<a href="/profile" class="link-icon">Профиль ${renderIcon({ value: mdiChevronRight })}</a>`,
  header_search: renderSearch(),
  body: users,
});

const messagesHeader = renderMessagesHeader({
  left: renderUserCard({
    avatar: renderAvatar({ className: "avatar_xs", img: img }),
    name: "<span class='text-base'>Алексей</span>",
    message: undefined,
    date: undefined,
    counter: undefined,
    className: "not-interactive",
  }),
  right: `<a href="#" class="link-icon">${renderIcon({ value: mdiDotsVertical })}</a>`,
});

const messagesFooter = renderMessagesFooter({
  left: `<a href="#" class="link-icon link-icon-clip">${renderIcon({ value: mdiPaperclip })}</a>`,
  middle: renderTextarea({
    name: "message",
    placeholder: "Сообщение",
  }),
  right: `<a href="#" class="link-icon link-icon-submit">${renderIcon({ value: mdiArrowRightCircle })}</a>`,
});

const messagesBody = renderMessagesBody({
  messages: messagesMock
    .map((m) => renderMessage(m))
    .concat(messagesMock.map((m) => renderMessage(m)))
    .concat(messagesMock.map((m) => renderMessage(m))),
});

const messages = renderMessages({
  header: messagesHeader,
  body: messagesBody,
  footer: messagesFooter,
});

const html = renderLayoutFullScreen({ secondary: userList, primary: messages });

export { html as chatPage };
