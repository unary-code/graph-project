import React, { Component } from 'react'

export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = { showSidebar: false};
    }

    clickNode = () => {
        console.log("clickNode() RUN");
        /*
        Do something here to render a Sidebar component.
        Option 1: Create a DOM element of custom class Sidebar.
        Option 2: Toggle a boolean variable and then in the render()
        of this Graph class, you will write {isShown && <Sidebar .../>}
        */
    
        console.log("this.showSidebar=", this.state.showSidebar);
    
        const curShowSidebar = this.state.showSidebar;
        //this.setState({showSidebar: curShowSidebar});
    }

    render() {
        

        /*<h3 className="block">TEST MESSAGE</h3>*/
    return <svg width="500" height="500" className="block">

  <circle id="circle1" cx="50" cy="50" r={this.props.nodeRadius} fill="red" onMouseMove={() => console.log('foo')} onMouseEnter={(ev) => {ev.target.setAttribute('stroke', 'black'); ev.target.setAttribute('stroke-opacity', 1);}}
  onMouseLeave={(ev) => {ev.target.setAttribute('stroke-opacity', 0);}}
  //onClick={this.clickNode()}
  //onClick={() => {this.setState({showSidebar: !this.state.showSidebar})}}
  onClick={() => this.props.changeSidebarOpen()}
  />
  <circle id="circle2" cx="150" cy="50" r="20" fill="green"/>
  
  {this.state.showSidebar &&
  <rect x="80" y="80" width="30" height="30" />
    }
    </svg>
    
    }
}