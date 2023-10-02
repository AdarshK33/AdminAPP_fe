import React, { useState, useEffect, useContext } from 'react'
import CustomSelector from '../../../uicomponents/CustomSelector/CustomSelector'
import CustomTextField from '../../../uicomponents/CustomTextField/CustomTextField'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { listProjects } from '../../../redux/projectReducer';
import { userData } from '../../../redux/userReducer';
import { addTask, getAllTasks, listTaskStatusWise } from '../../../redux/taskReducer';
import DatePicker from "react-datepicker"
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel';
import { toast } from '../../../utils/Toast';
const statusData = [
    {
        value: "Started",
        text: "Started"
    },
    {
        value: "Pending",
        text: "Pending"
    },
    {
        value: "Completed",
        text: "Completed"
    }
]
const AddTask = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const addTaskData = useSelector(state => state.task.addTaskStatus)
    const ProjectsList = useSelector(state => state.project.data)
    const userList = useSelector(state => state.user.data)

    console.log("userdata001", userList);

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));

    const openModelComponent = useContext(CustomModelComponent)

    const projectData = []
    const userListData = []
    ProjectsList?.data?.map((item, i) => {
        return projectData.push({ value: item.project_id, text: item.project_name })
    })

    userList?.data?.filter((item, i) => {
        if (item.role === "user" || item.role === "manager")
            return userListData.push({ value: item.user_id, text: item.name })
    })

    const [formdata, setFormData] = useState({})
    const [success, setSuccess] = useState(false)


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === "start_date_time") {
            let start_date_time = moment(value).format("YYYY-MM-DD HH:MM:SS")
            setFormData(prev => ({ ...prev, start_date_time: start_date_time }))

        }
        else if (name === "deadline") {
            let deadline = moment(value).format("YYYY-MM-DD HH:MM:SS")
            setFormData(prev => ({ ...prev, deadline: deadline }))

        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }

    }
    const handleProjectChange = (item) => {
        dispatch(userData({ perPage: "all" , project_id: item.value }))
        setFormData(prev => ({ ...prev, project_id: item.value }))
    }
    const handleUserChange = (item) => {
        setFormData(prev => ({ ...prev, user_id: item.value }))
    }

    const handleStatusChange = (item) => {
        setFormData(prev => ({ ...prev, task_status: item.value }))
    }

    const handleSubmit = () => {
        dispatch(listTaskStatusWise({projectId:formdata.project_id, perPage: "all"}))
        dispatch(getAllTasks({update_date: moment(new Date()).format("YYYY-MM-DD"), perPage: "all"}))
        if(formdata?.user_id){
            dispatch(addTask(formdata))
            setSuccess(true)
            openModelComponent(<></>, false);
        }else{
            toast.error("Please select the user")
        }
    }

    useEffect(() => {
        dispatch(listProjects({ perPage: "all" }))
    }, [])


    useEffect(() => {
        if (success && addTaskData?.success) {
            navigate("/all-tasks")
        }
    }, [success, addTaskData?.success])
    return (
        <div>
            <p className='contentHeading'>Add Task</p>
            <CustomSelector label="Select Project" required={true} selectOptions={projectData} onChange={handleProjectChange} />
            <CustomTextField required type="text" label="Task Name" name="task_title" onChange={handleChange} />
            <CustomSelector label="Assigned to" required={true} selectOptions={userListData} name="user_id" onChange={handleUserChange} />
            <CustomTextField required type="text" label="Description" name="description" onChange={handleChange} />
            <div className='fullDatePickerForProject'>
                <div className="add-project-date-left">
                    <CustomTextField required type="datetime-local" label="Start Date" name="start_date_time" onChange={handleChange} />
                </div>
                <div className="add-project-date-right">
                    <CustomTextField required type="datetime-local" label="End Date" name="deadline" onChange={handleChange} />
                </div>
            </div>
            <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Add Task</ColorButton>

        </div>
    )
}
export default AddTask
