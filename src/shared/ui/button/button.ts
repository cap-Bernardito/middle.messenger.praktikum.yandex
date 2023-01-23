import { Block } from "shared/core";

import "./button.scss";

export type TButtonProps = TPropsWithEvents<{
  value: string;
  title: string;
  htmlType?: "submit" | "reset" | "button";
  className?: string;
  onClick?: (event: Event) => void;
}>;

export class Button extends Block<TButtonProps> {
  static cName = "Button";

  constructor({ htmlType = "submit", onClick, ...props }: TButtonProps) {
    super({
      ...props,
      htmlType,
      events: {
        click: onClick,
      },
    });
  }

  // componentDidUpdate() {
  //   // TODO: разобраться с этим (страница чата, кнопка меню)
  //   return true;
  // }

  render() {
    // console.log(`%c Button block render id=${this.id}`, "background: green; color: white");

    return `
    <button class="btn {{#if className}}{{className}}{{/if}}"
      {{#if htmlType}} type={{htmlType}}  {{/if}}
      {{#if title}} title={{title}}  {{/if}}
      data-id="${this.id}"
    >
      {{{value}}}
    </button>
    `;
  }
}
