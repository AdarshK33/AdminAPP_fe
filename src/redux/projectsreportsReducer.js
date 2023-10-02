import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

 
const pendingprojectsReports = createAsyncThunk('api/pendingprojects', ()=>{
    let token=localStorage.getItem("token")
    let config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/project/all?status=pending`,
        headers: { 
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            return response.data
        })
})

const completedprojectsReports = createAsyncThunk('api/completedprojects', () => {
    let token=localStorage.getItem("token")
    let config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/project/all?status=completed`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            return response.data
        })
})

const reportsSlice = createSlice({
    name: 'projectreport',
    initialState: {
        pendingprojectsReports: [],
        completedprojectsReports:[],
        error: "",
        loading: false
    },
    reducers: {
        clearReportsSlice: (state, action)=>{
            state = {
                pendingprojectsReports: [],
                completedprojectsReports:[],
                error: "",
                loading: false
            }
        }
    },
    extraReducers: {
        [pendingprojectsReports.fulfilled]: (state, action) => {
            state.loading = false
            state.pendingprojectsReports = action.payload
        },
        [pendingprojectsReports.pending]: (state) => {
            state.loading = true
        },
        [pendingprojectsReports.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [completedprojectsReports.fulfilled]: (state,action) => {
            state.loading = false
            state.completedprojectsReports = action.payload
        },
        [completedprojectsReports.pending]: (state) => {
            state.loading = true
        },
        [completedprojectsReports.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        }
    }
})

export { pendingprojectsReports, completedprojectsReports }
export const {clearReportsSlice} = reportsSlice.actions
export default reportsSlice.reducer;