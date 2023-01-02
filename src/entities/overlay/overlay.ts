import { Modal, Offcanvas } from "entities";

import { Block } from "shared/core";

import "./overlay.scss";

export type TWidgetsWithOverlay = Offcanvas | Modal;

export type TOverlayProps = TPropsWithEvents<{
  className?: string;
}>;

export class Overlay extends Block<TOverlayProps> {
  static cName = "Overlay";
  static commands = {
    show: "show",
    hide: "hide",
  } as const;

  private activeClass = "active";
  private widgets = new Set<TWidgetsWithOverlay>();

  constructor({ ...props }: TOverlayProps = {}) {
    super({
      ...props,
      events: {
        click: () => {
          this.closeWidgets();
        },
      },
    });
  }

  closeWidgets() {
    for (const widget of this.widgets) {
      if (widget.isOn()) {
        widget.hide();
      }
    }

    this.hide();
  }

  showWidgets(element: TWidgetsWithOverlay) {
    for (const widget of this.widgets) {
      if (widget !== element) {
        if (widget.isOn()) {
          widget.hide();
        }
      }
    }

    this.show();
  }

  closeMe() {
    let isNeedClode = true;

    for (const widget of this.widgets) {
      if (widget.isOn()) {
        isNeedClode = false;
      }
    }

    if (isNeedClode) {
      this.hide();
    }
  }

  on(widget: TWidgetsWithOverlay) {
    this.widgets.add(widget);
  }

  off(widget: TWidgetsWithOverlay) {
    this.widgets.delete(widget);
  }

  notify(command: keyof typeof Overlay.commands, element: TWidgetsWithOverlay) {
    switch (command) {
      case Overlay.commands.hide:
        this.closeMe();
        return;
      case Overlay.commands.show:
        this.showWidgets(element);
    }
  }

  show() {
    this.getContent().classList.add(this.activeClass);
  }

  hide() {
    this.getContent().classList.remove(this.activeClass);
  }

  render() {
    return `<div class="overlay" data-overlay></div>`;
  }
}
