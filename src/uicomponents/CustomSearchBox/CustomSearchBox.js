import React,{ useState } from 'react'
import './CustomSearchBox.css'

const CustomSearchBox = ({getSearchKey}) => {
    const [focus, setFocus] = useState(false)
    const [borderFocus, setBorderFocus] = useState(false)
    const handleFocus=(e)=>{
        setFocus(true)
        setBorderFocus(true)
    }
    const handleFocusOut = (e)=>{
        if(e.target.value === "") setFocus(false)
        setBorderFocus(false)
    }

  return (
    <div className="search_custom_container">
        <div className="search_custom_textField" style={borderFocus? {border:"2px solid #1976d2"}: {border:"1px solid rgba(0, 0, 0, 0)"}}>
            <img src='/img/search.png'/>
            <p className={focus ? 'search_custom_focusp': 'search_custom_nonfocusp'} style={borderFocus?{color:"#1976d2"}:{color:"#666"}}>Search</p>
            <input type="text" name="search" onFocus={handleFocus} onBlur={handleFocusOut} onChange={e=>getSearchKey(e.target.value)}/>
        </div>
    </div>
  )
}

export default CustomSearchBox