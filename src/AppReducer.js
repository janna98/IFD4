export const initializer = () => ({
  id: 0,
  expression: {"lhs": 0, "rhs": 0, "operaror":"", "correctAnswerLength": 0},
  roundCount: 3,
  gameState: "setup",
  skippedAvailable: 0,
  gameCount: -1,
});

export const newGame = (settings) => ({
  type: "NEW_GAME",
  payload: settings,
});
export const setGameState = (state) => ({
  type: "SET_STATE",
  payload: state,
});
export const setSkippedAvailable = (count) => ({
  type: "SET_SKIPPED_COUNT",
  payload: count,
});
export const newExpression = (expr) => ({
  type: "NEW_EXPR",
  payload: expr,
});
export const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_SKIPPED_COUNT":
      return { ...state, skippedAvailable: action.payload };
    case "NEW_EXPR":
      return {
        ...state,
        expression: action.payload
      };
    case "NEW_GAME":
      return {
        ...state,
        roundCount: action.payload[0],
        id: action.payload[1],
        skippedAvailable: action.payload[2],
        gameState: action.payload[3],
        gameCount: state.gameCount + 1,
      };
    case "SET_STATE":
      return {
        ...state,
        gameState: action.payload,
      };
    default:
      throw new Error("No such action for reducer");
  }
};
