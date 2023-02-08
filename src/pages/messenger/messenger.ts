import { authModel } from "processes/auth";

import { store } from "app/store";

import { chatLib } from "pages/messenger/chat/model/lib";
import { chatServices } from "pages/messenger/chat/services";
import { chatUi } from "pages/messenger/chat/ui";
import { chatsServices } from "pages/messenger/chats/services";
import { chatsTypes } from "pages/messenger/chats/types";
import { chatsUi } from "pages/messenger/chats/ui";

import { chatMenuUi } from "widgets/chat-menu/ui";
import { offcanvasBody, offcanvasBodyModals } from "widgets/offcanvas-body";

import { ChatToolbar, Form, MessagesFooter, Offcanvas, Overlay, TMessagesProps } from "entities";

import { mdiChevronRight, mdiMenu, mdiPaperclip, mdiSend } from "@mdi/js";
import { Block } from "shared/core/block";
import { router } from "shared/core/router/router";
import { Button, renderIcon, Search, Textarea } from "shared/ui";

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

    const { chatId } = router.getParams();
    const { user } = authModel.selectUser();

    store.dispatch(chatsServices.getChats, {
      chatId,
      success: (chats: chatsTypes.TChat[]) => {
        chats.forEach((chat) => {
          store.dispatch(chatServices.loadMessages, { chatId: chat.id });
        });
      },
    });

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
        body: offcanvasBody(),
        overlay: overlay,
      }),

      modals: offcanvasBodyModals.call(this),

      chatMenuModals: chatMenuUi.chatMenuModals.call(this),

      userList: new chatsUi.UserListWithChats({
        header_link: `<a href="/profile" class="link-icon">Профиль ${renderIcon({ value: mdiChevronRight })}</a>`,
        header_search: new Search({ value: "" }),
        users: null,
      }),

      messages: new chatUi.MessagesWithChat({
        ref: "messagesRef",
        footer: new MessagesFooter({
          ref: "formRef",
          onSubmit: (event) => {
            const { isFormValid, formData } = this.getForm().form.check(event, Object.values(this.getForm().fields));
            const { chatData } = chatLib.selectChat();

            if (isFormValid && chatData) {
              store.dispatch(chatServices.sendMessage, {
                chatId: chatData.id,
                message: formData.message,
              });

              (this.getForm().fields.messageInput.refs.inputRef.getContent() as HTMLTextAreaElement).value = "";
            }
          },
          onKeydown: (event) => {
            if (event.key === "Enter") {
              const { isFormValid, formData } = this.getForm().form.check(event, Object.values(this.getForm().fields));
              const { chatData } = chatLib.selectChat();

              if (isFormValid && chatData) {
                store.dispatch(chatServices.sendMessage, {
                  chatId: chatData.id,
                  message: formData.message,
                });

                (this.getForm().fields.messageInput.refs.inputRef.getContent() as HTMLTextAreaElement).value = "";
              }
            }
          },
          file: new Button({
            title: "Приложить файл",
            value: renderIcon({ value: mdiPaperclip }),
            className: "link-icon link-icon-clip",
            htmlType: "button",
            onClick(event) {
              event.preventDefault();
            },
          }),
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
  {{#each chatMenuModals}}
    {{{this}}}
  {{/each}}
{{/LayoutFullScreen}}
    `;
  }
}
