// src/components/ContentPackage.js
import React, { Component } from 'react'
//import { placeholderContent } from '../placeholderContent'

import Sidebar from './Sidebar'
import Content from './Content'
import Graph from './Graph'

export default class ContentPackage extends Component {
    state = {
        sidebarOpen: true,
        nodeRadius: 20
    }

    changeSidebarOpen = () => {
        console.log("changeSidebarOpen called")
        this.setState({...this.state, sidebarOpen: !this.state.sidebarOpen});
        console.log("sidebarOpen=", this.state.sidebarOpen)
    }

    changeSize = (ev) => {
        console.log("changeSize called")
        this.setState({...this.state, nodeRadius: ev.target.value});
        console.log("nodeRadius=", this.state.nodeRadius)
    }

  render() {
    return <div>
        {/*
        <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
        */}
        <Sidebar isOpen={this.state.sidebarOpen} changeSidebarOpen={this.changeSidebarOpen} changeSize={this.changeSize}/>
        <Content />
        <Graph changeSidebarOpen={this.changeSidebarOpen} nodeRadius={this.state.nodeRadius}/>
        
    </div>
  }
}