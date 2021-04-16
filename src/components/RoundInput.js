import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";

const RoundInput = (props) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <input
      type="number"
      ref={inputRef}
      className="number-input"
      role="textbox"
      name="round-input"
      min={1}
      max={20}
      placeholder={props.placeHolder}
      onChange={props.onChange}
      defaultValue={3}
    />
  );
};
RoundInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
};

export default RoundInput;
