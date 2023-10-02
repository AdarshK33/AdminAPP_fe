import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "../utils/Toast"






const getInboxData = createAsyncThunk('api/inbox', () => {
    let token = localStorage.getItem("token")
    let config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/client/inbox`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            return response.data
        })
})

const sendReportToClient = createAsyncThunk('api/send-report', (data) => {
    let token = localStorage.getItem("token")
    let config = {
        method: 'post',
        data,
        url: `${process.env.REACT_APP_BASEURL}/api/client/send-mail`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            toast.success("Mail sent successfully !")
            return response.data
        })
        .catch(error => {
            if (error?.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})




const emailSlice = createSlice({
    name: 'client',
    initialState: {
        data: [],
        error: "",
        loading: false
    },
    reducers: {
        clearEmailSlice: (state, action)=>{
            state = {
                data: [],
                error: "",
                loading: false
            }
        }
    },
    extraReducers: {
        [getInboxData.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        [getInboxData.pending]: (state) => {
            state.loading = true
        },
        [getInboxData.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [sendReportToClient.fulfilled]: (state, action) => {
            state.loading = false
        },
        [sendReportToClient.pending]: (state) => {
            state.loading = true
        },
        [sendReportToClient.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        }
    }
})

export { getInboxData, sendReportToClient }
export const {clearEmailSlice} = emailSlice.actions
export default emailSlice.reducer;