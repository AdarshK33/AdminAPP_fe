import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClientsData } from '../../../redux/clientReducer';
import { getSingleProject, listProjectStatusWise, updateProjects, updateSingleProject } from '../../../redux/projectReducer';
import { userData } from '../../../redux/userReducer';
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel';
import CustomMultiSelector from '../../../uicomponents/CustomMultiSelector/CustomMultiSelector';
import CustomSelector from '../../../uicomponents/CustomSelector/CustomSelector';
import CustomTextField from '../../../uicomponents/CustomTextField/CustomTextField';
import './UpdateProject.css';


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}));
const statusData = [
    {
        value: "started",
        text: "Started"
    },
    {
        value: "pending",
        text: "Pending"
    },
    {
        value: "completed",
        text: "Completed"
    }
]
const UpdateProject = ({ project_id }) => {


    //Opening model by context
    const openModelComponent = useContext(CustomModelComponent)
    const dispatch = useDispatch()
    const getClients = useSelector(state => state.client.data)
    const userList = useSelector(state => state.user.data)
    let project_data = useSelector(state => state.project.singleProject)


    let clientDropData = []
    let userDropData = []
    let managerDropData = []
    getClients?.data?.map((item, i) => {
        return clientDropData.push({ value: item.client_id, text: item.client_name })
    })
    userList?.data?.filter((e, i) => {
        if (e.role === "manager") {
            return managerDropData.push({ value: e.user_id, text: e.name })
        }
        if (e.role === "user") {
            return userDropData.push({ value: e.user_id, text: e.name })
        }
    })

    const handleClientChange = (item) => {
        if (item) dispatch(updateSingleProject({ ...project_data, project_client_id: item.value }))
    }
    const handleStatusChange = (item) => {
        if (item) dispatch(updateSingleProject({ ...project_data, project_status: item.value }))
    }
    const handleManagerChange = (item) => {
        if (item) dispatch(updateSingleProject({ ...project_data, project_manager_id: item.value }))
    }
    const handleUserChange = (item) => {
        if (Array.isArray(item)) {
            const user_ids = item.map(e => e.value)
            dispatch(updateSingleProject({ ...project_data, project_user_ids: user_ids }))
        } else {
            dispatch(updateSingleProject({ ...project_data, project_user_ids: [] }))
        }
    }


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        dispatch(updateSingleProject({ ...project_data, [name]: value }))
    }


    const handleSubmit = () => {
        dispatch(updateProjects({ project_id, data: project_data, project_client_id: project_data.project_client_id }))
        openModelComponent(<></>, false);
    }


    useEffect(() => {
        dispatch(getSingleProject(project_id))
        dispatch(getClientsData({ perPage: "all" }))
        dispatch(userData({ perPage: "all" }))
    }, [])


    return (
        <>
            {project_data &&
                <div>
                    <p className='contentHeading'>Update Project</p>
                    <div className='rowUpdateProject'>
                        <CustomSelector defaultSelected={project_data.project_client_id} selectOptions={clientDropData} label="Select Client" required={true} onChange={handleClientChange} update />
                        <CustomTextField required label="Name" name="project_name" onChange={handleChange} value={project_data.project_name} update />
                    </div>
                    <div className='rowUpdateProject'>
                        <CustomSelector defaultSelected={project_data.project_status} selectOptions={statusData} label={"Select Status"} required={true} onChange={handleStatusChange} update />
                        <CustomSelector defaultSelected={project_data.project_manager_id} selectOptions={managerDropData} label="Select Manager" required={true} onChange={handleManagerChange} update />
                    </div>
                    <div className='rowUpdateProject'>
                        <CustomTextField required label="Start Date" name="project_start_date" type="date" onChange={handleChange} value={project_data.project_start_date} update />
                        <CustomTextField required label="End Date" name="project_end_date" type="date" onChange={handleChange} value={project_data.project_end_date} update />
                    </div>
                    <CustomTextField required label="Completed Date" name="completed_date_time" type="date" onChange={handleChange} value={project_data.completed_date_time} update />
                    <CustomMultiSelector defaultSelected={project_data.project_user_ids} selectOptions={userDropData} label="Active Employees" required={true} onChange={handleUserChange} disabled={true} update />
                    <CustomTextField required label="Description" name="description" onChange={handleChange} value={project_data.description} update />

                    <br />
                    <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Update Project</ColorButton>
                </div>}
        </>

    )
}

export default UpdateProject