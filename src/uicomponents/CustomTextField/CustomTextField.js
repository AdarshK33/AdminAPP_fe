import React from 'react'
import './CustomTextField.css'
import { useState} from 'react'



const CustomTextField = ({required, name, value="", onChange, label,type, update, disabled}) => {
  const [focus, setFocus] = useState((type==="date" || value === "")?true:false)
  const [borderFocus, setBorderFocus] = useState(false)
  const [textVal,setTextVal] = useState(value)
  const handleFocus=(e)=>{
    setFocus(true)
    setBorderFocus(true)
  }
  const handleFocusOut = (e)=>{
    if(type !== 'date'){
      if(e.target.value === "") setFocus(false)
      setBorderFocus(false)
    }
  }

  const onChangeData = (e)=>{
    onChange(e)
    setTextVal(e.target.value);
  }

  useState(()=>{
    if(value === ""){
      setFocus(false)
      setTextVal(value)
    }else{
      setFocus(true)
      setTextVal(value)
    }
  },[])

  return (
  <>

    <div className="custom_container">
      <div className="custom_textField" style={disabled ? {border:"2px solid rgba(0, 0, 0, 0.288)"} : borderFocus? {border:"2px solid #1976d2"}: {border:"1px solid rgba(0, 0, 0, 0.288)"}}>
        <p className={(focus || value !== "" || type==="date" || type==="datetime-local") ? 'custom_focusp': 'custom_nonfocusp'} style={borderFocus?{color:"#1976d2"}:{color:"#666"}}>{label} {required ? "*": ""}</p>
        <input type={type} value={update ? value : textVal} name={name} onChange={(e)=>onChangeData(e)} onFocus={handleFocus} onBlur={handleFocusOut} disabled={disabled ? true : false}/>
      </div>
    </div>
  </>
  )
}

export default CustomTextField