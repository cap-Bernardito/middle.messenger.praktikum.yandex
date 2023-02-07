import { Block } from "shared/core";

export type TSplashScreenProps = {
  text?: string;
};

export class SplashScreen extends Block<TSplashScreenProps> {
  static cName = "SplashScreen";

  constructor({ text = "Загрузка..." }: TSplashScreenProps) {
    super({
      text,
    });
  }

  render() {
    return `
    {{#LayoutCentered}}
      <div data-testid="splash-text">
        {{text}}
      </div>
    {{/LayoutCentered}}
    `;
  }
}
