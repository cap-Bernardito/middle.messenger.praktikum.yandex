import { getByTestId } from "@testing-library/dom";

import { Button } from "shared/ui/button";

import { renderDOM } from "../render-dom";

function getTestBlock() {
  return new Button({ title: "test", value: "test", dataTestId: "test-button" });
}

describe("core/renderDOM", () => {
  it("should render element to the default root container", () => {
    document.body.innerHTML = '<div id="root"></div>';

    renderDOM(getTestBlock());

    expect(getByTestId(document.body, "test-button")).toBeInTheDocument();
  });

  it("should render element to the specified root container", () => {
    document.body.innerHTML = '<div id="app"></div>';

    renderDOM(getTestBlock(), "#app");

    expect(getByTestId(document.body, "test-button")).toBeInTheDocument();
  });

  it("should throw error if root container is not found", () => {
    expect(() => {
      renderDOM(getTestBlock());
    }).toThrow(`Root element with #root selector is not available`);
  });
});
