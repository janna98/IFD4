import { render } from "@testing-library/react";
import RandomNumber from "../src/components/RandomNumber";

describe("RandomNumber", () => {
  it("renders", () => {
    render(<RandomNumber number={2} />);
  });
});
