import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "../utils/Toast";





const getProfileData = createAsyncThunk('api/getprofile', () => {
    let token = localStorage.getItem("token")
    let config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/user/myprofile`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            if (error.response)
                toast.error(`${error.response.data.errMessage}`)
        })
})

const updateProfile = createAsyncThunk('api/update', (data, { dispatch }) => {
    let token = localStorage.getItem("token")
    let config = {
        method: 'put',
        url: `${process.env.REACT_APP_BASEURL}/api/user/update`,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            toast.success("Profile updated successfully !")
            dispatch(getProfileData())
            return response.data
        })
        .catch(error => {
            if (error.response)
                toast.error(`${error.response.data.errMessage}`)
        })
})
const addProfilePic = createAsyncThunk('api/addprofilepic', (formData, { dispatch }) => {
    let token = localStorage.getItem("token")
    let config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASEURL}/api/user/change-profile-pic`,
        data: formData,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            toast.success("Profile pic added successfully !")
            dispatch(getProfileData())
            return response.data
        })
        .catch(error => {
            if (error.response)
                toast.error(`${error.response.data.errMessage}`)
        })
})



const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: [],
        error: "",
        loading: false
    },
    reducers: {
        clearProfileSlice: (state, action)=>{
            state = {
                data: [],
                error: "",
                loading: false
            }
        }
    },
    extraReducers: {
        [getProfileData.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        [getProfileData.pending]: (state) => {
            state.loading = true
        },
        [getProfileData.rejected]: (state) => {
            state.loading = false
            state.error = "Project not added !"
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.loading = false
        },
        [updateProfile.pending]: (state) => {
            state.loading = true
        },
        [updateProfile.rejected]: (state) => {
            state.loading = false
            state.error = "Project not added !"
        },
        [addProfilePic.fulfilled]: (state, action) => {
            state.loading = false
        },
        [addProfilePic.pending]: (state) => {
            state.loading = true
        },
        [addProfilePic.rejected]: (state) => {
            state.loading = false
            state.error = "Project not added !"
        },
    }
})


export { getProfileData, updateProfile, addProfilePic }
export const {clearProfileSlice} = profileSlice.actions
export default profileSlice.reducer;