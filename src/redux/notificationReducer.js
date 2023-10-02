import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getNotificationData = createAsyncThunk('api/notification', ({searchKey="", pageNumber=1, perPage=10})=>{
    let token=localStorage.getItem("token")

    let key = searchKey ? "&searchKey="+searchKey : ""
    let number = pageNumber ? "&page_number="+pageNumber : ""
    let perPageCount = perPage ? "&per_page="+perPage : "&per_page=10"
    let config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/notification/all?s=s&${key}${number}${perPageCount}`,
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            return response.data
        })
})

const getNotificationByTypeData = createAsyncThunk('api/notificationbytype', ()=>{
    let token=localStorage.getItem("token")
    let config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/notification/all-type-wise`,
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            return response.data
        })
})

const checkActiveNotification = createAsyncThunk('api/checkactivenotification', ()=>{
    let token=localStorage.getItem("token")

    let config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/notification/check-active-notification`,
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            return response.data
        })
})

const seenNotification = createAsyncThunk('api/updatenotification', ()=>{
    let token=localStorage.getItem("token")

    var data = JSON.stringify({
        "action": "seen"
    });

    let config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/notification/seen-notification`,
        headers: { 
            'Authorization': `Bearer ${token}`
        },
        data: data
    };

    return axios(config)
        .then(response => {
            return response.data
        })
})


const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        data: [],
        databytype: [],
        error: "",
        activeNotification: [],
        loading: false
    },
    reducers:{
        clearErrorMessage : (state, action)=>{
            state.error = ""
        },
        clearNotificationSlice: (state, action)=>{
            state = {
                data: [],
                databytype: [],
                error: "",
                activeNotification: [],
                loading: false
            }
        }
    },
    extraReducers: {
        [getNotificationData.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        [getNotificationData.pending]: (state) => {
            state.loading = true
        },
        [getNotificationData.rejected]: (state) => {
            state.loading = false
            state.error = "Notification not fetched"
        },
        [checkActiveNotification.fulfilled]: (state, action) => {
            state.loading = false
            state.activeNotification = action.payload
        },
        [checkActiveNotification.pending]: (state) => {
            state.loading = true

        },
        [checkActiveNotification.rejected]: (state) => {
            state.loading = false
            state.error = "Invalid user token"
        },
        [seenNotification.fulfilled]: (state, action) => {
            state.loading = false
        },
        [seenNotification.pending]: (state) => {
            state.loading = true
        },
        [seenNotification.rejected]: (state) => {
            state.loading = false
            state.error = ""
        },
        [getNotificationByTypeData.fulfilled]: (state, action) => {
            state.loading = false
            state.databytype = action.payload
        },
        [getNotificationByTypeData.pending]: (state) => {
            state.loading = true
        },
        [getNotificationByTypeData.rejected]: (state) => {
            state.loading = false
            state.error = ""
        }
    }
})

export { getNotificationData, checkActiveNotification, seenNotification, getNotificationByTypeData }
export const { clearErrorMessage, clearNotificationSlice } = notificationSlice.actions
export default notificationSlice.reducer;