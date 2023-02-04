import { step } from "__tests__/render-utils";
import { getByText, waitFor } from "@testing-library/dom";

import { Router } from "../router";

import { Home, Page_1, Page_2 } from "./fixtures";

const popStateEvent = new PopStateEvent("popstate");

function pushPage(path: string) {
  window.history.pushState({}, "", path);
  dispatchEvent(popStateEvent);
}

const homeOptions = {
  path: "/",
  title: Home.cName,
  element: Home,
};
const firstPageOptions = {
  path: "/page_1",
  title: Page_1.cName,
  element: Page_1,
};
const secondPageOptions = {
  path: "/page_2",
  title: Page_2.cName,
  element: Page_2,
};

let router: Router;

describe("core/router", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';

    router = new Router();

    router.destroy();
    router = new Router();
    router.use(homeOptions, () => true);
    router.use(firstPageOptions, () => true);
    router.use(secondPageOptions, () => true);
  });

  it("should return one instance", () => {
    const router1 = new Router();
    const router2 = new Router();

    expect(router1).toBe(router2);
  });

  it("should add routes using the 'use' method", () => {
    // @ts-ignore
    expect(router._routes.length).toBe(3);
  });

  it("should render 'window.location.pathname' route when start", async () => {
    window.history.pushState({}, "", secondPageOptions.path);

    router.start();

    expect(getByText(document.body, secondPageOptions.title)).toBeInTheDocument();
  });

  it("should render route when window.onpopstate event fires", async () => {
    await step("start router", async () => {
      router.start();
    });

    await step("add Page_1 to window.history ", async () => {
      pushPage(firstPageOptions.path);
    });

    await step("wait openning Page_1", async () => {
      await waitFor(() => expect(getByText(document.body, firstPageOptions.title)).toBeInTheDocument());
    });
  });

  it("should work 'back' method", async () => {
    await step("start router", async () => {
      router.start();
    });

    await step("add Page_1 to window.history", async () => {
      pushPage(firstPageOptions.path);
      pushPage(secondPageOptions.path);
    });

    await step("run router.back method", async () => {
      router.back();
    });

    await step("wait openning Page_1", async () => {
      await waitFor(() => expect(getByText(document.body, firstPageOptions.title)).toBeInTheDocument());
    });
  });

  it("should work 'forward' method", async () => {
    await step("start router", async () => {
      router.start();
    });

    await step("add Page_2 to window.history and go back", async () => {
      pushPage(firstPageOptions.path);
      pushPage(secondPageOptions.path);
      window.history.back();
    });

    await step("run router.forward method", async () => {
      router.forward();
    });

    await step("wait openning Page_2", async () => {
      await waitFor(() => expect(getByText(document.body, secondPageOptions.title)).toBeInTheDocument());
    });
  });

  it("should work 'getParams' method", async () => {
    router.use(
      {
        path: "/page_1/:pageId",
        title: Page_1.cName,
        element: Page_1,
      },
      () => true
    );
    router.start();

    pushPage("/page_1/10242");

    expect(router.getParams()).toStrictEqual({ pageId: "10242" });
  });

  it("should throw error when route is not provided", async () => {
    window.history.pushState({}, "", "/unresolved_path");

    expect(() => {
      router.start();
    }).toThrow(`Component is not available on "/unresolved_path"`);
  });
});
