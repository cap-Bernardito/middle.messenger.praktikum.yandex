import { authModel } from "processes/auth";

import { MyAvatar } from "widgets/my-avatar";
import { offcanvasBody, offcanvasBodyModals } from "widgets/offcanvas-body";

import {
  ChatToolbar,
  Form,
  MessagesBody,
  MessagesFooter,
  MessagesHeader,
  Offcanvas,
  Overlay,
  templateMessages,
  templateUserList,
  TMessagesProps,
  TUserListProps,
  UserCard,
} from "entities";

import { mdiChevronRight, mdiDotsVertical, mdiMenu, mdiPaperclip, mdiSend } from "@mdi/js";
import img from "shared/assets/images/tigger.jpg";
import { Block } from "shared/core";
import { Avatar, Button, Message, renderIcon, Search, Textarea } from "shared/ui";
import { _ } from "shared/utils";

import { dateMock, messagesMock } from "./mockData";

const hamburger = new Button({
  value: `${renderIcon({ value: mdiMenu })}`,
  className: "chat-toolbar__button chat-toolbar__button-hamburger",
  title: "Открыть панель настроек",
});

const overlay = new Overlay();

export class ChatPage extends Block {
  static cName = "ChatPage";

  constructor() {
    super();

    const { user } = authModel.selectUser();

    if (!user) {
      return;
    }

    this.setProps({
      overlay,

      chatToolbar: new ChatToolbar({
        controls: [hamburger],
      }),

      offcanvas: new Offcanvas({
        control: hamburger,
        body: offcanvasBody(user),
        overlay: overlay,
      }),

      modals: offcanvasBodyModals.call(this),

      ...({
        header_link: `<a href="/profile" class="link-icon">Профиль ${renderIcon({ value: mdiChevronRight })}</a>`,
        header_search: new Search({ value: "" }),
        users: _.range(10).map(
          (index) =>
            new UserCard({
              avatar: new Avatar({ className: "avatar_sm", img: index % 3 === 0 ? "" : img }),
              name: "Вася Василёк",
              message: "Привет май френдз. Привет! Смотри, тут всплыл",
              date: dateMock[index] || `${index}.12.2022`,
              counter: index > 0 ? String(index) : undefined,
              className: index === 2 ? "active" : undefined,
            })
        ),
      } as TUserListProps),

      ...({
        placeholder: "Выберите, кому хотели бы написать",
        header: new MessagesHeader({
          left: new UserCard({
            avatar: new MyAvatar({ className: "avatar_xs" }),
            name: "<span class='text-base'>Вася</span>",
            message: "<span class='text-base text-gray-500'>был(а) 33 минуты назад</span>",
            className: "not-interactive",
          }),
          right: `<a href="#" title="Открыть меню" class="link-icon">${renderIcon({ value: mdiDotsVertical })}</a>`,
        }),
        body: new MessagesBody({
          messages: messagesMock.map((m) => new Message(m)),
          // .concat(messagesMock.map((m) => new Message(m)))
          // .concat(messagesMock.map((m) => new Message(m))),
        }),
        footer: new MessagesFooter({
          ref: "formRef",
          onSubmit: (event) => {
            const { isFormValid, formData } = this.getForm().form.check(event, Object.values(this.getForm().fields));

            console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
          },
          file: `<a href="#" title="Приложить файл" class="link-icon link-icon-clip">${renderIcon({
            value: mdiPaperclip,
          })}</a>`,
          text: new Textarea({
            name: "message",
            placeholder: "Написать собщение...",
            ref: "messageInput",
            onBlur: (event) => {
              (this.getForm().fields.messageInput as Textarea).check(event).setValue(event);
            },
          }),
          button: new Button({
            value: `${renderIcon({ value: mdiSend })}`,
            className: "link-icon link-icon-submit",
            title: "Отправить",
          }),
        }),
      } as TMessagesProps),
    });
  }

  getForm = () => Form.getFormParts(this.refs.formRef, MessagesFooter.isForm);

  getRefs = () => this.refs;

  render() {
    return `
{{#LayoutFullScreen}}
  {{#LayoutFullScreenToolbar}}
    {{{chatToolbar}}}
  {{/LayoutFullScreenToolbar}}

  {{#LayoutFullScreenAside}}
    ${templateUserList}
  {{/LayoutFullScreenAside}}

  {{#LayoutFullScreenMain}}
    ${templateMessages}
  {{/LayoutFullScreenMain}}

  {{{overlay}}}
  {{{offcanvas}}}

  {{#each modals}}
    {{{this}}}
  {{/each}}
{{/LayoutFullScreen}}
    `;
  }
}
