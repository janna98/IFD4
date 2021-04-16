import PropTypes from "prop-types";

const RandomNumber = (props) => {
  return <span className="number">{props.number}</span>;
};

RandomNumber.propTypes = {
  number: PropTypes.number.isRequired,
};

export default RandomNumber;
