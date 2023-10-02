import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "../utils/Toast";
import axios from "axios";
// const getDashboardDetails = createAsyncThunk('api/dashboard', () => {
//     let token = localStorage.getItem("token")
//     let config = {
//         method: 'get',
//         url: `${process.env.REACT_APP_BASEURL}/api/dashboard/get`,
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     };

//     return axios(config)
//         .then(response => {
//             toast.success("Dashboard listed !")
//             console.log(response.data);
//             return response.data
//         })
//         .catch(error => {
//             if (error.response)
//                 toast.error(`${error.response.data.errMessage}`)
//         })
// })



const getDashboardDetails = createAsyncThunk('api/dashboard', () => {
    let token = localStorage.getItem("token")
    let config = {
        method: 'get',
        url: `http://localhost:8000/api/dashboard/get`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            toast.success("hello adarsh Dashboard listed !")
            console.log(response.data);
            return response.data
        })
        .catch(error => {
            if (error.response)
                toast.error(`${error.response.data.errMessage}`)
        })
})
const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        data: {},
        loading: false,
        error: ""
    },
    extraReducers: {
        [getDashboardDetails.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [getDashboardDetails.pending]: (state) => {
            state.loading = true
        },
        [getDashboardDetails.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },

    }
})
export default dashboardSlice.reducer
export { getDashboardDetails }