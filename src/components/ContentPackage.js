// src/components/ContentPackage.js
import React, { Component } from 'react'
//import { placeholderContent } from '../placeholderContent'

import Content from './Content'
import GraphPackage from './GraphPackage'

export default class ContentPackage extends Component {


  render() {
    return <div>
        <GraphPackage />
        <Content />

    </div>

  }

}