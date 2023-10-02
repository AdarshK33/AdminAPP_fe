import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDailyTask, clearDailyData, getDailyWorkStatus, updateWorkAction } from '../../../redux/dailyWorkReducer';
import { listProjects } from '../../../redux/projectReducer';
import { clearSingleTask, getAllTasks, getSingleTask, listTaskStatusWise, updateSingleTask, updateTask } from '../../../redux/taskReducer';
import { userData } from '../../../redux/userReducer';
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel';
import CustomSelector from '../../../uicomponents/CustomSelector/CustomSelector';
import CustomTextField from '../../../uicomponents/CustomTextField/CustomTextField';
import './UpdateTask.css'
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
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}));
const UpdateTask = ({ task_id }) => {
    const dispatch = useDispatch()
    const ProjectsList = useSelector(state => state.project.data)
    const userList = useSelector(state => state.user.data)
    const singleTask = useSelector(state => state.task.updateTask)
    const daily_work_status = useSelector(state => state.daily_work.data)
    const updateWorkSingle = useSelector(state => state.daily_work.updateWork)
    const openModelComponent = useContext(CustomModelComponent)

  

    const projectData = []
    const userListData = []
    ProjectsList?.data?.map((item, i) => {
        return projectData.push({ value: item.project_id, text: item.project_name })
    })

    userList?.data?.filter((item, i) => {
        if (item.role === "user")
            return userListData.push({ value: item.user_id, text: item.name })
    })


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === "start_date_time") {
            let start_date_time = moment(value).format("YYYY-MM-DD HH:MM:SS")
            dispatch(updateSingleTask({ ...singleTask, start_date_time: start_date_time }))

        }
        else if (name === "deadline") {
            let deadline = moment(value).format("YYYY-MM-DD HH:MM:SS")
            dispatch(updateSingleTask({ ...singleTask, deadline: deadline }))

        } else {
            dispatch(updateSingleTask({ ...singleTask, [name]: value }))
        }
    }
    const handleProjectChange = (item) => {
        dispatch(userData({ perPage: "all" , project_id: item.value }))
        dispatch(updateSingleTask({ ...singleTask, project_id: item.value }))

    }
    const handleUserChange = (item) => {
        dispatch(updateSingleTask({ ...singleTask, user_id: item.value }))
    }

    const handleStatusChange = (item) => {
        dispatch(updateSingleTask({ ...singleTask, task_status: item.value }))
    }

    const handleSubmit = () => {
        const{user_id, project_name, ...rest}=singleTask
        dispatch(updateTask({ id:task_id, data: rest }))
        openModelComponent(<></>, false);
        dispatch(clearSingleTask())
        if(updateWorkSingle.hours_worked){
            dispatch(addDailyTask(updateWorkSingle))
        }
    }

    const handleDailyStatusChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        if(name === "hours_worked" && value < 25){
            dispatch(updateWorkAction({ ...updateWorkSingle, work_task_id: task_id,  [name]: parseInt(value) }))
        }else if(name === "comment"){
            dispatch(updateWorkAction({ ...updateWorkSingle, work_task_id: task_id,  [name]: value }))
        }
    }

    useEffect(()=>{
        dispatch(userData({ perPage: "all" , project_id: singleTask.project_id}))
    },[singleTask])

    useEffect(() => {
        dispatch(listProjects({ perPage: "all"}))
        dispatch(getSingleTask(task_id))
        dispatch(getDailyWorkStatus({work_task_id: task_id, date: moment(new Date()).format("YYYY-MM-DD")}))
        return ()=>{ dispatch(clearDailyData())}
    }, [])

  
    return (
        <> {singleTask &&
            <div>
                <p className='contentHeading'>Update Task</p>
                {/* <CustomSelector label="Select Project" defaultSelected={singleTask?.project_id} required={true} selectOptions={projectData} onChange={handleProjectChange} update /> */}
                <CustomTextField type="text" label="Project" value={singleTask?.project_name} name="project_name" update disabled/>
                <div className='fullDatePickerForProject'>
                    <div className="add-project-date-left">
                        <CustomTextField required type="datetime-local" label="Start Date" value={singleTask?.start_date_time} name="start_date_time" onChange={handleChange} update />
                    </div>
                    <div className="add-project-date-right">
                        <CustomTextField required type="datetime-local" label="End Date" value={singleTask?.deadline} name="deadline" onChange={handleChange} update />
                    </div>
                </div>
                <CustomTextField required type="text" label="Task Name" value={singleTask?.task_title} name="task_title" onChange={handleChange} update />
                {/* <CustomSelector label="Assigned to" defaultSelected={singleTask?.user_id} required={true} selectOptions={userListData} name="user_id" onChange={handleUserChange} update /> */}
                <CustomTextField required type="text" label="Description" name="description" value={singleTask?.description} onChange={handleChange} update />
                <CustomSelector defaultSelected={singleTask?.task_status} selectOptions={statusData} required={true} label="Status" onChange={handleStatusChange} update />
                <CustomTextField type="text" label="Assigned to" value={singleTask?.user_id} name="user_id" update disabled/>
                
                {daily_work_status?.data?.length === 0 &&
                    <div className='dailyUpdateTask'>
                        <div className='todaysupdate'>Today's Update</div>
                        <CustomTextField type="text" label="Task Comment" value={updateWorkSingle?.comment} name="comment" onChange={handleDailyStatusChange} update />
                        <CustomTextField required type="number" label="Total hours Worked" value={updateWorkSingle?.hours_worked} name="hours_worked" onChange={handleDailyStatusChange} update />
                    </div>
                }
                {daily_work_status?.data?.length > 0 &&
                    <div className='dailyUpdateTask'>
                        <div className='todaysupdate'>
                            <div className='todaysupdateext'>
                                <div className='todaysupdateextracheck'>Today's Update <img src="/img/check.png"/></div>
                                <div className='todaysupdatedby'>Updated by - {daily_work_status?.data[0]?.updated_by?.user_name} </div>
                            </div>
                        </div>
                        <CustomTextField type="text" label="Task Comment" value={daily_work_status?.data[0]?.comment} name="comment" update disabled/>
                        <CustomTextField required type="number" label="Total hours Worked" value={daily_work_status?.data[0]?.hours_worked} name="hours_worked" update disabled/>
                    </div>
                }
                <ColorButton variant="contained" fullWidth onClick={handleSubmit}>Update Task</ColorButton>

            </div>}
        </>
    )
}
export default UpdateTask
