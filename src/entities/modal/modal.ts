import { Overlay } from "entities/overlay";

import { mdiArrowLeft, mdiClose } from "@mdi/js";
import { Block } from "shared/core";
import { Button, renderIcon } from "shared/ui";

import source from "./modal.hbs";

import "./modal.scss";

export type TModalProps = {
  runButton: Button;
  showBackButton?: boolean;
  preBody?: Block | string;
  body?: Block | string;
  postBody?: Block | string;
  header?: Block | string;
  overlay: Overlay;
  className?: string;
  title: string;
};

export class Modal extends Block<TModalProps & { btnClose: Button; backButton: Button }> {
  static cName = "Modal";

  private activeClass = "active";
  private isVisible = false;
  private overlay: Overlay;

  constructor({ runButton, overlay, ...props }: TModalProps) {
    super({
      ...props,
      runButton,
      overlay,
      btnClose: new Button({
        value: `${renderIcon({ value: mdiClose })}`,
        className: "modal__close",
      }),
      backButton: new Button({
        value: `${renderIcon({ value: mdiArrowLeft })}`,
        className: "modal__back",
      }),
    });

    this.overlay = overlay;

    this.overlay.on(this);

    runButton.setProps({
      ...runButton.props,
      events: {
        ...runButton.props.events,
        click: () => this.show(),
      },
    });

    const { btnClose, backButton } = this.childrenFromProps;

    btnClose.setProps({
      ...btnClose.props,
      events: {
        ...btnClose.props.events,
        click: () => this.hide(),
      },
    });

    backButton.setProps({
      ...backButton.props,
      events: {
        ...backButton.props.events,
        click: () => overlay.showPrevWidget(),
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
