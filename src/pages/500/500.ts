import { Block } from "shared/core";
import { ROUTES } from "shared/utils/constants";

export class Page_500 extends Block {
  static cName = "Page_500";

  render() {
    return `
  {{#LayoutCentered}}
    <div class="text-center">
      <h1 class="text-display-1 text-bold">500</h1>
      <h2 class="text-h1 text-bold mb-10">Мы уже фиксим</h2>

      {{{Link to="${ROUTES.messenger.path}" value="Назад к чатам"}}}
    </div>
  {{/LayoutCentered}}
    `;
  }
}
