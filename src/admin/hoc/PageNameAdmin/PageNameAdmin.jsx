import React from 'react'

import styles from "./PageNameAdmin.module.css"

 
export default function PageNameAdmin(props) {
  return (
    <div>
      <div className={styles.Top}>{props.pageName}</div>
        {props.children}
    </div>
  )
}






