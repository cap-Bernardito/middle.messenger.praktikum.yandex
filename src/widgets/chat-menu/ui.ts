import { store } from "app/store";

import { chatLib } from "pages/messenger/chat/model/lib";

import { FormWithChatLoadStatus } from "widgets/form-with-chat";
import { ListWithSearchUsers } from "widgets/list-with-search-users";
import { searchUsersServices } from "widgets/list-with-search-users/services";
import { ListWithUsers } from "widgets/list-with-users";

import { Form, Modal, Overlay, TFormProps, UserItemV1, UserItemV2 } from "entities";

import { mdiAccountMultiple, mdiAccountPlus, mdiDeleteSweep, mdiDotsVertical, mdiFileImageOutline } from "@mdi/js";
import { Block } from "shared/core";
import { Button, Input, List, ListItem, renderIcon, TInputProps } from "shared/ui";
import { debounce } from "shared/utils/utils";

import { ChatModalHeaderWithChat } from "./entities/chat-modal-header";
import { chatMenuServices } from "./services";

const overlay = new Overlay();

const chatMenuModalButton = new Button({
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

const usersModalButton = new Button({
  value: `<span class="icon-square icon-square-blue">${renderIcon({
    value: mdiAccountMultiple,
  })}</span> Подписчики`,
  title: "Подписчики",
  className: "btn-menu",
});

const getchatMenuModalHeader = () => new ChatModalHeaderWithChat({});

const getModalFormParts = (target: Block, modalRef: string) => {
  const form = target.refs[modalRef].refs.formRef;

  return Form.getFormParts(form);
};

const chatMenuModals = function () {
  return [
    new Modal({
      showBackButton: false,
      runButton: chatMenuModalButton,
      overlay: overlay,
      title: "Настройки чата",
      header: getchatMenuModalHeader(),
      ref: "chatMenuModal",
      preBody: new List({
        items: [usersModalButton, addUserModalButton].map((entry) => new ListItem({ body: entry })),
        className: "list-menu",
      }),
      body: new List({
        items: [chatAvatarModalButton, deleteChatModalButton].map((entry) => new ListItem({ body: entry })),
        className: "list-menu",
      }),
    }),

    new Modal({
      showBackButton: true,
      runButton: usersModalButton,
      overlay: overlay,
      title: "Подписчики",
      header: getchatMenuModalHeader(),
      ref: "usersMenuModal",
      body: new ListWithUsers({
        itemTemplate: UserItemV1,
        itemPropsMap: {
          avatar: "avatar",
          firstName: "first_name",
          secondName: "second_name",
          displayName: "display_name",
          id: "id",
          role: "role",
        },
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
      body: new FormWithChatLoadStatus({
        onSubmit: (event) => {
          event.preventDefault();

          // @ts-ignore
          const formBlock = getModalFormParts(this, "chatAvatarModal").form;
          const form = formBlock.getContent() as HTMLFormElement;
          const formData = new FormData(form);
          const { chatData } = chatLib.selectChat();

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
      body: new FormWithChatLoadStatus({
        onSubmit: (event) => {
          event.preventDefault();

          const { chatData } = chatLib.selectChat();

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
      body: new ListWithSearchUsers({
        itemTemplate: UserItemV2,
        itemPropsMap: {
          avatar: "avatar",
          firstName: "first_name",
          secondName: "second_name",
          displayName: "display_name",
          id: "id",
          role: "role",
        },
        className: "list-menu",
      }),
      preBody: new Form({
        onSubmit: (event) => {
          event.preventDefault();
        },
        fields: (
          [
            {
              label: "Имя пользователя",
              name: "login",
              required: true,
              ref: "loginInput",
              onInput: debounce(async (event) => {
                // @ts-ignore
                const { fields } = getModalFormParts(this, "addUserModal");

                (fields.loginInput as Input).check(event).setValue(event);

                const value = (event.target as HTMLInputElement).value;

                if (value.length < 3) {
                  store.dispatch(searchUsersServices.resetSearchUsers);

                  return;
                }

                store.dispatch(searchUsersServices.searchUsers, { login: value });
              }, 700),
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        className: "px-3 pt-3 pb-0",
        decorated: false,
      } as TFormProps),
    }),
  ];
};

export const chatMenuUi = { chatMenuModalButton, chatMenuModals };
