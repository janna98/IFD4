import { render } from "@testing-library/react";
import RoundInput from "../src/components/RoundInput";
import sinon from "sinon";

describe("RoundInput", () => {
  it("renders", () => {
    render(<RoundInput onChange={sinon.stub()} placeHolder={"Test"} />);
  });
});
