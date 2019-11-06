import React from "react";
import styles from "../../components/Buttons/Buttons.module.css";
function button(props) {
  let style = "";
  let styleBcc = "";
  if (props.children === "New") {
    style = styles.Button;
    styleBcc = "success btn-lg";
  } else {
    style = styles.Buttons;
    styleBcc = "secondary";
  }
  return (
    <div className={style}>
      <button onClick={props.click} className={`btn btn-${styleBcc} m-3`}>
        {props.children}
      </button>
    </div>
  );
}

export default button;
