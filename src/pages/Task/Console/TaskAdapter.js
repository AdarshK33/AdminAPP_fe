import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './TaskAdapter.css'
const TaskAdapter = ({item}) => {

  const task_data = useSelector(state => state?.task?.data)

  return (
    <>
        {task_data?.final_data && task_data?.final_data.filter(a => a.task_id===item.task_id).map(e =>
        
        <div className={e.is_today_update ? 'task_custDragInnerItems_updated' : 'task_custDragInnerItems'}>
            <div className="task_custDragitemMain">
                <div className="task_dragcreationTime">
                <p>{e.taskStartTime}</p>
                </div>
                <div className="task_dragcreationCont">
                <p>{e.task_title}</p>
                </div>
                <div className="task_dragcreationTo">
                <p>{e.users.user_name}</p>
                </div>
            </div>
        </div>
       
        
        )}
    </>
  )
}

export default TaskAdapter