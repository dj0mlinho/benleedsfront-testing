import React from "react";

import styles from "./Button.module.css";

 export default function Button(props) {

  const btnColorFun = (btnType) => {
     return styles[btnType]
  }
  

  return (
    <button
      type={props.btntype ? props.btntype : "submit" }
      disabled={props.disabled}
      className={styles.Button + " " + btnColorFun(props.btncolor)}
      onClick={props.clicked}
      
    >
      {props.children}
    </button>
  );
}

