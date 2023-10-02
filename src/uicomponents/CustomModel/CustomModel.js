import React, { createContext, useState } from 'react'
import './CustomModel.css'

export const CustomModelComponent = createContext()
const CustomModel = (props) => {
  const [Component, setComponent] = useState(<></>)
  const [showModel, setShowModel] = useState(false)


  const getComponent = (Comp, show)=>{
    setComponent(Comp);
    setShowModel(show);
  }

  const handleEmptySpaceClick= ()=>{
    setShowModel(false);
  }
  return (
    <>
        <CustomModelComponent.Provider value={getComponent}>
          {showModel &&
            <div className='CustomModelMainContainer'>
                <div className='CustomModelCenterContainer'>
                    <div className='CustomModelContainer'>
                        {Component}
                    </div>
                    <div className="emptyspaceCustomContainer" onClick={handleEmptySpaceClick}></div>
                </div>
            </div>
          }
          {props.children}
        </CustomModelComponent.Provider>
    </>
  )
}

export default CustomModel