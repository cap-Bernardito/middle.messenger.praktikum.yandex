import { Overlay } from "entities/overlay";

import { mdiClose } from "@mdi/js";
import { Block } from "shared/core";
import { Button, renderIcon } from "shared/ui";

import source from "./modal.hbs";

import "./modal.scss";

export type TModalProps = {
  control: Button;
  preBody?: Block | string;
  body?: Block | string;
  postBody?: Block | string;
  header?: Block | string;
  overlay: Overlay;
  className?: string;
  title: string;
};

export class Modal extends Block<TModalProps & { btnClose: Button }> {
  static cName = "Modal";

  private activeClass = "active";
  private isVisible = false;
  private overlay: Overlay;

  constructor({ control, overlay, ...props }: TModalProps) {
    super({
      ...props,
      control,
      overlay,
      btnClose: new Button({
        value: `${renderIcon({ value: mdiClose })}`,
        className: "modal__close",
      }),
    });

    this.overlay = overlay;

    this.overlay.on(this);

    control.setProps({
      ...control.props,
      events: {
        ...control.props.events,
        click: () => this.show(),
      },
    });

    const { btnClose } = this.childrenFromProps;

    btnClose.setProps({
      ...btnClose.props,
      events: {
        ...btnClose.props.events,
        click: () => this.hide(),
      },
    });
  }

  isOn() {
    return this.isVisible;
  }

  show() {
    this.getContent().classList.add(this.activeClass);
    this.isVisible = true;
    this.overlay.notify(Overlay.commands.show, this);
  }

  hide() {
    this.getContent().classList.remove(this.activeClass);
    this.isVisible = false;
    this.overlay.notify(Overlay.commands.hide, this);
  }

  render() {
    return source;
  }
}
