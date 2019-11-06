import React, { Component } from 'react' ;

import styles from "./Items.module.css"

import PageNameAdmin from "../../hoc/PageNameAdmin/PageNameAdmin" ;

export class Items extends Component {
  render() {
    return (
      <PageNameAdmin pageName={this.props.pageName} >
       
      </PageNameAdmin>
    )
  }
}

export default Items
