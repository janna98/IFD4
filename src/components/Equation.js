import RandomNumber from "./RandomNumber";
import PropTypes from "prop-types";
import EndPage from "./EndPage";
import ResultHistory from "./ResultHistory";
import {useState, useEffect, useContext} from "react";
import {makeCancelable, ServerContext} from "../ServerContext";

function createMap(move, expr, answer) {
  return {
    correct: move.correct,
    A: expr.lhs,
    B: expr.rhs,
    operator: expr.operator,
    answer: answer,
    spentTime: parseInt(move.timeSpentMillis)
  };
}

function getEquationResult(operator, A, B) {
  switch (operator) {
    case "+":
      return A + B;
    case "*":
      return A * B;
    case "-":
      return A - B;
    case "/":
      return parseInt(A / B);
  }
}

function getTotalTime(results) {
  const lastGame = results[results.length - 1];
  const reducer = (total, item) => total + item.spentTime;
  return lastGame.reduce(reducer, 0)
}

function addToResults(results, gameCount, res) {
  let rounds = results[gameCount];
  if (!rounds) rounds = [];
  rounds = rounds.concat([res]);
  results[gameCount] = rounds;
  return results;
}

const Equation = (props) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const server = useContext(ServerContext);
  const [requestPromise, setRequestPromise] = useState(null);
  const [requestState, setRequestState] = useState({inFlight: false,error: null});
  const errorState = (error) => setRequestState({ inFlight: false, error: error });

  useEffect(() => {
    return () => requestPromise && requestPromise.cancel();
  }, [requestPromise]);

  const onChange = (event) => {
    const answer = parseInt(event.target.value);
    const id = props.id;
    if (event.target.value.length === props.expression.correctAnswerLength) {
      setRequestState({ inFlight: true, error: null });
      const postPromise = makeCancelable(server.postAnswer({ answer, id }));
      setRequestPromise(postPromise);
      postPromise.promise.then((response) => {
        const res = createMap(response.move, props.expression,
            getEquationResult(props.expression.operator, props.expression.lhs, props.expression.rhs));
        setResults(addToResults(results, props.gameCount, res));
        setValue("");
        props.toCallBack(response.game);
        setRequestState({ inFlight: false, error: null });
      }).catch((error) => {
        if (!error.isCanceled) errorState(error);
      });
    } else {
      setValue(event.target.value);
    }
  };
  if (requestState.inFlight) {
    return <h3>Fetching...</h3>;
  } else if (requestState.error) {
    return <h3>Error: {requestState.error.message}</h3>;
  } else if (!props.endGame) {
    return (
      <main className="flex-box">
        {props.gameCount < results.length && (
          <ResultHistory gameCount={props.gameCount} results={results} showTime={false}/>
        )}
        <p>
          <RandomNumber number={props.expression.lhs}/> {props.expression.operator}
          <RandomNumber number={props.expression.rhs}/> =
          <input
            type="number"
            role="textbox"
            name="answer-input"
            className="number-input"
            placeholder="Result"
            onChange={onChange}
            value={value}
          />
        </p>
      </main>
    );
  } else {
    return (
      <div className="flex-box">
        <ResultHistory results={results} gameCount={props.gameCount} showTime={true}/>
        <EndPage spentTime={getTotalTime(results)} onNewGame={props.onNewGame} />
      </div>
    );
  }
};

Equation.propTypes = {
  toCallBack: PropTypes.func.isRequired,
  endGame: PropTypes.bool.isRequired,
  onNewGame: PropTypes.func.isRequired,
  gameCount: PropTypes.number.isRequired,
  expression: PropTypes.object,
  id: PropTypes.string
};

export default Equation;
