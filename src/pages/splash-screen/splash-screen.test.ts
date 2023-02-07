import { renderBlock } from "__tests__/render-utils";
import { getByTestId, getByText } from "@testing-library/dom";

import { SplashScreen, TSplashScreenProps } from "./splash-screen";

describe("pages/SplashScreen", () => {
  it("should render", () => {
    renderBlock<TSplashScreenProps>({
      Block: SplashScreen,
      props: {},
    });

    expect(getByTestId(document.body, "splash-text")).toBeInTheDocument();
  });

  it("should render text from props.text", () => {
    const text = "Loading...";

    renderBlock<TSplashScreenProps>({
      Block: SplashScreen,
      props: { text },
    });

    expect(getByText(document.body, text)).toBeInTheDocument();
  });
});
