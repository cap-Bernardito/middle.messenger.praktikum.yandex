import { store } from "app/store";

import { chatsModel, chatsTypes } from "pages/messenger/chats";

import { FormWithChat } from "widgets/form-with-chat";

import { Form, Modal, Overlay, TFormProps, UserCard } from "entities";

import { mdiAccountPlus, mdiDeleteSweep, mdiDotsVertical, mdiFileImageOutline } from "@mdi/js";
import { getFile } from "shared/api";
import { Avatar, Button, Input, List, ListItem, renderIcon, TInputProps } from "shared/ui";

import { chatMenuServices } from ".";

const overlay = new Overlay();

export const chatMenuModalButton = new Button({
  value: `${renderIcon({ value: mdiDotsVertical })}`,
  className: "chat-toolbar__button chat-toolbar__button-hamburger link-icon",
  title: "Настройки чата",
});

const chatAvatarModalButton = new Button({
  value: `<span class="icon-square icon-square-warning">${renderIcon({
    value: mdiFileImageOutline,
  })}</span> Изменить аватар`,
  title: "Изменить аватар",
  className: "btn-menu",
});

const deleteChatModalButton = new Button({
  value: `<span class="icon-square icon-square-danger">${renderIcon({
    value: mdiDeleteSweep,
  })}</span> Удалить чат`,
  title: "Удалить чат",
  className: "btn-menu",
});

const addUserModalButton = new Button({
  value: `<span class="icon-square icon-square-success">${renderIcon({
    value: mdiAccountPlus,
  })}</span> Пригласить пользователя`,
  title: "Пригласить пользователя",
  className: "btn-menu",
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
      body: new List({
        items: [addUserModalButton, chatAvatarModalButton, deleteChatModalButton].map(
          (entry) => new ListItem({ body: entry })
        ),
        className: "list-menu",
      }),
    }),
    new Modal({
      showBackButton: true,
      runButton: chatAvatarModalButton,
      overlay: overlay,
      title: "Изменить аватар",
      header: getchatMenuModalHeader(currentChat),
      ref: "chatAvatarModal",
      body: new FormWithChat({
        onSubmit: (event) => {
          event.preventDefault();

          // @ts-ignore
          const form = getModalFormParts(this, "chatAvatarModal").form.getContent() as HTMLFormElement;
          const formData = new FormData(form);

          // @ts-ignore
          if (Number(formData.get("avatar")?.size) > 0) {
            form.reset();
            store.dispatch(chatMenuServices.chatEditAvatar, formData);
          }
        },
        fields: (
          [
            {
              name: "chatId",
              type: "hidden",
              value: currentChat.id,
              className: "form-control_file",
              required: true,
              ref: "chatIdInput",
            },
            {
              label: "Выбрать файл на компьютере",
              placeholder: "Выбрать файл на компьютере",
              name: "avatar",
              type: "file",
              accept: "image/*",
              className: "form-control_file",
              required: true,
              ref: "fileInput",
              onBlur: (event) => {
                // @ts-ignore
                const { fields } = getModalFormParts(this, "chatAvatarModal");

                (fields.fileInput as Input).setValue(event);
              },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        className: "px-3 pt-3 pb-0",
        button: new Button({ value: "Сохранить", title: "Сохранить", className: "btn-form-modal" }),
        decorated: false,
      } as TFormProps),
    }),

    new Modal({
      showBackButton: true,
      runButton: deleteChatModalButton,
      overlay: overlay,
      title: "Удалить чат",
      header: getchatMenuModalHeader(currentChat),
      ref: "deleteChatModal",
      body: new FormWithChat({
        onSubmit: (event) => {
          event.preventDefault();
          // @ts-ignore
          const { form, fields } = getModalFormParts(this, "deleteChatModal");

          const { isFormValid, formData } = form.check(event, Object.values(fields));

          if (isFormValid) {
            store.dispatch(chatMenuServices.deleteChat, formData);
          }
        },
        fields: (
          [
            {
              check: false,
              name: "chatId",
              type: "hidden",
              value: currentChat.id,
              required: true,
              ref: "chatIdInput",
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        className: "px-3 pt-3 pb-0",
        button: new Button({ value: "Удалить чат", title: "Удалить чат", className: "btn-form-modal" }),
        decorated: false,
      } as TFormProps),
    }),

    new Modal({
      showBackButton: true,
      runButton: addUserModalButton,
      overlay: overlay,
      title: "Пригласить пользователя",
      header: getchatMenuModalHeader(currentChat),
      ref: "addUserModal",
      body: new FormWithChat({
        onSubmit: (event) => {
          event.preventDefault();
          // @ts-ignore
          const { form, fields } = getModalFormParts(this, "addUserModal");

          const { isFormValid, formData } = form.check(event, Object.values(fields));

          if (isFormValid) {
            store.dispatch(chatMenuServices.addUser, formData);
          }
        },
        fields: (
          [
            {
              check: false,
              name: "chatId",
              type: "hidden",
              value: currentChat.id,
              required: true,
              ref: "chatIdInput",
            },
            {
              label: "Имя пользователя",
              name: "login",
              required: true,
              ref: "loginInput",
              onInput: (event) => {
                // @ts-ignore
                const { fields } = getModalFormParts(this, "addUserModal");

                (fields.loginInput as Input).check(event).setValue(event);
              },
              onBlur: (event) => {
                // @ts-ignore
                const { fields } = getModalFormParts(this, "addUserModal");

                (fields.loginInput as Input).check(event).setValue(event);
              },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        className: "px-3 pt-3 pb-0",
        button: new Button({ value: "Пригласить", title: "Пригласить", className: "btn-form-modal" }),
        decorated: false,
      } as TFormProps),
    }),
  ];
};
