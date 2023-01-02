import { Block } from "shared/core";
import { TButtonProps } from "shared/ui";

import source from "./offcanvas.hbs";

import "./offcanvas.scss";

export type TOffcanvas = TPropsWithEvents<{
  control: Block<TButtonProps>;
  body?: Block | string;
  className?: string;
}>;

export class Offcanvas extends Block<TOffcanvas> {
  static cName = "Offcanvas";

  #activeClass = "active";

  constructor({ control, ...props }: TOffcanvas) {
    super({
      ...props,
      control,
      events: {
        click: (event) => {
          if ((event.target as HTMLDivElement).hasAttribute("data-canvas")) {
            this.hide();
          }
        },
      },
    });

    control.setProps({
      ...control.props,
      events: {
        ...control.props.events,
        click: () => this.show(),
      },
    });
  }

  show() {
    this.getContent().classList.add(this.#activeClass);
  }

  hide() {
    this.getContent().classList.remove(this.#activeClass);
  }

  render() {
    return source;
  }
}
