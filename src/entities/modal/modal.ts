import { Overlay } from "entities/overlay";

import { mdiArrowLeft, mdiClose } from "@mdi/js";
import { Block } from "shared/core/block";
import { Router, router } from "shared/core/router/router";
import { Button, renderIcon } from "shared/ui";

import source from "./modal.hbs";

import "./modal.scss";

export type TModalProps = TPropsWithRef<{
  runButton: Button;
  showBackButton?: boolean;
  preBody?: Block | string;
  body?: Block | string;
  postBody?: Block | string;
  header?: Block | string;
  overlay: Overlay;
  className?: string;
  title: string;
}>;

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
        title: "Закрыть",
      }),
      backButton: new Button({
        value: `${renderIcon({ value: mdiArrowLeft })}`,
        className: "modal__back",
        title: "Назад",
      }),
    });

    this.overlay = overlay;

    this.overlay.on(this);

    runButton.setProps({
      events: {
        click: () => this.show(),
      },
    });

    const { btnClose, backButton } = this.childrenFromProps;

    btnClose.setProps({
      events: {
        click: () => this.hide(),
      },
    });

    backButton.setProps({
      events: {
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

    router.emit(Router.EVENTS.WIDGET_TOGGLE);
  }

  render() {
    return source;
  }
}
