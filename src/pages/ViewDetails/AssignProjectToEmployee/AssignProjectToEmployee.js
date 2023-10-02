import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClientsData } from '../../../redux/clientReducer'
import CustomSelector from '../../../uicomponents/CustomSelector/CustomSelector'
import { getProjectByClientId } from '../../../redux/userReducer'
// import { userData } from '../../../redux/userReducer';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { addNewProject } from '../../../redux/userReducer'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom';
import { getSingleUserProject } from '../../../redux/userReducer'
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel';



const AssignProjectToEmployee = () => {
  const { id } = useParams();
  console.log(id, "userID")

  const openModelComponent = useContext(CustomModelComponent)


  


  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({})
    const [projectData, setProjectdata] = useState({})
    
   
    let getClients = useSelector(state => state.client.data)
    console.log(getClients, "testtsss")


    const clientDropData = [];
    const handleClientChange = (item) => {
      setFormData(prev => ({ ...prev, project_client_id: item.value }))
        // console.log(formData, "projectdata")  
    }

    const handleProjectChange = (item) => {
      setProjectdata(prev => ({ ...prev, project_id: item.value }))
      console.log(projectData, "project_id")  
  }

  
    getClients?.data?.map((item, i) => {
      return clientDropData.push({ value: item.client_id, text: item.client_name })
  })

    
    


    useEffect(() => {
        dispatch(getClientsData({ perPage: "all" }))
        // dispatch(userData({ perPage: "all" }))
    }, [])


    const projectDropData = [];
      const ProjectByClient = useSelector(state => state.user.projectByClientId)
      console.log(ProjectByClient, "datatestssss")

      ProjectByClient?.data?.map((item, i) => {
        return projectDropData.push({ value: item.project_id, text: item.project_name })
    })

    console.log(projectDropData, "projectDropData")
       
      useEffect(() => {
        if (formData.project_client_id) {
          dispatch(getProjectByClientId(formData.project_client_id));
        }
      }, [formData.project_client_id]);

      const [formDate, setFormDate] = useState({}) 
      const [success, setSuccess] = useState(false)

const addNewProjectSuccess = useSelector(state => state.user.addNewProject)

const handleSubmit = () => {
  if(projectData.project_id){
  const payload = {
    user_id: id,
    project_id: projectData.project_id,
    status :"Active"
  };
  console.log(formDate, "formDate")
  dispatch(addNewProject( payload))
  setSuccess(true)
  openModelComponent(<></>, false);
} 
}

useEffect(() => {
  if (addNewProjectSuccess?.success && success) {
    toast.success("Project Added sucessfully !")
  }
  dispatch(getSingleUserProject(id))
}, [addNewProjectSuccess, success])

  return (<>
    <CustomSelector selectOptions={clientDropData} label="Select Client" required={true} onChange={handleClientChange} />
    <CustomSelector selectOptions={projectDropData} label="Select Project" required={true}  onChange={handleProjectChange}/>
    <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Submit</ColorButton>
    </>
  )
}

export default AssignProjectToEmployee