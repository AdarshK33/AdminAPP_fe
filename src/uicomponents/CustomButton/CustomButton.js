
import React from 'react'
import './CustomButton.css'

const CustomButton = ({onClick,text="Submit"}) => {
  return (
    <div className='customButtonStyle' onClick={onClick}>{text}</div>
  )
}

export default CustomButton