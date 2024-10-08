import React from "react";

const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#e08439c0" : "#e8e8bfc0",
    animation: props.isHeld ? "bounce 0.3s" : "none",
  };

  return (
    <div className="die" style={styles} onClick={props.holdDice}>
      <h2>{props.value}</h2>
    </div>
  );
};

export default Die;
