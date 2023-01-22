import { store } from "app/store";

import { chatModel } from "pages/messenger/chat";

import { FormWithChat } from "widgets/form-with-chat";

import { Form, Modal, Overlay, TFormProps } from "entities";

import { mdiAccountPlus, mdiAccountRemove, mdiDeleteSweep, mdiDotsVertical, mdiFileImageOutline } from "@mdi/js";
import { Button, Input, List, ListItem, renderIcon, TInputProps } from "shared/ui";

import { ChatModalHeaderWithChat } from "./entities/chat-modal-header";
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

const deleteUserModalButton = new Button({
  value: `<span class="icon-square icon-square-fiolet">${renderIcon({
    value: mdiAccountRemove,
  })}</span> Удалить пользователя`,
  title: "Удалить пользователя",
  className: "btn-menu",
});

const getchatMenuModalHeader = () => new ChatModalHeaderWithChat({});

const getModalFormParts = (target: any, modalRef: string) => {
  const form = target.refs[modalRef].refs.formRef;

  return Form.getFormParts(form);
};

export const chatMenuModals = function () {
  return [
    new Modal({
      showBackButton: false,
      runButton: chatMenuModalButton,
      overlay: overlay,
      title: "Настройки чата",
      header: getchatMenuModalHeader(),
      ref: "chatMenuModal",
      body: new List({
        items: [addUserModalButton, deleteUserModalButton, chatAvatarModalButton, deleteChatModalButton].map(
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
      header: getchatMenuModalHeader(),
      ref: "chatAvatarModal",
      body: new FormWithChat({
        onSubmit: (event) => {
          event.preventDefault();

          // @ts-ignore
          const formBlock = getModalFormParts(this, "chatAvatarModal").form;
          const form = formBlock.getContent() as HTMLFormElement;
          const formData = new FormData(form);
          const { chatData } = chatModel.selectChat();

          formData.set("chatId", String(chatData?.id));

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
              // value: currentChat.id,
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
      header: getchatMenuModalHeader(),
      ref: "deleteChatModal",
      body: new FormWithChat({
        onSubmit: (event) => {
          event.preventDefault();

          const { chatData } = chatModel.selectChat();

          store.dispatch(chatMenuServices.deleteChat, { chatId: chatData?.id });
        },
        fields: (
          [
            {
              check: false,
              name: "chatId",
              type: "hidden",
              // value: currentChat.id,
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
      header: getchatMenuModalHeader(),
      ref: "addUserModal",
      body: new FormWithChat({
        onSubmit: (event) => {
          event.preventDefault();
          // @ts-ignore
          const { form, fields } = getModalFormParts(this, "addUserModal");
          const { isFormValid, formData } = form.check(event, Object.values(fields));
          const { chatData } = chatModel.selectChat();

          formData.chatId = String(chatData?.id);

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
              // value: currentChat.id,
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

    new Modal({
      showBackButton: true,
      runButton: deleteUserModalButton,
      overlay: overlay,
      title: "Удалить пользователя",
      header: getchatMenuModalHeader(),
      ref: "deleteUserModal",
      body: new FormWithChat({
        onSubmit: (event) => {
          event.preventDefault();
          // @ts-ignore
          const { form, fields } = getModalFormParts(this, "deleteUserModal");
          const { isFormValid, formData } = form.check(event, Object.values(fields));
          const { chatData } = chatModel.selectChat();

          formData.chatId = String(chatData?.id);

          if (isFormValid) {
            store.dispatch(chatMenuServices.deleteUser, formData);
          }
        },
        fields: (
          [
            {
              check: false,
              name: "chatId",
              type: "hidden",
              // value: currentChat.id,
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
                const { fields } = getModalFormParts(this, "deleteUserModal");

                (fields.loginInput as Input).check(event).setValue(event);
              },
              onBlur: (event) => {
                // @ts-ignore
                const { fields } = getModalFormParts(this, "deleteUserModal");

                (fields.loginInput as Input).check(event).setValue(event);
              },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        className: "px-3 pt-3 pb-0",
        button: new Button({ value: "Удалить", title: "Удалить", className: "btn-form-modal" }),
        decorated: false,
      } as TFormProps),
    }),
  ];
};
