import React from 'react'
import './contentbar.css'

const ContentBar = (props) => {
  return (
    <div className="content">
      <div className='cardcontainer'>
        <div className='card'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default ContentBar