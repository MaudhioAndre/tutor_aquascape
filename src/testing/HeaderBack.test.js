import { render, screen } from "@testing-library/react";
import HeaderBack from "../components/header/HeaderBack";

import { MemoryRouter } from "react-router-dom";

describe("Test Header Admin Page", () => {
  test("Test HeaderBack renders correctly", () => {
    render(
      <MemoryRouter>
        <HeaderBack />
      </MemoryRouter>
    );

    const AdminTitlePage = screen.getByText("ADMIN");
    expect(AdminTitlePage).toBeInTheDocument();

    const ButtonLogout = screen.getByRole("button", { name: "Logout" });
    expect(ButtonLogout).toBeInTheDocument();
  });
});
