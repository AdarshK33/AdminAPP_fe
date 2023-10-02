import React from 'react'
import './bottom.css'
import ContentBar from './contentbar'
import Sidebar from './sidebar'

const BottomBar = (props) => {
  return (
    <div className="bottom">
        {props.Desktopsidebar && <Sidebar collapse={props.collapse}/>}
        <ContentBar collapse={props.collapse}>
          {props.children}
        </ContentBar>
      </div>
  )
}

export default BottomBar