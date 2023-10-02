import React from 'react'
import { NavLink } from 'react-router-dom'
import './CustomTableHeader.css'
import CustomSearchBox from '../CustomSearchBox/CustomSearchBox'

const TableHeader = ({title, addButton, getSearchKey}) => {
    return (
        <div className='tableHeadContainer'>
            <div className='tableHeader'>
                <div className='leftsidetableheader'>
                    <h3 className='contentHeading'
                        style={
                            {
                                fontSize: "14px",
                                color: "#666",
                                marginRight: "20px"
                            }
                    }>{title}</h3>
                    
                    <CustomSearchBox getSearchKey={getSearchKey}/>
                </div>

                {addButton ? 
                <NavLink to={addButton}>
                    <div className='rightsidetableheader'>
                        <div className='addItemButton'>
                            <img src="/img/addbuttonwhite.png"/>
                        </div>
                    </div>
                </NavLink>
                :
                <></>
                }

            </div>
        </div>
    )
}

export default TableHeader
