import React from 'react'
import { useSelector } from 'react-redux'
import './ProjectAdapter.css'
const ProjectAdapter = ({item}) => {
    

    const project_data = useSelector(state => state?.project?.data)
  return (
    <>
     {project_data?.data && project_data?.data.filter(a => a.project_id===item.project_id).map(e =>
        
        <div className='project_custDragInnerItems'>
            <div className="project_custDragitemMain">
                <div className="project_dragcreationTime">
                <p>{e.project_date_created}</p>
                </div>
                <div className="project_dragcreationCont">
                <p>{e.project_name}</p>
                </div>
                <div className="project_dragcreationTo">
                <p>{e.manager.user_name}</p>
                </div>
                {/* {item.content} */}
            </div>
            {/* <button
                type="button"
                onClick={() => {
                const newState = [...state];
                newState[ind].splice(index, 1);
                setState(
                    newState.filter(group => group.length)
                );
                }}
            >
                delete
            </button> */}

        </div>
        )}
    </>
  )
}

export default ProjectAdapter