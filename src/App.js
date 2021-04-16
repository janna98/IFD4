import Equation from "./components/Equation";
import StartPage from "./components/StartPage";
import Button from "./components/Button";
import {useContext, useEffect, useReducer, useState} from "react";
import {
  appReducer,
  setGameState,
  initializer,
  newExpression,
  newGame,
  setSkippedAvailable,
} from "./AppReducer";
import {makeCancelable, ServerContext} from "./ServerContext";


const App = () => {
  const [state, dispatch] = useReducer(appReducer, undefined, initializer);
  const server = useContext(ServerContext);
  const [requestPromise, setRequestPromise] = useState(null);
  const [requestState, setRequestState] = useState({inFlight: false,error: null});
  const errorState = (error) => setRequestState({ inFlight: false, error: error });
  const restart = () => onStartSubmit(state.roundCount);

  useEffect(() => {
    return () => requestPromise && requestPromise.cancel();
  }, [requestPromise]);

  const onStartSubmit = (round) => {
    setRequestState({ inFlight: true, error: null });
    const postPromise = makeCancelable(server.startGame(round));
    setRequestPromise(postPromise);
    postPromise.promise.then((response) => {
          dispatch(newGame([round, response.id, response.skipsRemaining, response.status]));
          dispatch(newExpression(response.nextExpression));
          setRequestState({ inFlight: false, error: null });
        }).catch((error) => {
          if (!error.isCanceled) errorState(error);
        });
  };

  const equationCallBack = (game) => {
      dispatch(setGameState(game.status));
      dispatch(newExpression(game.nextExpression));
  };

  const skipRound = () => {
    if (state.skippedAvailable > 0 && !state.endGame) {
      setRequestState({ inFlight: true, error: null });
      const skip = "skip";
      const id = state.id;
      const postPromise = makeCancelable(server.postAnswer({ skip, id }));
      setRequestPromise(postPromise);
      postPromise.promise.then((response) => {
        dispatch(newExpression(response.game.nextExpression));
        dispatch(setGameState(response.game.status));
        dispatch(setSkippedAvailable(state.skippedAvailable - 1));
        setRequestState({ inFlight: false, error: null });
      }).catch((error) => {
        if (!error.isCanceled) errorState(error);
      });
    }
  };

  if (requestState.inFlight) {
    return <h3>Fetching...</h3>;
  } else if (requestState.error) {
    return <h3>Error: {requestState.error.message}</h3>;
  } else if (state.gameState === "setup") {
      return <StartPage firstName="Janna" onSubmit={onStartSubmit} />;
  } else {
    return (
        <div>
          <Equation
              toCallBack={equationCallBack}
              onNewGame={restart}
              gameCount={state.gameCount}
              expression={state.expression}
              id={state.id}
              endGame={state.gameState === "finished"}
          />
          {state.skippedAvailable > 0 && state.gameState !== "finished" && !requestState.error && (
              <Button onSubmit={skipRound} text={"Skip"} disabled={null} />
          )}</div>
    );
  }
};

export default App;
