import { render, screen } from "@testing-library/react";
import ResultItem from "../src/components/ResultItem";

describe("ResultItem", () => {
  it("renders", () => {
    render(
      <ResultItem
        showTime={true}
        index={0}
        item={{
          correct: false,
          A: 11,
          B: 1,
          operator: "-",
          answer: 10,
          time: 1617790804103,
        }}
        time={1588}
      />
    );
    screen.getByText("[1588]", { exact: false });
    screen.getByText("11 - 1 = 10", { exact: false });
  });
});
