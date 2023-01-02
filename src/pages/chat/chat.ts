import {
  ChatToolbar,
  Form,
  MessagesBody,
  MessagesFooter,
  MessagesHeader,
  Modal,
  Offcanvas,
  Overlay,
  templateMessages,
  templateUserList,
  TMessagesProps,
  TUserListProps,
  UserCard,
} from "entities";

import { mdiChevronRight, mdiClose, mdiDotsVertical, mdiMenu, mdiPaperclip, mdiSend } from "@mdi/js";
import img from "shared/assets/images/tigger.jpg";
import { Block } from "shared/core";
import { Avatar, Button, Message, renderIcon, Search, Textarea } from "shared/ui";
import { _ } from "shared/utils/utils";

import { dateMock, messagesMock } from "./mockData";

const hamburger = new Button({
  value: `${renderIcon({ value: mdiMenu })}`,
  className: "chat-toolbar__button chat-toolbar__button-hamburger",
});

const modal = new Button({
  value: `Настройки пользователя`,
  className: "btn-link",
});

const overlay = new Overlay();

export class ChatPage extends Block {
  static cName = "ChatPage";

  constructor() {
    super({
      overlay,

      chatToolbar: new ChatToolbar({
        controls: [hamburger, modal],
      }),

      offcanvas: new Offcanvas({
        control: hamburger,
        body: modal,
        overlay: overlay,
      }),

      modal: new Modal({
        control: modal,
        body: "body modal",
        overlay: overlay,
        title: "Настройки",
        btnClose: new Button({
          value: `${renderIcon({ value: mdiClose })}`,
          className: "modal__close",
        }),
      }),

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
        header: new MessagesHeader({
          left: new UserCard({
            avatar: new Avatar({ className: "avatar_xs", img: img }),
            name: "<span class='text-base'>Алексей</span>",
            message: "<span class='text-base text-gray-500'>был(а) 33 минуты назад</span>",
            className: "not-interactive",
          }),
          right: `<a href="#" class="link-icon">${renderIcon({ value: mdiDotsVertical })}</a>`,
        }),
        body: new MessagesBody({
          messages: messagesMock
            .map((m) => new Message(m))
            .concat(messagesMock.map((m) => new Message(m)))
            .concat(messagesMock.map((m) => new Message(m))),
        }),
        footer: new MessagesFooter({
          ref: "formRef",
          onSubmit: (event) => {
            const { isFormValid, formData } = (this.getForm().form as Form).check(
              event,
              Object.values(this.getForm().fields)
            );

            console.log(`Form is${isFormValid ? "" : " not"} valid. FormData: `, formData);
          },
          file: `<a href="#" class="link-icon link-icon-clip">${renderIcon({ value: mdiPaperclip })}</a>`,
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
          }),
        }),
      } as TMessagesProps),
    });
  }

  getForm = () => {
    const form = this.refs.formRef || {};

    return {
      form: form,
      fields: form.refs,
    };
  };

  render() {
    return `
{{#LayoutFullScreen}}
  {{{overlay}}}
  {{{offcanvas}}}
  {{{modal}}}

  {{#LayoutFullScreenToolbar}}
    {{{chatToolbar}}}
  {{/LayoutFullScreenToolbar}}

  {{#LayoutFullScreenAside}}
    ${templateUserList}
  {{/LayoutFullScreenAside}}

  {{#LayoutFullScreenMain}}
    ${templateMessages}
  {{/LayoutFullScreenMain}}

{{/LayoutFullScreen}}
    `;
  }
}
