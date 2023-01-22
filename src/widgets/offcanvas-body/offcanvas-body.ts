import { authModel, authServices } from "processes/auth";
import { authTypes } from "processes/auth";

import { store } from "app/store";

import { chatsServices } from "pages/messenger/chats";

import { FormWithChat } from "widgets/form-with-chat";
import { MyAvatar } from "widgets/my-avatar";
import { ProfileEditAvatarForm } from "widgets/profile_edit_avatar-form";
import { ProfileEditInfoForm } from "widgets/profile_edit_info-form";
import { ProfileEditPasswordForm } from "widgets/profile_edit_password-form";

import { Form, Modal, Overlay, SettingsPanel, TFormProps, UserCard } from "entities";

import { mdiAccountCircle, mdiBullhorn, mdiCog, mdiExitToApp, mdiFileImageOutline, mdiShieldAccount } from "@mdi/js";
import { Button, Input, List, ListItem, ListV1, ListV1Item, renderIcon, TInputProps } from "shared/ui";

const overlay = new Overlay();

const modalInfo = new Button({
  value: `<span class="icon-square icon-square-coral">${renderIcon({ value: mdiCog })}</span> Настройки`,
  title: "Настройки",
  className: "btn-menu mb-4",
});

const createChatModalButton = new Button({
  value: `<span class="icon-square icon-square-success">${renderIcon({ value: mdiBullhorn })}</span> Добавить чат`,
  title: "Добавить чат",
  className: "btn-menu mb-4",
});

const changeUserAvatarModalButton = new Button({
  value: `<span class="icon-square icon-square-warning">${renderIcon({
    value: mdiFileImageOutline,
  })}</span> Изменить аватар`,
  title: "Изменить аватар",
  className: "btn-menu",
});

const changeUserInfoModalButton = new Button({
  value: `<span class="icon-square icon-square-coral">${renderIcon({
    value: mdiAccountCircle,
  })}</span> Изменить данные`,
  title: "Изменить данные",
  className: "btn-menu",
});

const changeUserPasswordModalButton = new Button({
  value: `<span class="icon-square icon-square-success">${renderIcon({
    value: mdiShieldAccount,
  })}</span> Изменить пароль`,
  title: "Изменить пароль",
  className: "btn-menu",
});

const UserCardWithAuth = authModel.withAuth(UserCard);
const ListV1ItemWithAuth = authModel.withAuth(ListV1Item);

const getProfileModalHeader = (user: authTypes.User) =>
  new UserCardWithAuth({
    avatar: new MyAvatar({ className: "avatar_md mr-3" }),
    name: () => `<div class='text-lg'>${user.fullName}</div>`,
    message: () => `<ul class="list list-modal-header"><li class="list__item ">@${user.displayName}</li></ul>`,
    className: "not-interactive",
  });

