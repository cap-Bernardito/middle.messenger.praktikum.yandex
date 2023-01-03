import { Modal, Overlay, UserCard } from "entities";
import { SettingsPanel } from "entities/settings-panel";

import { mdiCog } from "@mdi/js";
import img from "shared/assets/images/tigger.jpg";
import { Avatar, Button, renderIcon } from "shared/ui";

const overlay = new Overlay();

const modalInfo = new Button({
  value: `<span class="icon-square icon-square-coral">${renderIcon({ value: mdiCog })}</span> Настройки`,
  className: "btn-link",
});

export const offcanvasBodyModals = [
  new Modal({
    control: modalInfo,
    body: "body modal",
    overlay: overlay,
    title: "Настройки",
  }),
];

export const offcanvasBody = new SettingsPanel({
  userInfo: new UserCard({
    avatar: new Avatar({ className: "avatar_xs", img: img }),
    name: "<span class='text-lg'>Вася Василёк</span>",
    className: "not-interactive",
  }),
  menu: [modalInfo],
  about: "Учебное приложение для обмена сообщениями",
});
