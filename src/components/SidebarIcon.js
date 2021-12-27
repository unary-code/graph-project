import React from 'react'
//import { FaBars, AiFillCloseCircle } from 'react-icons/fa'
import { FaBars, FaWindowClose} from 'react-icons/fa'
const SidebarIcon = ({handleClick, isOpen}) => {
  return <span id="nodeSidebarIcon" onClick={handleClick}>
    {isOpen ? <FaWindowClose /> : <FaBars/>}
  </span>
}
export default SidebarIcon