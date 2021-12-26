// src/components/Sidebar.js
import React, { Component } from 'react'
import SidebarIcon from './SidebarIcon'
import SidebarContent from './SidebarContent'

export default class Sidebar extends Component {
  /*
    state = {
        isOpen: this.props.isOpen
      }
      */

//   renderSidebar = () => {
//     if (!this.state.isOpen) {
//       return null
//     }

//     return <div className="sidebar">
//       <div className="sidebar-link">Home</div>
//       <div className="sidebar-link">About</div>
//       <div className="sidebar-link">Contact</div>
//    </div>
//  }

 toggleSidebar = () => {
   /*
   this.setState(prevState => ({
     isOpen: !prevState.isOpen
   }))
   */
 }


render() {
    return <div className="sidebar-container">
      <SidebarContent isOpen={this.props.isOpen} changeSize={(ev) => this.props.changeSize(ev)}/>
      <div className="sidebar-icon">
        <SidebarIcon
          isOpen={this.props.isOpen}
          handleClick={() => this.props.changeSidebarOpen()}

        />
      </div>
    </div>
  }
}