import React, { useState, useEffect, useContext } from 'react'
import CustomDataTable from '../../../uicomponents/CustomTable/CustomDataTable'
import ContentHeading from '../../../components/bottombar/contentbar/contentHeading'
import { clearDeleteTaskStatus, deleteTask, getAllTasks } from '../../../redux/taskReducer'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import CustomDeleteModal from '../../../uicomponents/CustomModal/CustomDeleteModal'
import { CustomModelComponent } from '../../../uicomponents/CustomModel/CustomModel'
import UpdateTask from '../Update/UpdateTask'


const ListTask = () => {
    const dispatch = useDispatch()
    const openModelComponent = useContext(CustomModelComponent)
    const taskList = useSelector(state => state.task.data)
    const deleteTaskStatus = useSelector(state => state.task.deleteTaskStatus)
    const [visible, setVisible] = useState(false)
    const [deleteData, setDeleteData] = useState({})
    const role = localStorage.getItem("role")

    const body = taskList?.final_data?.map(item => ({ ProjectName: item.projects.project_name, Task: item.task_title, StartDate: item.taskStartTime ? moment(item.taskStartTime).format("YYYY-MM-DD") : "", EndDate: item.deadline ? moment(item.deadline).format("YYYY-MM-DD") : "", Description: item.description, Status: item.task_status, Key: item.task_id }))
    const data = {
        header: [
            {
                title: "ProjectName",
                type: "text"
            },
            {
                title: "Task",
                type: "text"
            },
            {
                title: "StartDate",
                type: "text"
            },
            {
                title: "EndDate",
                type: "text"
            },
            {
                title: "Description",
                type: "text"
            },
            {
                title: "Status",
                type: "text"
            },
            {
                title: "actionUpdate",
                type: "actionUpdate"
            }
        ],
        body: body
    }

    const getPageNumber = (pageNumber) => {
        dispatch(getAllTasks({ pageNumber }))
    }

    const getSearchKey = (searchKey) => {
        dispatch(getAllTasks({ searchKey }))
    }
    const updateRow = (rowId) => {
        openModelComponent(<UpdateTask task_id={rowId.Key} />, true)
    }

    const deleteRow = (rowId) => {
        setVisible(true)
        setDeleteData(rowId)
    }
    const handleDelete = () => {
        dispatch(deleteTask(deleteData?.Key))
        setVisible(false)
    }
    const closeModal = () => {
        setVisible(false)
    }

    useEffect(() => {
        if (deleteTaskStatus !== null) {
            dispatch(getAllTasks({}))
            dispatch(clearDeleteTaskStatus(null))
        }
    }, [deleteTaskStatus])
    return (
        <div>
            <ContentHeading>Tasks List</ContentHeading>
            <CustomDataTable title="Tasks List" addButton="/add-task" data={data} updateRow={updateRow} deleteRow={deleteRow} getPageNumber={getPageNumber} getSearchKey={getSearchKey} />
            <CustomDeleteModal visible={visible} data={deleteData} submit={handleDelete} cancel={closeModal} />

        </div>
    )
}

export default ListTask