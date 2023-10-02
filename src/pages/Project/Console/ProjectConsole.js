import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClientsData } from '../../../redux/clientReducer'
import { clearDataStatusWise, listProjects, listProjectStatusWise, updateProjects } from '../../../redux/projectReducer'
import CustomConsole from '../../../uicomponents/CustomConsole/CustomConsole'
import CustomSelector from '../../../uicomponents/CustomSelector/CustomSelector'
import ProjectAdapter from './ProjectAdapter'
import AddProject from "../Add/AddProject";
import './ProjectConsole.css'
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel'
import UpdateProject from '../Update/UpdateProject'

const ProjectConsole = () => {

  const dispatch = useDispatch()
  
  const openModelComponent = useContext(CustomModelComponent)
  const HeaderTitles = ['Started', 'Pending', 'Completed']
  const listTask = useSelector(state => state.project.dataStatusWise)
  const data = [listTask?.final_data?.started ? listTask?.final_data?.started : [], listTask?.final_data?.pending ? listTask?.final_data?.pending : [], listTask?.final_data?.completed ? listTask?.final_data?.completed : []]
  const showConsole = listTask?.final_data?.started && listTask?.final_data?.pending && listTask?.final_data?.completed ? true : false
  
  useEffect(()=>{
    dispatch(listProjects({perPage:"all"}))
    dispatch(getClientsData({perPage:"all"}))
    return ()=>{dispatch(clearDataStatusWise())}
  },[])

  let clientData = useSelector(state => state.client.data)
  clientData = clientData?.data?.map(e => ({value: e.client_id, text: e.client_name}))

  const handleSelect = (item) => {
    if(Object.keys(item).length !== 0){
      dispatch(listProjectStatusWise({client_id:item.value,perPage: "all"}))
    }
  }


  const onUpdateofItems = (item, destination_index)=>{
    dispatch(updateProjects({project_id: item.project_id, project_client_id: item.project_client_id, data: {project_status: HeaderTitles[destination_index].toLowerCase()}}))
  }

  const handleaddtask=()=>{
    openModelComponent(<AddProject />, true)
  }

  const ComponentFunction = (item)=>{
    return <ProjectAdapter item={item} />
  }

  const handleItemClick = (item)=>{
    openModelComponent(<UpdateProject project_id={item.project_id}/>, true)
  }

  return (
    <>
    <div className='projectconsolemainheader'>
      <p className='contentHeading'>Project Console</p>
      <div className='addProjectbutton' onClick={handleaddtask}>
        <img src='/img/profileadd.png'/>
        <p>Add New Project</p>
      </div>
    </div>
    <p className='contentHeading'></p>
    {clientData?.length > 0 &&
      <CustomSelector label="Select Client" required={true} selectOptions={clientData} onChange={handleSelect}/>
    }
    { showConsole===true &&
      <CustomConsole dragid='project_id' dataTasks={data} HeaderTitles={HeaderTitles} onUpdate={onUpdateofItems} ComponentFunction={ComponentFunction} onClick={handleItemClick}/>
    }
    </>
  )
}

export default ProjectConsole