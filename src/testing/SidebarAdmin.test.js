import { render, screen, waitFor } from "@testing-library/react";
import SidebarAdmin from "../components/etc/SidebarAdmin";
import { MemoryRouter } from "react-router-dom";

import userEvent from "@testing-library/user-event";
const user = userEvent.setup();

describe("Sidebar Admin Test", () => {
  test("Sidebar menu mobile closed", () => {
    render(
      <MemoryRouter>
        <SidebarAdmin />
      </MemoryRouter>
    );
    // screen.debug();
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("tutup_menu_burger");
  });

  test("Sidebar menu mobile open", async () => {
    const setIsOpen = jest.fn();
    render(
      <MemoryRouter>
        <SidebarAdmin toggleMenuMobile={setIsOpen} />
      </MemoryRouter>
    );
    const buttonElement = screen.getByRole("button");
    // screen.debug();
    user.click(buttonElement);
    await waitFor(() => {
      expect(buttonElement).toHaveClass("buka_menu_burger");
    });
  });
});
