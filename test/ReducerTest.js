import { expect } from "chai";
import {
  appReducer,
  endGame,
  increaseSkippedCount,
  initializer,
  newExpression,
  newGame,
  restartGame,
} from "../src/AppReducer";

describe("Reducer", () => {
  it("increments skipped count", () => {
    const initialState = initializer();
    const state = appReducer(initialState, increaseSkippedCount());
    expect(state.skipped).to.eql(1);
  });

  it("starts new game", () => {
    const initialState = initializer();
    const state = appReducer(initialState, newGame(5));
    expect(state.roundCount).to.eql(5);
    expect(state.startGame).to.eql(false);
    expect(state.endGame).to.eql(false);
  });

  it("restarts a game", () => {
    const initialState = initializer();
    const state = appReducer(initialState, restartGame());
    expect(state.endGame).to.eql(false);
    expect(state.gameCount).to.eql(1);
  });

  it("ends a game", () => {
    const initialState = initializer();
    const state = appReducer(initialState, endGame());
    expect(state.endGame).to.eql(true);
  });

  it("creates an expression", () => {
    const initialState = initializer();
    const state = appReducer(initialState, newExpression(2));
    expect(state.A).to.exist;
    expect(state.B).to.exist;
    expect(state.operator).to.not.eql("");
    expect(state.currentRound).to.eql(2);
  });

  it("throws error with unknown action", () => {
    const initialState = initializer();
    expect(() => appReducer(initialState, { type: "UNKNOWN" })).to.throw(
      "No such action for reducer"
    );
  });
});
