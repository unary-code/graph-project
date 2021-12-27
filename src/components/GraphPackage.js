// src/components/GraphPackage.js
import React, { Component } from 'react'
//import { placeholderContent } from '../placeholderContent'

import Sidebar from './Sidebar'
import Graph from './Graph'

const INCREASE_X_RATE = 3;
const NODE_RADIUS = 25;
const SVG_WIDTH = 500;
const SVG_HEIGHT = 500;

export default class GraphPackage extends Component {

    /*
    state = {
        sidebarOpen: true,
        nodeRadius: 20,
        toggleIncreaseX: false,
        x: 30
    }
    */

    // FROM GRAPH.JS START

    constructor(props) {
        super(props);
        this.state = {
            showSidebar: false,
            nodeRadius: 20,
            toggleIncreaseX: false,
            x: 30,
            nodes: []
        };
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

    // FROM GRAPH.JS END
    
    changeShowSidebar = (ev) => {
        console.log("changeShowSidebar called")

        const curSelectedNodeId = this.state.selectedNode;

        const clickedNodeId = ev.target.id;

        let newSelectedNodeId = clickedNodeId;

        console.log("ev.target=", ev.target);
        console.log("clickedNodeId=", clickedNodeId);

        if (clickedNodeId.localeCompare("nodeSidebarIcon") == 0) {
            // This means that the clicked element was the sidebar icon
            // This assumes that there's only one element with id "nodeSidebarIcon"

            
            if (curSelectedNodeId) {

            } else {
                return;
            }

            // Don't change the selectedNode
            this.setState({...this.state, showSidebar: !this.state.showSidebar});
            return;
        }

        if (curSelectedNodeId) {
            if (curSelectedNodeId.localeCompare(clickedNodeId) == 0) {
                // This means that the node that was just clicked on
                // was already selected.
                // Therefore, you should deselect this node.

                newSelectedNodeId = null;
            }

        }

        const newShowSidebar = !(newSelectedNodeId == null);

        this.setState({...this.state, showSidebar: newShowSidebar, selectedNode: newSelectedNodeId}, function() {
            console.log("showSidebar=", this.state.showSidebar)
            console.log("showSidebar=", this.state.selectedNode)
        });


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
    
    generateNode = (coords) => {
        // if the node that is centered on coords would be at least partially outside
        // of the bounds of the svg element, then make sure to generate a node that is
        // centered the closest possible to coords but does not go outside of the svg element bounds.

        let nodeCoords = coords;
        //console.log("this.NODE_RADIUS=", this.NODE_RADIUS);
        if (nodeCoords.x < NODE_RADIUS) {
            nodeCoords.x = NODE_RADIUS;
        }
        if (nodeCoords.y < NODE_RADIUS) {
            nodeCoords.y = NODE_RADIUS;
        }
        if (nodeCoords.x > SVG_WIDTH-NODE_RADIUS) {
            nodeCoords.x = SVG_WIDTH-NODE_RADIUS;
        }
        if (nodeCoords.y > SVG_HEIGHT-NODE_RADIUS) {
            nodeCoords.y = SVG_HEIGHT-NODE_RADIUS;
        }

        // Generate the node with center nodeCoords

        // Get number of existing nodes already
        let numNodes = this.state.nodes.length;

        // There's no need for .toString() to convert the integer to a string?
        let nodeId = 'node'+(numNodes+1);

        //nodes.append({id: nodeId, x: nodeCoords.x, y: nodeCoords.y});

        this.setState({...this.state, nodes: [...this.state.nodes, {id: nodeId, x: nodeCoords.x, y: nodeCoords.y}]},
            function() {
                console.log(this.state.nodes);
            });

    }

    handleSvgClick = (ev) => {
        // Handle a click on the Svg that represents the graph.

        // Should do different things if the click is a left click vs a right click.
        // If left click, that can generate a node at the current mouse position.
        // If right click, that can pop up a custom menu that's coded in React.

        const clientCoords = {x: ev.clientX, y: ev.clientY};

        const currentTargetRect = ev.currentTarget.getBoundingClientRect();


        const useCoords = {x: clientCoords.x - currentTargetRect.left, y: clientCoords.y - currentTargetRect.top};

        if (ev.type == 'click') {
            console.log("Left click");

            console.log("clientCoords=", clientCoords);
            console.log("currentTargetRect.left=", currentTargetRect.left);
            console.log("currentTargetRect.top=", currentTargetRect.top);
            console.log("window pageYOffset=", window.pageYOffset);

            console.log("useCoords=", useCoords);
            this.generateNode(useCoords);
        } else if (ev.type == 'contextmenu') {
            //Currently, right clicks aren't detected because
            // when a right click is performed, this brings up the default
            // menu.
            console.log("Right click");
        }

    }

  render() {
    return <div>
        {/*
        <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
        */}
        <Sidebar isOpen={this.state.showSidebar} changeShowSidebar={this.changeShowSidebar} changeSize={this.changeSize}
        startIncreaseX={this.startIncreaseX}
        stopIncreaseX={this.stopIncreaseX}
        />
        {/*
        <Graph
        changeSidebarOpen={this.changeSidebarOpen}
        nodeRadius={this.state.nodeRadius}
        xVal={this.state.x}
        />
        */}

    <svg width="500" height="500" className="block" onClick={(ev) => this.handleSvgClick(ev)}>
        {
            this.state.nodes.map((node) => <circle key={node.id} id={node.id} cx={node.x} cy={node.y} r={NODE_RADIUS} fill="grey"
            
            onMouseEnter={(ev) => {ev.target.setAttribute('stroke', 'black'); ev.target.setAttribute('stroke-opacity', 1);}}
            onMouseLeave={(ev) => {ev.target.setAttribute('stroke-opacity', 0);}}
            onClick={(ev) => this.changeShowSidebar(ev)}
            />)
        }

        {/*
    <circle id="circle1" cx={this.state.x} cy="50" r={this.state.nodeRadius} fill="red"
    onMouseMove={() => console.log('foo')}
    onMouseEnter={(ev) => {ev.target.setAttribute('stroke', 'black'); ev.target.setAttribute('stroke-opacity', 1);}}
    onMouseLeave={(ev) => {ev.target.setAttribute('stroke-opacity', 0);}}
    //onClick={this.clickNode()}
    //onClick={() => {this.setState({showSidebar: !this.state.showSidebar})}}
    onClick={(ev) => this.changeShowSidebar(ev)}
    />
    <circle id="circle2" cx="150" cy="50" r="20" fill="green"/>
        */}

    {this.state.showSidebar &&
    <rect x="80" y="80" width="30" height="30" />
    }
    </svg>
        
    </div>
  }
}