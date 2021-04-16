import PropTypes from "prop-types";

const ResultItem = (props) => {
  return (
    <p
      key={props.index}
      role="row"
      className={
        props.item.correct === true && props.item.spentTime <= 3000
          ? "green-result"
          : props.item.correct === true && props.item.spentTime > 3000
          ? "orange-result"
          : "red-result"
      }
    >
      {props.item.A.toString()} {props.item.operator} {props.item.B.toString()}{" "}
      = {props.item.answer}
      {props.showTime ? "[" + props.item.spentTime + "]" : ""}
    </p>
  );
};

ResultItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  showTime: PropTypes.bool,
};

export default ResultItem;
