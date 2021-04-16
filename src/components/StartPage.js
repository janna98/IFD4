import PropTypes from "prop-types";
import RoundInput from "./RoundInput";
import Button from "./Button";
import React, { useState } from "react";

const StartPage = (props) => {
  const [round, setRound] = useState(3);
  const onRoundChange = (event) => setRound(parseInt(event.target.value));

  const onChange = (event) => {
    onRoundChange(event);
  };

  const onSubmit = () => {
    props.onSubmit(round);
  };

  return (
    <header className="flex-box-wrap">
      <h3>
        Hi, this is {props.firstName}&apos;s math game, choose your parameters
        and get to calculating!
      </h3>
      <p>Number of rounds: </p>
      <RoundInput onChange={onChange} placeHolder="Rounds" />
      <Button
        onSubmit={onSubmit}
        disabled={round > 0 && round <= 20 ? null : "disabled"}
      />
    </header>
  );
};

StartPage.propTypes = {
  firstName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default StartPage;
