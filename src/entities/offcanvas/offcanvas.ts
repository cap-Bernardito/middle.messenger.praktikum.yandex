import { Overlay } from "entities/overlay";

import { Block } from "shared/core";
import { Button } from "shared/ui";

import source from "./offcanvas.hbs";

import "./offcanvas.scss";

export type TOffcanvasProps = {
  control: Button;
  body?: Block | string;
  overlay: Overlay;
  className?: string;
};

export class Offcanvas extends Block<TOffcanvasProps> {
  static cName = "Offcanvas";

  private activeClass = "active";
  private isVisible = false;
  private overlay: Overlay;

  constructor({ control, overlay, ...props }: TOffcanvasProps) {
    super({
      ...props,
      control,
      overlay,
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
