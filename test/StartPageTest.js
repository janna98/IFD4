import { render } from "@testing-library/react";
import StartPage from "../src/components/StartPage";
import sinon from "sinon";

describe("StartPage", () => {
  it("renders", () => {
    render(
      <StartPage
        onChange={sinon.stub()}
        onSubmit={sinon.stub()}
        firstName={"Janna"}
      />
    );
  });
});
