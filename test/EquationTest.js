import { render, screen } from "@testing-library/react";
import Equation from "../src/components/Equation";
import sinon from "sinon";
import userEvent from "@testing-library/user-event";
import { expect } from "chai";
import React from "react";

describe("Equation", () => {
  it("renders", () => {
    render(
      <Equation
        A={10}
        B={10}
        operator={"+"}
        endGame={false}
        toCallBack={sinon.stub()}
        onNewGame={sinon.stub()}
        gameCount={0}
      />
    );
  });

  it("checks addition answer correctly", () => {
    const toCallBack = sinon.stub();
    render(
      <Equation
        A={10}
        B={10}
        operator={"+"}
        endGame={false}
        toCallBack={toCallBack}
        onNewGame={sinon.stub()}
        gameCount={0}
      />
    );
    userEvent.type(screen.getByRole("textbox", { Name: "answer-input" }), "20");
    // toCallBack is only called when the clever answer checking marks the answer correct
    expect(toCallBack).to.have.been.called;
  });

  it("checks division answer correctly", () => {
    const toCallBack = sinon.stub();
    render(
      <Equation
        A={10}
        B={10}
        operator={"/"}
        endGame={false}
        toCallBack={toCallBack}
        onNewGame={sinon.stub()}
        gameCount={0}
      />
    );
    userEvent.type(screen.getByRole("textbox", { Name: "answer-input" }), "1");
    expect(toCallBack).to.have.been.called;
  });

  it("checks subtraction answer correctly", () => {
    const toCallBack = sinon.stub();
    render(
      <Equation
        A={10}
        B={10}
        operator={"-"}
        endGame={false}
        toCallBack={toCallBack}
        onNewGame={sinon.stub()}
        gameCount={0}
      />
    );
    userEvent.type(screen.getByRole("textbox", { Name: "answer-input" }), "0");
    expect(toCallBack).to.have.been.called;
  });
  it("checks multiplication answer correctly", () => {
    const toCallBack = sinon.stub();
    render(
      <Equation
        A={10}
        B={10}
        operator={"*"}
        endGame={false}
        toCallBack={toCallBack}
        onNewGame={sinon.stub()}
        gameCount={0}
      />
    );
    userEvent.type(
      screen.getByRole("textbox", { Name: "answer-input" }),
      "100"
    );
    expect(toCallBack).to.have.been.called;
  });

  it("shows results during game", () => {
    render(
      <Equation
        A={10}
        B={10}
        operator={"+"}
        endGame={false}
        toCallBack={sinon.stub()}
        onNewGame={sinon.stub()}
        gameCount={0}
      />
    );
    userEvent.type(screen.getByRole("textbox", { Name: "answer-input" }), "20");
    expect(screen.getByRole("row")).to.exist;
  });

  it("shows results after game", () => {
    render(
      <Equation
        A={10}
        B={10}
        operator={"+"}
        endGame={true}
        toCallBack={sinon.stub()}
        onNewGame={sinon.stub()}
        gameCount={0}
      />
    );
    screen.getByRole("note", { Name: "ending-screen" });
  });
});
