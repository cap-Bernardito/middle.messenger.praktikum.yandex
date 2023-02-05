import { renderBlock, step } from "__tests__/render-utils";
import { getByTestId, queryByText, waitFor } from "@testing-library/dom";

import { store } from "app/store";

import { ProfilePage } from "../profile";

const USER_MOCK = {
  avatar: "/d66cf98f-05dc-49ba-8d2b-c1db0c5888c3/761d694b-39b5-4dee-ab15-78a2bf05461d_12.png",
  displayName: "Джон дое",
  email: "johndoe2@johndoe2.johndoe2",
  firstName: "Джон",
  id: 3094,
  login: "johndoe2",
  phone: "89137909090",
  secondName: "Дое",
  fullName: "Джон Дое",
};

describe("pages/Profile", () => {
  it("should logout from profile and redirect to login", async () => {
    await step("render profile page to dom", () => {
      renderBlock({
        Block: ProfilePage,
        props: {},
        state: {
          appIsInited: true,
          auth: {
            user: USER_MOCK,
            loading: false,
            error: null,
          },
        },
      });
    });

    await step("click to logout button", async () => {
      const button = getByTestId(document.body, "logout-btn");
      button.click();
    });

    await step("wait openning login page", async () => {
      await waitFor(() => expect(queryByText(document.body, "Вход")).toBeInTheDocument());
    });

    await step("check state", async () => {
      expect(store.getState().auth).toEqual({ user: null, loading: false, error: null });
    });
  });
});
