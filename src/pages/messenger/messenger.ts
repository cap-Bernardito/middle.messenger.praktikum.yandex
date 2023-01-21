import { authModel } from "processes/auth";

import { store } from "app/store";

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
  TMessagesProps,
  UserCard,
} from "entities";

import { mdiChevronRight, mdiDotsVertical, mdiMenu, mdiPaperclip, mdiSend } from "@mdi/js";
import { Block } from "shared/core";
import { Button, Message, renderIcon, Search, Textarea } from "shared/ui";

import { UserListWithChats } from "./chats/ui";
import { chatsServices } from "./chats";
import { messagesMock } from "./mockData";

const hamburger = new Button({
  value: `${renderIcon({ value: mdiMenu })}`,
  className: "chat-toolbar__button chat-toolbar__button-hamburger",
  title: "Открыть панель настроек",
});

const overlay = new Overlay();

export class MessengerPage extends Block {
  static cName = "MessengerPage";

  constructor() {
    super();

    store.dispatch(chatsServices.getChats);

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

      userList: new UserListWithChats({
        header_link: `<a href="/profile" class="link-icon">Профиль ${renderIcon({ value: mdiChevronRight })}</a>`,
        header_search: new Search({ value: "" }),
        users: null,
      }),

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
    {{{userList}}}
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
