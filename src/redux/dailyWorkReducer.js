import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "../utils/Toast";

const addDailyTask = createAsyncThunk("api/add-daily-task", (data) => {
    let token = localStorage.getItem("token")
    let config = {
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/daily-work/new`,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            toast.success('Daily status updated !')
            return response.data
        })
        .catch(error => {
            if (error.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})

const getDailyWorkStatus = createAsyncThunk("api/get-daily-work-status", ({ searchKey = "", work_task_id="", date = "", pageNumber = 1, perPage = 10 }) => {
    let token = localStorage.getItem("token")
    let task_id = work_task_id ? "&work_task_id=" + work_task_id : ""
    let key = searchKey ? "&searchKey=" + searchKey : ""
    let new_date = date ? "&createdAt=" + date : ""
    let number = pageNumber ? "&page_number=" + pageNumber : ""
    let perPageCount = perPage ? "&per_page=" + perPage : "&per_page=10"
    let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/daily-work/all?s=s&${key}${new_date}${task_id}${number}${perPageCount}`,
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

const downloadData = createAsyncThunk('api/downloadData', ({ project_id = "", user_id = "", report_type = "", date_from = "", date_to="" }) => {
    let token = localStorage.getItem("token")

    let projId = project_id ? "&project_id=" + project_id : ""
    let userId = user_id ? "&user_id=" + user_id : ""
    let repType = report_type ? "&report_type=" + report_type : ""
    let fdate = date_from ? "&date_from=" + date_from : ""
    let tdate = date_to ? "&date_to=" + date_to : ""
    let config = {
        method: 'get',
        responseType: 'blob',
        url: `${process.env.REACT_APP_BASEURL}/api/daily-work/download?s=s&${projId}${userId}${repType}${fdate}${tdate}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.xlsx')
            
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => {
           
        })
})


const dailyWorkSlice = createSlice({
    name: 'daily_work',
    initialState: {
        data: [],
        loading: false,
        updateWork: {},
        error: ""
    },
    reducers: {
        updateWorkAction: (state, action)=>{
            state.updateWork = action.payload
        },
        clearDailyData: (state, action)=>{
            state.updateWork = {}
            state.data = []
        },
        clearWorkSlice: (state, action)=>{
            state = {
                data: [],
                loading: false,
                updateWork: {},
                error: ""
            }
        }
    },
    extraReducers: {
        [addDailyTask.fulfilled]: (state, action) => {
            state.loading = false
        },
        [addDailyTask.pending]: (state) => {
            state.loading = true
        },
        [addDailyTask.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [getDailyWorkStatus.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        [getDailyWorkStatus.pending]: (state) => {
            state.loading = true
        },
        [getDailyWorkStatus.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [downloadData.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        [downloadData.pending]: (state) => {
            state.loading = true
        },
        [downloadData.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        }
    }
})

export { addDailyTask, getDailyWorkStatus, downloadData }
export const {updateWorkAction, clearDailyData, clearWorkSlice} = dailyWorkSlice.actions
export default dailyWorkSlice.reducer;