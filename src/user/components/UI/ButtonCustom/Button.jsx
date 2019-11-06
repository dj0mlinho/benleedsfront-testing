import React from "react";

const Button = props => {
  return (
    <button onClick={props.click} className={`btn btn-${props.color}`}>
      {props.children}
    </button>
  );
};

export default Button;
