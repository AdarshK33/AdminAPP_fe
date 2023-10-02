import React, { useState } from 'react'
import './LeafTabs.css'

const LeafTabs = ({data=[], onSelectedLeaf=()=>{}}) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const handleClick = (item, index)=>{
        onSelectedLeaf(item)
        setSelectedIndex(index)
    }
  return (
    <div className='LeafTabContainerMain'>
        <div className='LeafTabContainer'>
            {data.map((e, i)=>(
                selectedIndex === i ?
                <div className='LeafRows selectedLeafRows' onClick={()=>handleClick(e, i)}>
                    <p>{e.project_name}</p>
                    <h6 className='LeafRowsProjectId'>{e.project_id}</h6>
                </div>
                :
                <div className='LeafRows' onClick={()=>handleClick(e, i)}>
                    <p>{e.project_name}</p>
                    <h6 className='LeafRowsProjectId'>{e.project_id}</h6>
                </div>
            ))}
        </div>
        <div className='LeafTabContainerTitle'>
            <p>Select Projects</p>
        </div>
    </div>
  )
}

export default LeafTabs