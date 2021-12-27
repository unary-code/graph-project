// src/components/ContentPackage.js
import React, { Component } from 'react'
//import { placeholderContent } from '../placeholderContent'

import Sidebar from './Sidebar'
import Content from './Content'
import Graph from './Graph'

const INCREASE_X_RATE = 3;

export default class ContentPackage extends Component {

    state = {
        sidebarOpen: true,
        nodeRadius: 20,
        toggleIncreaseX: false,
        x: 30
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


    increaseX = () => {
        console.log("increaseX called")

        if (this.state.toggleIncreaseX) {
        this.setState({...this.state, x: this.state.x+INCREASE_X_RATE});
        console.log("x=", this.state.x)
        
        window.requestAnimationFrame(this.increaseX)
        }
    }

    startIncreaseX = (ev) => {
        this.setState({...this.state, toggleIncreaseX: true})
        window.requestAnimationFrame(this.increaseX)
    }

    stopIncreaseX = (ev) => {
        this.setState({...this.state, toggleIncreaseX: false})
    }
    
  render() {
    return <div>
        {/*
        <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
        */}
        <Sidebar isOpen={this.state.sidebarOpen} changeSidebarOpen={this.changeSidebarOpen} changeSize={this.changeSize}
        startIncreaseX={this.startIncreaseX}
        stopIncreaseX={this.stopIncreaseX}
        />
        <Content />
        <Graph
        changeSidebarOpen={this.changeSidebarOpen}
        nodeRadius={this.state.nodeRadius}
        xVal={this.state.x}
        />
        
    </div>
  }
}