import React, { useState, useEffect, useContext } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import "react-datepicker/dist/react-datepicker.css";
import CustomTextField from '../../../uicomponents/CustomTextField/CustomTextField';
import './AddProject.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProject } from '../../../redux/projectReducer';
import { userData } from '../../../redux/userReducer';
import { getClientsData } from '../../../redux/clientReducer';
import CustomSelector from '../../../uicomponents/CustomSelector/CustomSelector';
import CustomMultiSelector from '../../../uicomponents/CustomMultiSelector/CustomMultiSelector';
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel';
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
const AddProject = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addProjectSuccess = useSelector(state => state.project.addProject)
    const getClients = useSelector(state => state.client.data)
    const userList = useSelector(state => state.user.data)


    const openModelComponent = useContext(CustomModelComponent)

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [project_user_ids, setProject_user_ids] = useState([])
    const [formData, setFormData] = useState({})
    const [success, setSuccess] = useState(false)


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

    let projectTypes = [{ value: "internal", text: "Internal" }, { value: "client-based", text: "Client based" }]


    const handleChange = (e) => {
        let { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleTeamMemChange = (e) => {
        setProject_user_ids(e.target.value)
        setFormData(prev => ({ ...prev, project_user_ids: e.target.value }))

    }

    // const startDateChange = (date) => {
    //     setStartDate(date)
    //     const startDate = moment(date).format("YYYY-MM-DD")
    //     setFormData(prev => ({ ...prev, project_start_date: startDate }))
    // }
    // const endDateChange = (date) => {
    //     setEndDate(date)
    //     const endDate = moment(date).format("YYYY-MM-DD")
    //     setFormData(prev => ({ ...prev, project_end_date: endDate }))
    // }
    const handleClientChange = (item) => {
        setFormData(prev => ({ ...prev, project_client_id: item.value }))
    }

    const handleTypeChange = (item) => {
        setFormData(prev => ({ ...prev, project_type: item.value }))
    }
    const handleManChange = (item) => {
        setFormData(prev => ({ ...prev, project_manager_id: item.value }))
        setFormData(prev => ({ ...prev, project_user_ids: [] }))
    }
    // const handleUserChange = (item) => {
    //     if(Array.isArray(item)){
    //         const user_ids = item.map(e => e.value)
    //         setFormData(prev => ({ ...prev, project_user_ids: user_ids }))
    //     }
    // }
    const handleStatusChange = (item) => {
        setFormData(prev => ({ ...prev, status: item.value }))
    }

    const handleSubmit = () => {
        dispatch(addProject(formData))
        setSuccess(true)
        openModelComponent(<></>, false);
    }
    useEffect(() => {
        dispatch(getClientsData({ perPage: "all" }))
        dispatch(userData({ perPage: "all" }))
    }, [])

    useEffect(() => {
        if (success && addProjectSuccess?.success) {
            navigate("/all-projects")
        }
    }, [success, addProjectSuccess])
    return (
        <>

            <p className='contentHeading'>Add Project</p>
            <CustomSelector selectOptions={clientDropData} label="Select Client" required={true} onChange={handleClientChange} />
            <CustomSelector selectOptions={projectTypes} label="Project Type" required={true} onChange={handleTypeChange} />
            <CustomTextField required type="text" label="Project Title" name="name" onChange={handleChange} />

            <CustomSelector selectOptions={managerDropData} label={"Project Manager"} required={true} onChange={handleManChange} />
            {/* <CustomMultiSelector selectOptions={userDropData} label={"project users"} required={true} onChange={handleUserChange} /> */}
            <CustomTextField required type="message" label="Description" name="description" onChange={handleChange} />
            <CustomSelector selectOptions={statusData} label={"Select Status"} required={true} onChange={handleStatusChange} />
            <div className='fullDatePickerForProject'>
                <div className="add-project-date-left">
                    <CustomTextField required type="date" label="Start Date" name="project_start_date" onChange={handleChange} />
                </div>
                <div className="add-project-date-right">
                    <CustomTextField required type="date" label="End Date" name="project_end_date" onChange={handleChange} />
                </div>
            </div>
            <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Add Project</ColorButton>

        </>
    )
}

export default AddProject
