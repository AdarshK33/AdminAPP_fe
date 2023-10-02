import React from 'react'
import './CustomMultiSelector.css'
import { useEffect, useRef, useState } from 'react'



const CustomMultiSelector = ({ required, name, defaultSelected, onChange, label, selectOptions = [], update, disabled }) => {
  const [focus, setFocus] = useState(false)
  const [borderFocus, setBorderFocus] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const [selected, setSelected] = useState("");
  const [selectedObj, setSelectedObj] = useState({});
  const [checked, setChecked] = useState([])
  const handleFocus = () => {
    if (!disabled) {
      setFocus(true);
      setBorderFocus(true);
      setShowDropDown(true);
    }
  }
  const handleFocusOut = () => {
    setBorderFocus(false)

    setShowDropDown(false)
  }

  const handleChecked = (e) => {
    if (e.target.checked) {
      setChecked(prev => [...prev, selectOptions[e.target.value]])
    } else {
      setChecked(prev => prev.filter(item => selectOptions[e.target.value].value !== item.value))
    }
  }

  const handleOptionSelected = (evalue) => {
    setShowDropDown(false)
    selectOptions.map((e) => {
      if (e.value === evalue) {
        // setSelected(e.text)
        // setSelectedObj(e)
        e.active = true
        const checker = checked.filter(item => e.value === item.value)
        checker.length === 0 ? setChecked(prev => [...prev, e]) : setChecked(prev => prev.filter(item => e.value !== item.value))
      } else {
        e.active = false
      }
      return e
    })
  }

  const handleArrayofOptionSelected = (evalue_arr) => {
    setShowDropDown(false)
    selectOptions.map((e) => {
      if (evalue_arr.includes(e.value)) {
        // setSelected(e.text)
        // setSelectedObj(e)
        e.active = true
        const checker = checked.filter(item => e.value === item.value)
        checker.length === 0 ? setChecked(prev => [...prev, e]) : setChecked(prev => prev.filter(item => e.value !== item.value))
      } else {
        e.active = false
      }
      return e
    })
  }

  useEffect(() => {
    onChange(selectedObj);
  }, [selectedObj])

  useEffect(() => {
    const valuefortext = checked.map(e => e.text)
    setSelected(valuefortext)
    setSelectedObj(checked)
  }, [checked])

  useEffect(() => {
    if (update) {
      setFocus(true)
      if (defaultSelected === "") {
        setSelectedObj([])
      } else {
        const tempSelected = selectOptions.filter(e => (defaultSelected + '').toString().split(',').filter(itemI => itemI === e.value).length > 0)
        setSelectedObj(tempSelected)
        setSelected(tempSelected[0]?.text)
      }
    }
  }, [])


  // const getTextForArray = (defaultSelect) => {
  //   defaultSelect = defaultSelect + ''.split(',')
  //   const tempSelected = selectOptions.filter(e => defaultSelect.includes(e.value))
  //   const textTempSelected = tempSelected.map(e => e.text)
  //   return textTempSelected.toString()
  // }

  //Employee display in update project module
  const getTextForArray = (defaultSelect) => {
    const tempSelected = selectOptions.filter(e => defaultSelect?.includes(e?.value.toString()));
    const textTempSelected = tempSelected.map(e => e?.text);
    return textTempSelected.join(',');

  }

  return (
    <>

      <div className="custom_search_container">
        <div className="custom_search_textField" style={borderFocus ? { border: "2px solid #1976d2" } : { border: "1px solid rgba(0, 0, 0, 0.288)" }}>
          <p className={focus ? 'custom_search_focusp' : 'custom_search_nonfocusp'} style={borderFocus ? { color: "#1976d2" } : { color: "#666" }}>{label} {required ? "*" : ""}</p>
          <input type="text" value={update ? getTextForArray(defaultSelected) : selected} name={name} onFocus={handleFocus} onBlur={handleFocusOut} disabled={disabled} />
          <img src="/img/down-arrow.png" />
        </div>
        <div className="custom_search_options_parent" style={showDropDown === true ? { visibility: "visible", transition: "all 0.2s" } : { visibility: "hidden", transition: "all 0.2s" }}>
          <div className='custom_search_options'>
            {selectOptions.map((e, i) => (
              <div className={e?.active ? 'custom_search_option_item_active' : 'custom_search_option_item'} onClick={() => { handleOptionSelected(e.value) }}>
                {update ?
                  <>
                    {e.text}
                  </>
                  :
                  <>
                    {(checked.filter(item => item.value === e.value).length > 0) ? <input type="checkbox" name="checkbox" value={e.value} checked /> : <input type="checkbox" name="checkbox" value={e.value} />}
                    {e.text}
                  </>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomMultiSelector