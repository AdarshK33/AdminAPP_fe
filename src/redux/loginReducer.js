import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { clearClientSlice } from "./clientReducer";
import { clearWorkSlice } from "./dailyWorkReducer";
import { clearEmailSlice } from "./emailReducer";
import { clearNotificationSlice } from "./notificationReducer";
import { clearProfileSlice } from "./profileReducer";
import { clearProjectSlice } from "./projectReducer";
import { clearReportsSlice } from "./projectsreportsReducer";
import { clearTaskSlice } from "./taskReducer";
import { clearUserSlice } from "./userReducer";
const loginData = createAsyncThunk("/api/login", (data) => {
    let config = {
        method: 'post',
        data,
        url: `${process.env.REACT_APP_BASEURL}/api/auth/login`,

    };
    return axios(config)
        .then(response => {
            toast.success("Login successfull !")
            localStorage.setItem("token", response.data.user.token)
            localStorage.setItem("role", response.data.user.role)
            return response.data

        })
        .catch(error => {
            if (error?.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})

const resetData = createAsyncThunk("/api/resetpassword", (data) => {
    let config = {
        method: 'post',
        data,
        url: `${process.env.REACT_APP_BASEURL}/api/auth/reset-password`,

    };
    return axios(config)
        .then(response => {
            toast.success("Reset Link sent to your email address !")
            return response.data

        })
        .catch(error => {
            if (error?.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})

const resetConfirmTokenData = createAsyncThunk("/api/resetconfirmtokenpassword", ({email, token}) => {
    let config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/auth/newpassword/${email}/${token}`,

    };
    return axios(config)
        .then(response => {
            return response.data

        })
        .catch(error => {
            if (error?.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})

const addNewpass = createAsyncThunk("/api/addnewpass", (data) => {
    let config = {
        method: 'post',
        data,
        url: `${process.env.REACT_APP_BASEURL}/api/auth/add-new-password`,

    };
    return axios(config)
        .then(response => {
            toast.success("Reset password successfull !")
            return response.data

        })
        .catch(error => {
            if (error?.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})


const logoutApp = createAsyncThunk('api/logoutApp', (a="", {dispatch}) => {
    let token = localStorage.getItem("token")
    let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/user/logout`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            dispatch(clearClientSlice)
            dispatch(clearProjectSlice)
            dispatch(clearTaskSlice)
            dispatch(clearLoginSlice)
            dispatch(clearUserSlice)
            dispatch(clearEmailSlice)
            dispatch(clearReportsSlice)
            dispatch(clearNotificationSlice)
            dispatch(clearWorkSlice)
            dispatch(clearProfileSlice)
            return response.data
        }).catch(err =>{
            dispatch(clearClientSlice)
            dispatch(clearProjectSlice)
            dispatch(clearTaskSlice)
            dispatch(clearLoginSlice)
            dispatch(clearUserSlice)
            dispatch(clearEmailSlice)
            dispatch(clearReportsSlice)
            dispatch(clearNotificationSlice)
            dispatch(clearWorkSlice)
            dispatch(clearProfileSlice)
        })
})



const loginSlice = createSlice({
    name: 'login',
    initialState: {
        data: {},
        resetToken: {},
        error: "",
        loading: false
    },
    reducers: {
        clearLoginSlice: (state, action)=>{
            state = {
                data: {},
                resetToken: {},
                error: "",
                loading: false
            }
        }
    },
    extraReducers: {
        [loginData.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ""
        },
        [loginData.pending]: (state) => {
            state.loading = true
        },
        [loginData.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [logoutApp.fulfilled]: (state, action) => {
            state.loading = false
            state.error = ""
        },
        [logoutApp.pending]: (state) => {
            state.loading = true
        },
        [logoutApp.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [resetData.fulfilled]: (state, action) => {
            state.loading = false
            state.error = ""
        },
        [resetData.pending]: (state) => {
            state.loading = true
        },
        [resetData.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [resetConfirmTokenData.fulfilled]: (state, action) => {
            state.resetToken = action.payload
            state.loading = false
            state.error = ""
        },
        [resetConfirmTokenData.pending]: (state) => {
            state.loading = true
        },
        [resetConfirmTokenData.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [addNewpass.fulfilled]: (state, action) => {
            state.loading = false
            state.error = ""
        },
        [addNewpass.pending]: (state) => {
            state.loading = true
        },
        [addNewpass.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        }
    }
})

export { loginData, logoutApp, resetData, resetConfirmTokenData, addNewpass }
export const {clearLoginSlice} = loginSlice.actions
export default loginSlice.reducer;
