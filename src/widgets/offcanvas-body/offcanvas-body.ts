import { ProfileEditAvatarForm } from "widgets/profile_edit_avatar-form";
import { ProfileEditInfoForm } from "widgets/profile_edit_info-form";
import { ProfileEditPasswordForm } from "widgets/profile_edit_password-form";

import { Form, Modal, Overlay, SettingsPanel, UserCard } from "entities";

import { mdiAccountCircle, mdiCog, mdiFileImageOutline, mdiShieldAccount } from "@mdi/js";
import img from "shared/assets/images/tigger.jpg";
import { Avatar, Button, List, ListItem, ListV1, ListV1Item, renderIcon } from "shared/ui";

const overlay = new Overlay();

const modalInfo = new Button({
  value: `<span class="icon-square icon-square-coral">${renderIcon({ value: mdiCog })}</span> Настройки`,
  title: "Настройки",
  className: "btn-menu",
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

const getProfileModalHeader = () =>
  new UserCard({
    avatar: new Avatar({ className: "avatar_md mr-3", img: img }),
    name: "<div class='text-lg'>Вася Василёк</div>",
    message: new List({
      items: ["<span class='text-sm'>@BuHHeTy</span>"].map((entry) => new ListItem({ body: entry })),
      className: "list-modal-header",
    }),
    className: "not-interactive",
  });

export const offcanvasBodyModals = function (this: { getRefs: () => TRefs }) {
  return [
    new Modal({
      showBackButton: true,
      runButton: modalInfo,
      overlay: overlay,
      title: "Настройки",
      header: getProfileModalHeader(),
      preBody: new ListV1({
        items: [
          {
            name: "Почта",
            value: "pochta@yandex.ru",
          },
          {
            name: "Логин",
            value: "vasya_vasilek",
          },
          {
            name: "Имя",
            value: "Вася",
          },
          {
            name: "Фамилия",
            value: "Василёк",
          },
          {
            name: "Имя в чате",
            value: "Вася Василёк",
          },
          {
            name: "Телефон",
            value: "+7 (909) 967 30 30",
          },
        ].map((listItem) => new ListV1Item(listItem)),
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
      header: getProfileModalHeader(),
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
      header: getProfileModalHeader(),
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
      header: getProfileModalHeader(),
      ref: "changeUserPasswordModal",
      body: ProfileEditPasswordForm.call(this, (refs) => Form.getFormParts(refs.changeUserPasswordModal.refs.formRef), {
        className: "px-3 pt-3 pb-0",
        button: new Button({ value: "Сохранить", title: "Сохранить", className: "btn-form-modal" }),
        decorated: false,
      }),
    }),
  ];
};

export const offcanvasBody = new SettingsPanel({
  userInfo: new UserCard({
    avatar: new Avatar({ className: "avatar_xs", img: img }),
    name: "<span class='text-lg'>Вася Василёк</span>",
    className: "not-interactive",
  }),
  menu: [modalInfo],
  about: "Учебное приложение для обмена сообщениями",
});
