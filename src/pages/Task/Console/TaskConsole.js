import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProjects } from '../../../redux/projectReducer'
import { clearDataStatusWise, getAllTasks, listTaskStatusWise, updateTasksByStatus } from '../../../redux/taskReducer'
import CustomConsole from '../../../uicomponents/CustomConsole/CustomConsole'
import CustomSelector from '../../../uicomponents/CustomSelector/CustomSelector'
import LeafTabs from '../../../uicomponents/LeafTabs/LeafTabs'
import TaskAdapter from './TaskAdapter'
import AddTask from "../Add/AddTask";
import UpdateTask from '../Update/UpdateTask'
import './TaskConsole.css'
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel'
import moment from 'moment'

const TaskConsole = () => {
  const dispatch = useDispatch()
  const openModelComponent = useContext(CustomModelComponent)
  const HeaderTitles = ['Started', 'Pending', 'Completed']
  const listTask = useSelector(state => state.task.dataStatusWise)
  const data = [listTask?.final_data?.started ? listTask?.final_data?.started : [], listTask?.final_data?.pending ? listTask?.final_data?.pending : [], listTask?.final_data?.completed ? listTask?.final_data?.completed : []]
  let showConsole = listTask?.final_data?.started && listTask?.final_data?.pending && listTask?.final_data?.completed ? true : false
  

  useEffect(()=>{
    dispatch(listProjects({perPage:"all"}))
    return ()=>{dispatch(clearDataStatusWise())}
  },[])

  let projectData = useSelector(state => state.project.data)
  projectData = projectData?.data?.map(e => ({value: e.project_id, text: e.project_name}))

  // const onSelectedLeaf = (e)=>{
  //   dispatch(listTaskStatusWise(e.project_id, {perPage: "all"}))
  // }

  const handleSelect = (item) => {
    if(Object.keys(item).length !== 0){
      dispatch(listTaskStatusWise({projectId:item.value, perPage: "all"}))
      dispatch(getAllTasks({update_date: moment(new Date()).format("YYYY-MM-DD"), perPage: "all"}))
    }
  }

  const handleaddtask=()=>{
    openModelComponent(<AddTask />, true)
  }

  const onUpdateofItems = (item, destination_index)=>{
    dispatch(updateTasksByStatus({taskId: item.task_id, taskProjID: item.taskProjID, task_status: HeaderTitles[destination_index].toLowerCase()}))
  }

  const ComponentFunction = (item)=>{
    return <TaskAdapter item={item} />
  }

  const handleItemClick = (item)=>{
    openModelComponent(<UpdateTask task_id={item.task_id}/>, true)
  }
  return (
    <>
    <div className='taskconsolemainheader'>
      <p className='contentHeading'>Task Console</p>
      <div className='addTaskbutton' onClick={handleaddtask}>
        <img src='/img/profileadd.png'/>
        <p>Add New Task</p>
      </div>
    </div>
    {projectData?.length > 0 &&
      <CustomSelector label="Select Project" required={true} selectOptions={projectData} onChange={handleSelect}/>
    }
    { showConsole===true &&
      <CustomConsole dragid='id' dataTasks={data} HeaderTitles={HeaderTitles} onUpdate={onUpdateofItems} ComponentFunction={ComponentFunction} onClick={handleItemClick}/>
    }
    </>
  )
}

export default TaskConsole