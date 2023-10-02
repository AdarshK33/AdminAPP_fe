import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { toast } from "../utils/Toast";

const listTaskStatusWise = createAsyncThunk('api/listtaskstatuswise', ({projectId="", searchKey = "", pageNumber = 1, perPage = 10 }) => {
    let token = localStorage.getItem("token")
    let key = searchKey ? "&searchKey=" + searchKey : ""
    let number = pageNumber ? "&page_number=" + pageNumber : ""
    let perPageCount = perPage ? "&per_page=" + perPage : "&per_page=10"
    let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/task/all-status-wise?project_id=${projectId}&${key}${number}${perPageCount}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            return response.data
        })
})

const updateTasksByStatus = createAsyncThunk('api/updateTasksByStatus', ({ taskId, taskProjID, task_status }, {dispatch}) => {
    let token = localStorage.getItem("token")

    let config = {
        method: "put",
        url: `${process.env.REACT_APP_BASEURL}/api/task/update/${taskId}`,
        data: { task_status: task_status },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            dispatch(listTaskStatusWise({projectId:taskProjID, perPage: "all"}))
            return response.data
        })
})
const addTask = createAsyncThunk("api/add-task", (data, {dispatch}) => {
    let token = localStorage.getItem("token")
    let config = {
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/task/new`,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            toast.success('Task assigned successfully !')
            dispatch(listTaskStatusWise({projectId:data.project_id, perPage: "all"}))
            dispatch(getAllTasks({update_date: moment(new Date()).format("YYYY-MM-DD"), perPage: "all"}))
            return response.data
        })
        .catch(error => {
            if (error.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})
const getAllTasks = createAsyncThunk("api/get-task", ({ searchKey = "", update_date="", pageNumber = 1, perPage = 10 }) => {
    let token = localStorage.getItem("token")
    let udt = update_date ? "&update_date=" + update_date : ""
    let key = searchKey ? "&searchKey=" + searchKey : ""
    let number = pageNumber ? "&page_number=" + pageNumber : ""
    let perPageCount = perPage ? "&per_page=" + perPage : "&per_page=10"
    let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/task/all?s=s&${key}${udt}${number}${perPageCount}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            if (error.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})

const deleteTask = createAsyncThunk("api/delete-task", (id) => {
    let token = localStorage.getItem("token")
    let config = {
        method: "delete",
        url: `${process.env.REACT_APP_BASEURL}/api/task/delete/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            toast.success('Task deleted successfully !')
            return response.data
        })
        .catch(error => {
            if (error.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})

const getSingleTask = createAsyncThunk("api/single-task", (id, { dispatch }) => {
    let token = localStorage.getItem("token")
    let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/task/task-data/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            dispatch(updateSingleTask({
                project_id: response.data.data.project_id,
                project_name: response.data.data.projects.project_name,
                user_id: response.data.data.users.user_name,
                task_title: response.data.data.task_title,
                description: response.data.data.description,
                task_status: response.data.data.task_status,
                deadline: response.data.data.deadline,
                start_date_time: response.data.data.start_date_time,
            }))
            return response.data
        })

})

const updateTask = createAsyncThunk("api/update-task", ({ id, data }, { dispatch }) => {
    let token = localStorage.getItem("token")
    let config = {
        method: "put",
        url: `${process.env.REACT_APP_BASEURL}/api/task/update/${id}`,
        data: data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            toast.success('Task updated successfully !')
            dispatch(getAllTasks({update_date: moment(new Date()).format("YYYY-MM-DD"), perPage: "all"}))
            dispatch(listTaskStatusWise({projectId:data.project_id, perPage: "all"}))
            return response.data
        })
        .catch(error => {
            if (error.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        data: [],
        dataStatusWise: [],
        deleteTaskStatus: null,
        addTaskStatus: {},
        updateTask: {},
        loading: false
    },
    reducers: {
        clearDataStatusWise: (state, action) => {
            state.dataStatusWise = []
        },
        clearDeleteTaskStatus: (state, action) => {
            state.deleteTaskStatus = action.payload
        },
        updateSingleTask: (state, action) => {
            state.updateTask = action.payload
        },
        clearSingleTask: (state, action) => {
            state.updateTask = {}
        },
        clearTaskSlice: (state, action)=>{
            state = {
                data: [],
                dataStatusWise: [],
                deleteTaskStatus: null,
                addTaskStatus: {},
                updateTask: {},
                loading: false
            }
        }
    },
    extraReducers: {
        [listTaskStatusWise.fulfilled]: (state, action) => {
            state.loading = false
            state.dataStatusWise = action.payload
        },
        [listTaskStatusWise.pending]: (state) => {
            state.loading = true
        },
        [listTaskStatusWise.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [updateTasksByStatus.fulfilled]: (state, action) => {
            state.loading = false
        },
        [updateTasksByStatus.pending]: (state) => {
            state.loading = true
        },
        [updateTasksByStatus.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [addTask.fulfilled]: (state, action) => {
            state.loading = false
            state.addTaskStatus = action.payload
        },
        [addTask.pending]: (state) => {
            state.loading = true
        },
        [addTask.rejected]: (state) => {
            state.loading = false
            state.error = "Task not added!"
        },
        [getAllTasks.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        [getAllTasks.pending]: (state) => {
            state.loading = true
        },
        [getAllTasks.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [deleteTask.fulfilled]: (state, action) => {
            state.loading = false
            state.deleteTaskStatus = action.payload
        },
        [deleteTask.pending]: (state) => {
            state.loading = true
        },
        [deleteTask.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [getSingleTask.fulfilled]: (state) => {
            state.loading = false
        },
        [getSingleTask.pending]: (state) => {
            state.loading = true
        },
        [getSingleTask.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [updateTask.fulfilled]: (state) => {
            state.loading = false
        },
        [updateTask.pending]: (state) => {
            state.loading = true
        },
        [updateTask.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
    }
})

export { listTaskStatusWise, updateTasksByStatus, addTask, getAllTasks, deleteTask, getSingleTask, updateTask }
export const { clearDataStatusWise, clearDeleteTaskStatus, updateSingleTask, clearSingleTask, clearTaskSlice } = taskSlice.actions
export default taskSlice.reducer;