import { render, screen } from "@testing-library/react";
import HeaderFront from "../components/header/HeaderFront";
import { MemoryRouter } from "react-router-dom";

describe("Test Header Front Component", () => {
  test("Test Header Front render correctly", () => {
    render(
      <MemoryRouter>
        <HeaderFront />
      </MemoryRouter>
    );

    const titleElement = screen.getByText("AQUASCAPE TUTORIAL");
    expect(titleElement).toBeInTheDocument();

    const ButtonLogout = screen.queryByRole("button", { name: "Logout" });
    expect(ButtonLogout).not.toBeInTheDocument();
  });
});
