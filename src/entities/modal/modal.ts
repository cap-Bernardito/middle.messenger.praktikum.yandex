import { Overlay } from "entities/overlay";

import { Block } from "shared/core";
import { Button } from "shared/ui";

import source from "./modal.hbs";

import "./modal.scss";

export type TModalProps = {
  control: Button;
  btnClose: Button;
  body?: Block | string;
  overlay: Overlay;
  className?: string;
  title: string;
};

export class Modal extends Block<TModalProps> {
  static cName = "Modal";

  private activeClass = "active";
  private isVisible = false;
  private overlay: Overlay;

  constructor({ control, overlay, btnClose, ...props }: TModalProps) {
    super({
      ...props,
      control,
      overlay,
      btnClose,
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
