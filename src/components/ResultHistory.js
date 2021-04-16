import PropTypes from "prop-types";
import ResultItem from "./ResultItem";

function generateHTML(round, roundCount, showTime) {
  return round.map((item, idx) => {
    return (
      <ResultItem
        item={item}
        showTime={showTime}
        index={idx}
        key={idx}
      />
    );
  });
}

const ResultHistory = (props) => {
  const resultsOrdered = Array.from(props.results);
  resultsOrdered.reverse();
  console.log(resultsOrdered);
  if (props.showTime) {
    return (
      <span>
        {resultsOrdered.map((round, outsideIdx) => {
          const HTML = generateHTML(
            round,
            outsideIdx,
            props.showTime
          );
          if (outsideIdx === 0) {
            HTML.unshift(<p>Last game</p>);
          } else {
            HTML.unshift(<p>Game #{resultsOrdered.length - outsideIdx}</p>);
          }
          return HTML;
        })}
      </span>
    );
  } else {
    const round = props.results[props.gameCount];
    const HTML = generateHTML(
      round,
      props.gameCount,
      props.showTime
    );
    return HTML;
  }
};

ResultHistory.propTypes = {
  results: PropTypes.array,
  showTime: PropTypes.bool.isRequired,
  gameCount: PropTypes.number.isRequired,
};

export default ResultHistory;
