import React from "react";
import { render, screen } from "@testing-library/react";
import AppHeader from "./AppHeader";

jest.mock("./SettingsMenu", () => {
  return function SettingsMenu(props: any) {
    return <></>;
  };
});

describe("AppHeader component", () => {
  test("renders title", () => {
    render(<AppHeader />);
    const titleElement = screen.getByText("Tasky");
    expect(titleElement).toBeInTheDocument();
  });
});
