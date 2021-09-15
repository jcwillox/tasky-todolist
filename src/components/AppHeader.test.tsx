import React from "react";
import { render, screen } from "@testing-library/react";
import AppHeader from "./AppHeader";

describe("AppHeader component", () => {
  test("renders title", () => {
    render(<AppHeader />);
    const titleElement = screen.getByText("TodoIt");
    expect(titleElement).toBeInTheDocument();
  });
});
