import React from "react";

import styles from "./pictureFrame.module.css";

export default function PictureFrame(props) {
  return (
    <div className={styles.pictureDiv + " row"}>
      <div className={styles.pictureCol + " col-sm"}>
        <div className={styles.imgFrame}>
          <img className="img-fluid" src={props.imgPath} alt="" />
        </div>
      </div>
     
    </div>
  );
}