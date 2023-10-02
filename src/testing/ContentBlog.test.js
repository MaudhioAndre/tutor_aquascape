import { render, screen } from "@testing-library/react";
import ContentBlog from "../components/content/ContentBlog";
import { MemoryRouter } from "react-router-dom";

describe("Content Blog test", () => {
  const data = [
    {
      id: 1,
      judul: "satu",
      deskripsi: "desc",
      foto: "foto",
      recordStatus: "N",
      createdAt: new Date(),
    },
    {
      id: 2,
      judul: "dua",
      deskripsi: "desc",
      foto: "foto",
      recordStatus: "N",
      createdAt: new Date(),
    },
    // {
    //   id: 3,
    //   judul: "tiga",
    //   deskripsi: "desc",
    //   foto: "foto",
    //   recordStatus: "N",
    //   createdAt: new Date(),
    // },
  ];

  test("Check null parameter", () => {
    render(<ContentBlog blog={[]} />);
    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();
  });

  test("Check fill parameter with data", () => {
    render(<ContentBlog blog={data} />);
    const element = screen.getAllByTestId("card_blog");
    expect(element).toHaveLength(data.length);
  });
});
