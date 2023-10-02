import React from 'react'
import './CustomSelector.css'
import { useEffect, useRef, useState } from 'react'
import { isEmpty } from '../../utils/common'



const CustomSelector = ({ required, defaultSelected, name, onChange, label, selectOptions, disabled, update }) => {
  const [focus, setFocus] = useState(false)
  const [borderFocus, setBorderFocus] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const [selected, setSelected] = useState("");
  const [selectedObj, setSelectedObj] = useState({});
  const handleFocus = (e) => {
    if (!disabled) {
      setFocus(true);
      setBorderFocus(true);
      setShowDropDown(true);
    }
  }

  const handleFocusOut = (val) => {
    setBorderFocus(false)

    setShowDropDown(false)
  }

  // const [options, setOptions] = useState([
  //       {
  //           value: "1",
  //           text: "Option - 1",
  //           active: false
  //       },
  //       {
  //           value: "2",
  //           text: "Option - 2"
  //       },
  //       {
  //           value: "3",
  //           text: "Option - 3"
  //       }
  // ]);

  const handleOptionSelected = (i) => {
    setShowDropDown(false)
    selectOptions.map((e, index) => {
      if (index === i) {
        setSelected(e.text)
        setSelectedObj(e)
        e.active = true
      } else {
        e.active = false
      }
      return e
    })
  }

  // useEffect(()=>{
  //   if(defaultSelected){
  //     const tempSelected = selectOptions.filter(e => e.value === defaultSelected)
  //     setSelectedObj(tempSelected)
  //     setSelected(tempSelected[0]?.text)
  //     setFocus(true);
  //   }
  // },[])
  useEffect(() => {
    if (!isEmpty(selectedObj)) onChange(selectedObj);
  }, [selectedObj])


  useState(() => {
    if (defaultSelected === "") {
      setFocus(false)
      const tempSelected = selectOptions?.filter(e => e.value === defaultSelected)
      setSelectedObj(tempSelected)
      setSelected(tempSelected[0]?.text)
    } else {
      setFocus(true)
      const tempSelected = selectOptions?.filter(e => e.value === defaultSelected)
      setSelectedObj(tempSelected)
      setSelected(tempSelected[0]?.text)
    }
  }, [])

  const getText = (defaultSelect) => {
    const tempSelected = selectOptions?.filter(e => e.value === defaultSelect)
    return tempSelected[0]?.text
  }

  return (
    <>

      <div className="custom_search_container">
        <div className="custom_search_textField" style={borderFocus ? { border: "2px solid #1976d2" } : { border: "1px solid rgba(0, 0, 0, 0.288)" }}>
          <p className={focus ? 'custom_search_focusp' : 'custom_search_nonfocusp'} style={borderFocus ? { color: "#1976d2" } : { color: "#666" }}>{label} {required ? "*" : ""}</p>
          <input type="text" value={update ? getText(defaultSelected) : selected} name={name} onFocus={handleFocus} onBlur={handleFocusOut} disabled={disabled} />
          <img src="/img/down-arrow.png" />
        </div>
        <div className="custom_search_options_parent" style={showDropDown === true ? { visibility: "visible", transition: "all 0.2s" } : { visibility: "hidden", transition: "all 0.2s" }}>
          <div className='custom_search_options'>
            {selectOptions?.map((e, i) => (
              <div className={e?.active ? 'custom_search_option_item_active' : 'custom_search_option_item'} onClick={() => { handleOptionSelected(i) }}>{e.text}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomSelector