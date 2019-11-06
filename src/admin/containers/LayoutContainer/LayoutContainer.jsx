import React, { Component } from 'react'

import NavigationAdmin from "../../components/Navigation/NavigationAdmin/NavigationAdmin"

import styles from "./LayoutContainer.module.css"

export class LayoutContainer extends Component {
  render() {
    return (
      <div>
        <NavigationAdmin/>
        <main className={styles.Main}>   
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default LayoutContainer ;
