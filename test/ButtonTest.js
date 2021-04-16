import { render } from "@testing-library/react";
import sinon from "sinon";
import Button from "../src/components/Button";

describe("Button", () => {
  it("renders", () => {
    render(<Button onSubmit={sinon.stub()} text={"Start"} disabled={null} />);
  });
});
