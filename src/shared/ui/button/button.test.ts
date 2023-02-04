import { renderBlock } from "__tests__/render-utils";
import { getByTestId, getByText } from "@testing-library/dom";

import { Button, TButtonProps } from "./button";

function renderButton({ title = "Button_title", value = "Button_value", ...props }: Partial<TButtonProps>) {
  renderBlock<TButtonProps>({
    Block: Button,
    props: { dataTestId: "test-button", title, value, ...props },
  });

  return getByTestId(document.body, "test-button");
}

describe("shared/ui/Button", () => {
  it("should render", () => {
    const button = renderButton({});

    expect(button).toBeInTheDocument();
  });

  it("should work 'title' option", () => {
    const button = renderButton({ title: "test_title" });

    expect(button.getAttribute("title")).toBe("test_title");
  });

  it("should work 'value' option", () => {
    const button = renderButton({ value: "test_value" });

    expect(getByText(button, "test_value")).toBeDefined();
  });

  it("should work 'htmlType' option", () => {
    const button = renderButton({ htmlType: "button" });

    expect(button.getAttribute("type")).toBe("button");
  });

  it("should work 'className' option", () => {
    const button = renderButton({ className: "test_className" });

    expect(button.classList.contains("test_className")).toBe(true);
  });

  it("should call onClick when user press button", () => {
    const mock = jest.fn();
    const button = renderButton({ onClick: mock });

    button.click();

    expect(mock).toBeCalled();
  });
});
