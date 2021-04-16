import { render, screen } from "@testing-library/react";
import ResultHistory from "../src/components/ResultHistory";

describe("ResultHistory", () => {
  it("renders without results", () => {
    render(<ResultHistory results={[]} gameCount={0} showTime={true} />);
  });

  it("renders a line for for each result", () => {
    const results = [
      {
        startTime: 1617806426189,
        results: [
          {
            correct: false,
            A: 17,
            B: 6,
            operator: "-",
            answer: 11,
            time: 1617806430428,
          },
          {
            correct: true,
            A: 7,
            B: 10,
            operator: "+",
            answer: 17,
            time: 1617806432390,
          },
          {
            correct: true,
            A: 10,
            B: 18,
            operator: "*",
            answer: 180,
            time: 1617806433861,
          },
        ],
      },
    ];
    render(<ResultHistory results={results} gameCount={0} showTime={true} />);

    screen.getByText("17 - 6 = 11", { exact: false });
    screen.getByText("7 + 10 = 17", { exact: false });
    screen.getByText("10 * 18 = 180", { exact: false });
  });
});
