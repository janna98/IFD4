import { expect } from "chai";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { act } from "react-dom/test-utils";

describe("App", () => {
  it("renders start page", () => {
    render(<App />);
    screen.getByRole("heading", {
      Name:
        "Hi, this is Janna's math game, choose your parameters and get to calculating!",
    });
  });

  it("renders an equation after start page", () => {
    act(() => {
      render(<App />);
      userEvent.type(screen.getByRole("textbox", { Name: "round-input" }), "1");
      userEvent.click(screen.getByRole("button", { Name: "start-button" }));
    });
    expect(screen.getByPlaceholderText("Result")).to.exist;
  });
});
