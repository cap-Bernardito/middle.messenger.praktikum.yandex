import { Block } from "shared/core";
import { ROUTES } from "shared/utils/constants";

export class Page_404 extends Block {
  static cName = "Page_404";

  render() {
    return `
  {{#LayoutCentered}}
    <div class="text-center">
      <h1 class="text-display-1 text-bold">404</h1>
      <h2 class="text-h1 text-bold mb-10">Не туда попали</h2>

      {{{Link to="${ROUTES.messenger.path}" value="Назад к чатам"}}}
    </div>
  {{/LayoutCentered}}
    `;
  }
}
