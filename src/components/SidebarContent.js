import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

// MODIFY THE DURATION TIME IN ORDER TO CHANGE HOW LONG THE TRANSITION TAKES
const duration = 1000

const sidebarStyle = {
  transition: `width ${duration}ms`
}
const sidebarTransitionStyles = {
  entering: { width: 0 },
  entered: { width: '200px' },
  exiting: { width: '200px' },
  exited: { width: 0 }
}
const linkStyle = {
  transition: `opacity ${duration}ms`
}
const linkTransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 }
}
export default class SidebarContent extends Component {

  renderLinks = () => {
    return <Transition in={this.props.isOpen} timeout={duration}>
      {(state) => (
        <div style={{
          ...linkStyle,
          ...linkTransitionStyles[state]
        }}>
          <div className="sidebar-link">Home</div>
          <div className="sidebar-link">About</div>
          <div className="sidebar-link">Contact</div>
          <div className="slidecontainer">
        <input type="range" min="1" max="100" className="slider" id="myRange" onChange={(ev) => this.props.changeSize(ev)}/>
        <input type="button" id="increaseX" onMouseDown={(ev) => this.props.startIncreaseX(ev)} onMouseUp={(ev) => this.props.stopIncreaseX(ev)}/>
        </div>
        </div>
      )}
    </Transition>
  }
  
  render() {
    return <Transition in={this.props.isOpen} timeout={duration}>
      {(state) => (
        <div className="sidebar" style={{
          ...sidebarStyle,
          ...sidebarTransitionStyles[state]
        }}>
          {this.renderLinks()}
        </div>
      )}
    </Transition>
  }
}
