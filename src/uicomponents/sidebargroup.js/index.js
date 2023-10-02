import React, { useState } from 'react'
import './sidebargroup.css'
import {NavLink} from "react-router-dom"

const Sidebargroup = ({data, handleCollapse}) => {
  
    return (
        <> {
            data && data.map((e,index1) => (
                <div className="group" key={index1}>
                    <p className="mainhead">{e.mainHead}</p>
                    {
                    e.items.map((item,index) => (
                        <NavLink key={index} to={item.path} className="sideitem" onClick={handleCollapse}>
                            <img src={item.img} alt=""/>
                            <a>{item.item}</a>
                        </NavLink> 
                    ))
                }
                    <div className="border"></div>
                </div>
            ))
        } </>
    )
}

export default Sidebargroup
