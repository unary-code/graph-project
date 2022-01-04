// src/components/GraphPackage.js
import React, { Component } from 'react'
//import { placeholderContent } from '../placeholderContent'

import Sidebar from './Sidebar'
import Graph from './Graph'

const INCREASE_X_RATE = 3;
const NODE_RADIUS = 25;
const SVG_WIDTH = 500;
const SVG_HEIGHT = 500;

const DEFAULT_HELPER_EDGE = {
    startX: 0,
    startY: 0,
    startId: null,
    endX: 1,
    endY: 1,
    endId: null,
    visible: false
};

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
            selectedNode: null,
            borderedNode: null,
            nodeRadius: 20,
            toggleIncreaseX: false,
            x: 30,
            numNodes: 0,
            numNodesEver: 0,
            numEdges: 0,
            numEdgesEver: 0,
            nodes: {},
            edges: {},
            addingEle: {
                node: false,
                edge: false
            },
            helperNode: {
                x: 0,
                y: 0,
                visible: false
            },
            helperEdge: DEFAULT_HELPER_EDGE
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

    handleClickNode = (ev) => {

        // this.state.helperNode will show a node when adding a node anywhere on the svg.
        // this.state.helperEdge will show a edge after you click a node

        const clickedNode = this.state.nodes[ev.target.id];

        const clientCoords = {x: ev.clientX, y: ev.clientY};
        const currentTargetRect = ev.currentTarget.getBoundingClientRect();
        const useCoords = {x: clientCoords.x - currentTargetRect.left, y: clientCoords.y - currentTargetRect.top};
        
        console.log("handleClickNode RUN");

        if (this.state.addingEle.edge) {

            if (this.state.helperEdge.visible) {
                // You have already clicked on a node.
                // This current click is on a node that should be the ending node of the edge that's being added.
                
                let newEdge = {startId: this.state.helperEdge.startId, endId: ev.target.id};

                let edgeId = 'edge'+(this.state.numEdgesEver+1);

                let newEdges = this.state.edges;
                newEdges[edgeId] = newEdge;

                this.setState({...this.state, numEdges: this.state.numEdges+1, numEdgesEver: this.state.numEdgesEver+1, helperEdge: DEFAULT_HELPER_EDGE, edges: newEdges},
                    function() {
                        console.log(this.state.edges);
                    });

            } else {

                // Make the helperEdge visible

                let newHelperEdge = this.state.helperEdge;

                newHelperEdge.startX = clickedNode.x;
                newHelperEdge.startY= clickedNode.y;
                newHelperEdge.startId = ev.target.id;

                newHelperEdge.endX = clickedNode.x+10;
                newHelperEdge.endY= clickedNode.y+20;
                // newHelperEdge.endX = useCoords.x;
                // newHelperEdge.endY= useCoords.y;

                newHelperEdge.visible = true;

                console.log(newHelperEdge);
                this.setState({...this.state, helperEdge: newHelperEdge});
            }

            return;
        }

        this.changeShowSidebar(ev);

    }

    // FROM GRAPH.JS END
    
    changeShowSidebar = (ev) => {
        console.log("changeShowSidebar called")

        const curSelectedNodeId = this.state.selectedNode;

        const clickedNodeId = ev.target.id;

        let newSelectedNodeId = clickedNodeId;

        console.log("ev.target=", ev.target);
        console.log("clickedNodeId=", clickedNodeId);

        /*
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
        */

        if (curSelectedNodeId) {
            if (curSelectedNodeId.localeCompare(clickedNodeId) == 0) {
                // This means that the node that was just clicked on
                // was already selected.
                // Therefore, you should deselect this node.

                newSelectedNodeId = null;

            }

        }

        const newShowSidebar = !(newSelectedNodeId == null);

        if (newSelectedNodeId == null) {
            // Deselect the stroke
            ev.target.setAttribute('stroke-opacity', 0);
        } else {
            // Select the stroke
            ev.target.setAttribute('stroke-opacity', 1);
        }

        this.setState({...this.state, showSidebar: newShowSidebar, selectedNode: newSelectedNodeId}, function() {
            console.log("showSidebar=", this.state.showSidebar)
            console.log("showSidebar=", this.state.selectedNode)
        });


    }

    changeShowSidebarFromIcon = (ev) => {
        console.log("changeShowSidebar called");

        const curSelectedNodeId = this.state.selectedNode;

        if (curSelectedNodeId) {

        } else {
            return;
        }

        // Don't change the selectedNode
        this.setState({...this.state, showSidebar: !this.state.showSidebar});
    }

    changeSize = (ev) => {
        console.log("changeSize called")

        let newNodes = this.state.nodes;

        if (this.state.selectedNode) {
        newNodes[this.state.selectedNode].radius = ev.target.value;
        this.setState({...this.state, nodes: newNodes}, function() {
            console.log("nodes=", this.state.nodes);
        });

        //this.setState({...this.state, nodeRadius: ev.target.value});
        
        }
    }

    increaseX = () => {
        console.log("increaseX called")

        //selectedNode
        if (this.state.selectedNode && this.state.toggleIncreaseX) {

        let newNodes = this.state.nodes;
        newNodes[this.state.selectedNode].x += INCREASE_X_RATE;

        this.setState({...this.state, nodes: newNodes});
        //console.log("x=", this.state.x)
        
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

    deleteNode = (ev) => {

        console.log("deleteNode RUN");

        if (this.state.selectedNode) {
            // Delete the property key with value selectedNode from this.state.nodes

            let newNodes = {};
            Object.entries(this.state.nodes).forEach(([key, value]) => {
                console.log("key="+key+",value="+value)
                if (key != this.state.selectedNode) {
                newNodes[key] = value;
                }
            })
            // newNodes[this.state.selectedNode] = undefined;
            // this.state.numNodesEver will stay unchanged

            let newEdges = {};
            let newNumEdges = this.state.newNumEdges;
            //let newNumEdgesEver = this.state.newNumEdgesEver;

            Object.entries(this.state.edges).forEach(([key, value]) => {
                console.log("key="+key+",value="+value)
                if (value.startId != this.state.selectedNode && value.endId != this.state.selectedNode) {
                newEdges[key] = value;
                } else {
                    newNumEdges -= 1;
                }
            })

            this.setState({...this.state, showSidebar: false, selectedNode: null, numNodes: this.state.numNodes-1, nodes: newNodes, numEdges: newNumEdges, edges: newEdges});

            console.log("newNodes=", newNodes);
        }
    }
    
    overlapWithCircle(coords, circleEle) {
        // coords represents the coordinates of the center of the new circle
        // circleEle represents the coordinates of the center of the already added circle

        const distBetween = Math.sqrt((coords.x-circleEle.x)*(coords.x-circleEle.x) + (coords.y-circleEle.y)*(coords.y-circleEle.y));

        return distBetween < 2*NODE_RADIUS;
    }

    isOverlap = (coords) => {
        //coords is the mouse coordinates with respect to the top-left corner of the svg element

        const numNodes = this.state.numNodes;

        // Go through every node

        for (let curNodeId in this.state.nodes) {
            const curNode = this.state.nodes[curNodeId];
            if (this.overlapWithCircle(coords, curNode)) {
                return true;
            }
        }

        /*
        for (let nodeInd=0; nodeInd<numNodes; nodeInd++) {
            const curNode = this.state.nodes[nodeInd];
            if (this.overlapWithCircle(coords, curNode)) {
                return true;
            }
        }
        */

        return false;
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
        let newNumNodes = this.state.numNodes+1;
        let newNumNodesEver = this.state.numNodesEver+1;

        // There's no need for .toString() to convert the integer to a string?
        let nodeId = 'node'+(newNumNodesEver);

        //nodes.append({id: nodeId, x: nodeCoords.x, y: nodeCoords.y});

        let newNodes = this.state.nodes;
        console.log("nodeId=", nodeId);
        newNodes[nodeId] = {x: nodeCoords.x, y: nodeCoords.y, radius: NODE_RADIUS};

        this.setState({...this.state, numNodes: newNumNodes, numNodesEver: newNumNodesEver, nodes: newNodes},
            function() {
                console.log(this.state.nodes);
            });

        /*
        this.setState({...this.state, nodes: [...this.state.nodes, {id: nodeId, x: nodeCoords.x, y: nodeCoords.y}]},
            function() {
                console.log(this.state.nodes);
            });
            */

    }

    handleSvgEnter = (ev) => {

        console.log("handleSvgEnter RUN");

        // If the user has clicked a button to add a node
        if (this.state.addingEle.node) {
            // Make the circle that represents the potential node visible
            this.setState({...this.state, helperNode: {...this.state.helperNode, visible: true}});
        }
    }

    handleSvgLeave = (ev) => {

        console.log("handleSvgLeave RUN");

        // Make the circle that represents the potential node visible
        this.setState({...this.state, helperNode: {...this.state.helperNode, visible: false}});

    }
    

    handleSvgMove = (ev) => {
        // Update the position of the circle that represents the potential node

        const clientCoords = {x: ev.clientX, y: ev.clientY};
        const currentTargetRect = ev.currentTarget.getBoundingClientRect();
        const useCoords = {x: clientCoords.x - currentTargetRect.left, y: clientCoords.y - currentTargetRect.top};

        if (this.state.addingEle.node) {
            // Assume that helperNode.visible is already true

            this.setState({...this.state, helperNode: {...this.state.helperNode, x: useCoords.x, y: useCoords.y}});
        }

        if (this.state.addingEle.edge) {
            // Assume that helperEdge.visible is already true

            //let newHelperEdge = this.state.helperEdge;
            this.setState({...this.state, helperEdge: {...this.state.helperEdge, endX: useCoords.x, endY: useCoords.y}});
            
        }
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

            if (this.state.addingEle.node) {
            console.log("Left click");

            console.log("clientCoords=", clientCoords);
            console.log("currentTargetRect.left=", currentTargetRect.left);
            console.log("currentTargetRect.top=", currentTargetRect.top);
            console.log("window pageYOffset=", window.pageYOffset);

            console.log("useCoords=", useCoords);

            // DETECT if a node centered on useCoords would overlap with any previously
            // added nodes.

            const isOverlap = this.isOverlap(useCoords);

            if (isOverlap) {
                // Don't do anything
            } else {
                this.generateNode(useCoords);
            }
        
            }

        } else if (ev.type == 'contextmenu') {
            //Currently, right clicks aren't detected because
            // when a right click is performed, this brings up the default
            // menu.
            console.log("Right click");
        }

    }

    toggleAddingEle = (ev) => {
        // Use ev.target.id
        // Assume that input button doesn't have inner child components because if it does, then
        // a click within the input button could make the ev.target.id the id of the child component, not the input button.

        const targetId = ev.target.id;
        const eleName = targetId.substring(12).toLowerCase();

        console.log("eleName=", eleName);

        const newAddingEleName = !this.state.addingEle[eleName];

        let newAddingEle = this.state.addingEle;
        Object.keys(this.state.addingEle).forEach((curEleName) => { newAddingEle[curEleName] = false});
        newAddingEle[eleName] = newAddingEleName;

        console.log("newAddingEle=", newAddingEle);

        
        this.setState({...this.state, showSidebar: false, selectedNode: null, borderedNode: null, addingEle: newAddingEle});
    }

    toggleAddingNode = (ev) => {
        // for every type of element X you can add, you need to set addingX to false

        const prevAddingNode = this.state.addingEle.node;

        let newAddingEle = this.state.addingEle;
        Object.keys(this.state.addingEle).forEach((eleName) => { newAddingEle.eleName = false});

        this.setState({...this.state, addingNode: !this.state.addingNode});
    }

    toggleAddingEdge = (ev) => {
        this.setState({...this.state, addingEdge: !this.state.addingEdge});
    }

  render() {
    return <div>
        <div className="horizontalSidebar">
            <input type="button" name="toggleAddingNode" id="toggleAddingNode" onClick={(ev) => this.toggleAddingEle(ev)} value={this.state.addingEle.node ? "Cancel adding nodes" : "Add nodes"} />
            <input type="button" name="toggleAddingEdge" id="toggleAddingEdge" onClick={(ev) => this.toggleAddingEle(ev)} value={this.state.addingEle.edge ? "Cancel adding edges" : "Add edges"} />
        </div>

        {/*
        <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
        */}
        <Sidebar isOpen={this.state.showSidebar}
        selectedId={this.state.selectedNode}
        changeShowSidebar={this.changeShowSidebarFromIcon}
        changeSize={this.changeSize}
        startIncreaseX={this.startIncreaseX}
        stopIncreaseX={this.stopIncreaseX}
        deleteNode={this.deleteNode}
        />
        {/*
        <Graph
        changeSidebarOpen={this.changeSidebarOpen}
        nodeRadius={this.state.nodeRadius}
        xVal={this.state.x}
        />
        */}

    <svg width={SVG_WIDTH} height={SVG_HEIGHT} className="block"
    onMouseEnter={(ev) => this.handleSvgEnter(ev)}
    onMouseLeave={(ev) => this.handleSvgLeave(ev)}
    onMouseMove={(ev) => this.handleSvgMove(ev)}
    onClick={(ev) => this.handleSvgClick(ev)}
    
    >
        {
            Object.entries(this.state.nodes).map(([nodeId, node]) => <circle key={nodeId} id={nodeId} cx={node.x} cy={node.y} r={node.radius} fill="#aa0000"
            /*
            onMouseEnter={(ev) => {ev.target.setAttribute('stroke', 'black'); ev.target.setAttribute('stroke-width', '5'); ev.target.setAttribute('stroke-opacity', 1);}}
            onMouseLeave={(ev) => { if (nodeId!=this.state.selectedNode) {ev.target.setAttribute('stroke-opacity', 0);}}}
            */
            onMouseEnter={(ev) => {this.setState({...this.state, borderedNode: nodeId})}}
            onMouseLeave={(ev) => { if (nodeId!=this.state.selectedNode) {this.setState({...this.state, borderedNode: null})}}}
            onClick={(ev) => this.handleClickNode(ev)}
            style={{stroke: 'black', strokeWidth: '5', strokeOpacity: (this.state.borderedNode==nodeId)?'1':'0'}}
            />)
        }

        {
            <>
            <defs>
            {
                    Object.entries(this.state.edges).map(([edgeId, edge]) =>  <marker id={"marker"+edgeId} key={"marker"+edgeId} markerWidth="10" markerHeight="7" 
                    refX="0" refY="3.5" orient="auto"
                    >
                    <polygon points="0 0, 10 3.5, 0 7" />
                    </marker>)
                }
 
        </defs>
        {
            Object.entries(this.state.edges).map(([edgeId, edge]) => <line key={"line"+edgeId} x1={this.state.nodes[this.state.edges[edgeId].startId].x} y1={this.state.nodes[this.state.edges[edgeId].startId].y}
            x2={this.state.nodes[this.state.edges[edgeId].endId].x-10} y2={this.state.nodes[this.state.edges[edgeId].endId].y-3.5} stroke="#000" 
            strokeWidth="1" markerEnd={"url(#marker"+edgeId+")"} 
            />)
        }

        </>
        }

        {
            <circle key="helperNode" id="helperNode" cx={this.state.helperNode.x} cy={this.state.helperNode.y} r={NODE_RADIUS} fill="grey"
            visibility={this.state.helperNode.visible ? "visible" : "hidden"}
            opacity="0.4"
            />
        }

        {
            <>
             <defs>
             <marker id="arrowHelperEdge" markerWidth="10" markerHeight="7" 
             refX="0" refY="3.5" orient="auto"
             visibility={this.state.helperEdge.visible ? "visible" : "hidden"}
             opacity="0.4"
             >
               <polygon points="0 0, 10 3.5, 0 7" />
                 {/*
               <polygon points="-10 -3.5, 0 0, -10 3.5" />
                 */}
             </marker>
           </defs>
           <line x1={this.state.helperEdge.startX} y1={this.state.helperEdge.startY} x2={this.state.helperEdge.endX-10} y2={this.state.helperEdge.endY-3.5} stroke="#000" 
           strokeWidth="1" markerEnd="url(#arrowHelperEdge)" 
           visibility={this.state.helperEdge.visible ? "visible" : "hidden"}
           opacity="0.4"/>
           </>
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
