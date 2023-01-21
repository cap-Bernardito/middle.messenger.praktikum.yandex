import { authModel } from "processes/auth";

import { store } from "app/store";

import { offcanvasBody, offcanvasBodyModals } from "widgets/offcanvas-body";

import { ChatToolbar, Form, MessagesFooter, Offcanvas, Overlay, TMessagesProps } from "entities";

import { mdiChevronRight, mdiMenu, mdiPaperclip, mdiSend } from "@mdi/js";
import { Block } from "shared/core";
import { Button, renderIcon, Search, Textarea } from "shared/ui";

import { MessagesWithChat } from "./chat/ui";
import { UserListWithChats } from "./chats/ui";
import { chatsServices } from "./chats";

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

      messages: new MessagesWithChat({
        ref: "messagesRef",
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

  getForm = () => Form.getFormParts(this.refs.messagesRef.childrenFromProps.footer, MessagesFooter.isForm);

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
    {{{messages}}}
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
