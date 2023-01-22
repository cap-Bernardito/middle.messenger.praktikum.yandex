import { chatsModel, chatsTypes } from "pages/messenger/chats";

import { Form, Modal, Overlay, UserCard } from "entities";

import { mdiDotsVertical } from "@mdi/js";
import { getFile } from "shared/api";
import { Avatar, Button, Input, renderIcon, TInputProps } from "shared/ui";

const overlay = new Overlay();

export const chatMenuModalButton = new Button({
  value: `${renderIcon({ value: mdiDotsVertical })}`,
  className: "chat-toolbar__button chat-toolbar__button-hamburger link-icon",
  title: "Настройки чата",
});

const UserCardWithAuth = chatsModel.withChats(UserCard);

const getchatMenuModalHeader = (chat: chatsTypes.TChat) =>
  new UserCardWithAuth({
    avatar: new Avatar({ className: "avatar_xs mr-3", img: getFile(chat.avatar) }),
    name: () => `<div class='text-lg'>${chat.title}</div>`,
    className: "not-interactive",
  });

const getModalFormParts = (target: any, modalRef: string) => {
  const form = target.extractedExecutableProps.header.refs[modalRef].refs.formRef;

  return Form.getFormParts(form);
};

export const chatMenuModals = function (currentChat: chatsTypes.TChat) {
  return [
    new Modal({
      showBackButton: false,
      runButton: chatMenuModalButton,
      overlay: overlay,
      title: "Настройки чата",
      header: getchatMenuModalHeader(currentChat),
      ref: "chatMenuModal",
      body: new Form({
        // onSubmit: (event) => {
        //   event.preventDefault();
        //   // @ts-ignore
        //   const {form, fields} = getModalFormParts(this, "chatMenuModal");

        //   const { isFormValid, formData } = form.check(event, Object.values(fields));

        //   if (isFormValid) {
        //     store.dispatch(chatsServices.createChat, formData);
        //   }
        // },
        fields: (
          [
            {
              label: "MockInput",
              name: "mock",
              required: true,
              ref: "mockInput",
              // onInput: (event) => {
              //   // @ts-ignore
              //   const { fields} = getModalFormParts(this, "chatMenuModal");

              //   (fields.titleInput as Input).check(event).setValue(event);
              // },
              // onBlur: (event) => {
              //   // @ts-ignore
              //   const { fields} = getModalFormParts(this, "chatMenuModal");

              //   (fields.titleInput as Input).check(event).setValue(event);
              // },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        className: "px-3 pt-3 pb-0",
        button: new Button({ value: "Сохранить", title: "Сохранить", className: "btn-form-modal" }),
        decorated: false,
      }),
    }),
  ];
};