export const offcanvasBodyModals = function (this: { getRefs: () => TRefs }) {
  const { user } = authModel.selectUser();

  if (!user) {
    return [];
  }

  return [
    new Modal({
      showBackButton: true,
      runButton: modalInfo,
      overlay: overlay,
      title: "Настройки",
      header: getProfileModalHeader(user),
      preBody: new ListV1({
        items: [
          {
            name: "Почта",
            value: () => user.email,
          },
          {
            name: "Логин",
            value: () => user.login,
          },
          {
            name: "Имя",
            value: () => user.firstName,
          },
          {
            name: "Фамилия",
            value: () => user.secondName,
          },
          {
            name: "Имя в чате",
            value: () => user.displayName,
          },
          {
            name: "Телефон",
            value: () => user.phone,
          },
        ].map((listItem) => new ListV1ItemWithAuth(listItem)),
      }),
      body: new List({
        items: [changeUserAvatarModalButton, changeUserInfoModalButton, changeUserPasswordModalButton].map(
          (entry) => new ListItem({ body: entry })
        ),
        className: "list-menu",
      }),
    }),
    new Modal({
      showBackButton: true,
      runButton: changeUserAvatarModalButton,
      overlay: overlay,
      title: "Изменить аватар",
      header: getProfileModalHeader(user),
      ref: "changeUserAvatardModal",
      body: ProfileEditAvatarForm.call(this, (refs) => Form.getFormParts(refs.changeUserAvatardModal.refs.formRef), {
        className: "px-3 pt-3 pb-0",
        button: new Button({ value: "Сохранить", title: "Сохранить", className: "btn-form-modal" }),
        decorated: false,
      }),
    }),
    new Modal({
      showBackButton: true,
      runButton: changeUserInfoModalButton,
      overlay: overlay,
      title: "Изменить данные",
      header: getProfileModalHeader(user),
      ref: "changeUserInfoModal",
      body: ProfileEditInfoForm.call(this, (refs) => Form.getFormParts(refs.changeUserInfoModal.refs.formRef), {
        className: "px-3 pt-3 pb-0",
        button: new Button({ value: "Сохранить", title: "Сохранить", className: "btn-form-modal" }),
        decorated: false,
      }),
    }),
    new Modal({
      showBackButton: true,
      runButton: changeUserPasswordModalButton,
      overlay: overlay,
      title: "Изменить пароль",
      header: getProfileModalHeader(user),
      ref: "changeUserPasswordModal",
      body: ProfileEditPasswordForm.call(this, (refs) => Form.getFormParts(refs.changeUserPasswordModal.refs.formRef), {
        className: "px-3 pt-3 pb-0",
        button: new Button({ value: "Сохранить", title: "Сохранить", className: "btn-form-modal" }),
        decorated: false,
      }),
    }),
    new Modal({
      showBackButton: true,
      runButton: createChatModalButton,
      overlay: overlay,
      title: "Добавить чат",
      ref: "createChatModal",
      body: new FormWithChat({
        onSubmit: (event) => {
          // @ts-ignore
          const form = this.refs.createChatModal.childrenFromProps.body as Form;
          const { isFormValid, formData } = form.check(event, Object.values(Form.getFormParts(form).fields));

          if (isFormValid) {
            store.dispatch(chatsServices.createChat, formData);
          }
        },
        fields: (
          [
            {
              label: "Название",
              name: "title",
              required: true,
              ref: "titleInput",
              onInput: (event) => {
                // @ts-ignore
                const form = this.refs.createChatModal.childrenFromProps.body as Form;

                (Form.getFormParts(form).fields.titleInput as Input).check(event).setValue(event);
              },
              onBlur: (event) => {
                // @ts-ignore
                const form = this.refs.createChatModal.childrenFromProps.body as Form;

                (Form.getFormParts(form).fields.titleInput as Input).check(event).setValue(event);
              },
            },
          ] as TInputProps[]
        ).map((inputProps) => new Input(inputProps)),
        className: "px-3 pt-3 pb-0",
        button: new Button({ value: "Сохранить", title: "Сохранить", className: "btn-form-modal" }),
        decorated: false,
      } as TFormProps),
    }),
  ];
};

const logout = new Button({
  value: `<span class="icon-square icon-square-fiolet">${renderIcon({ value: mdiExitToApp })}</span> Выйти`,
  title: "Выйти",
  className: "btn-menu mt-auto",
  htmlType: "button",
  onClick: () => {
    overlay.closeWidgets();
    store.dispatch(authServices.logout);
  },
});

export const offcanvasBody = (user: authTypes.User) =>
  new SettingsPanel({
    userInfo: new UserCardWithAuth({
      avatar: new MyAvatar({ className: "avatar_xs" }),
      name: () => `<span class='text-lg'>${user.fullName}</span>`,
      className: "not-interactive",
    }),
    menu: [createChatModalButton, modalInfo, logout],
    about: "Учебное приложение для обмена сообщениями",
  });
