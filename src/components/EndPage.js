import PropTypes from "prop-types";
import Button from "./Button";
import React from "react";

const EndPage = (props) => {
  return (
    <div>
      <h3 role="note" name="ending-screen">
        Game over. Time spent: {props.spentTime} ms.
      </h3>
      <Button onSubmit={props.onNewGame} text={"New game"} />
    </div>
  );
};

EndPage.propTypes = {
    spentTime: PropTypes.number,
    onNewGame: PropTypes.func,
};

export default EndPage;
