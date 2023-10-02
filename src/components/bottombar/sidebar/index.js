import Sidebargroup from '../../../uicomponents/sidebargroup.js'
import  { SidebarDataAdmin, SidebarDataMan, SidebarDataUser } from '../../../utils/sidebar.js'
import './sidebar.css'

const Sidebar = (props) => {
  const role = localStorage.getItem("role")
  return (
    <div className="sidebar" style={props.collapse ? { marginRight: 0, right: 0, transition: "all 1s" } : { marginRight: -198, right: 205, transition: "all 1s" }}>
      <div className='sidebarContainer'>
        <Sidebargroup data={role === "admin" ? SidebarDataAdmin : role === "manager" ? SidebarDataMan : role === "user" ? SidebarDataUser : ""} />
      </div>
    </div>
  )
}

export default Sidebar