import { logRoles, render, screen, waitFor } from "@testing-library/react";

import Login from "../layouts/Login";
import { MemoryRouter } from "react-router-dom";

import userEvent from "@testing-library/user-event";

describe("Login form test", () => {
  // test("get all roles", () => {
  //   const view = render(
  //     <MemoryRouter>
  //       <Login />
  //     </MemoryRouter>
  //   );
  //   logRoles(view.container);
  // });

  test("test component render correctly", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const loginTitleElement = screen.getByTestId("login_title");
    expect(loginTitleElement).toBeInTheDocument();

    const inputUsernameElement = screen.getByTestId("username");
    expect(inputUsernameElement).toBeInTheDocument();

    const inputPasswordElement = screen.getByTestId("password");
    expect(inputPasswordElement).toBeInTheDocument();

    const ButtonLogin = screen.getByRole("button", {
      name: "LOGIN",
    });
    expect(ButtonLogin).toBeInTheDocument();
  });

  test("test input & maxlength in password", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const InputElement = screen.getByTestId("password");
    user.type(InputElement, "thisstringismorethan20character");
    await waitFor(() => {
      expect(InputElement).toHaveValue("thisstringismorethan");
    });
  });

  // test("test input & maxlength in username", async () => {
  //   const user = userEvent.setup();
  //   render(
  //     <MemoryRouter>
  //       <Login />
  //     </MemoryRouter>
  //   );
  //   const usernameElement = screen.getByTestId("username");
  //   // user.type(usernameElement, "thisstringismorethan20character");
  //   user.type(usernameElement, "test");
  //   await waitFor(() => {
  //     expect(usernameElement).toHaveValue("test");
  //     // expect(usernameElement).toHaveValue("thisstringismorethan");
  //   });
  // });
});
