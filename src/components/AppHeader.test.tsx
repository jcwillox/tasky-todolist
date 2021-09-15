import React from "react";
import { render, screen } from "@testing-library/react";
import AppHeader from "./AppHeader";

jest.mock("./DarkModeToggle", () => {
  return function DarkModeToggle(props: any) {
    return <></>;
  };
});

describe("AppHeader component", () => {
  test("renders title", () => {
    render(<AppHeader />);
    const titleElement = screen.getByText("TodoIt");
    expect(titleElement).toBeInTheDocument();
  });
});
