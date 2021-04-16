import { render } from "@testing-library/react";
import EndPage from "../src/components/EndPage";
import sinon from "sinon";

describe("EndPage", () => {
  it("renders", () => {
    render(<EndPage startTime={0} onNewGame={sinon.stub()} />);
  });
});
