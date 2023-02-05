import { Block } from "shared/core/block";
import { registerComponent } from "shared/core/register-component";
import { router } from "shared/core/router/router";

export type TLinkProps = TPropsWithEvents<{
  value: string;
  title: string;
  to: string;
  className?: string;
}>;

export class Link extends Block<TLinkProps> {
  static cName = "Link";

  constructor({ ...props }: TLinkProps) {
    super({
      ...props,
      events: {
        click: (event) => {
          event.preventDefault();

          router.go(this.props.to);
        },
      },
    });
  }

  render() {
    return `
  <a class="link {{#if className}}{{className}}{{/if}}"
    {{#if title}} title="{{title}}"  {{/if}}
    href="{{to}}"
  >
    {{{value}}}
  </a>
    `;
  }
}

registerComponent(Link);
