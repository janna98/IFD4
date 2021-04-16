import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      className="start-button"
      onClick={props.onSubmit}
      role="button"
      name="start-button"
    >
      {props.text}
    </button>
  );
};
Button.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  text: PropTypes.string,
  disabled: PropTypes.string,
};
Button.defaultProps = { text: "START" };

export default Button;
