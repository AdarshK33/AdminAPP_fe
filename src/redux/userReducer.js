import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { toast } from "../utils/Toast";

const addUser = createAsyncThunk("api/add-user", (data) => {
    let token = localStorage.getItem("token")
    let config = {
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/user/new`,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            toast.success("User added successfully !")
            return response.data
        })
        .catch(error => {
            if (error.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})
const userData = createAsyncThunk("api/get-user", ({ searchKey = "", project_id = "", pageNumber = 1, perPage = 10 }) => {
    let token = localStorage.getItem("token")
    let key = searchKey ? "&searchKey=" + searchKey : ""
    let projId = project_id ? "&project_id=" + project_id : ""
    let number = pageNumber ? "&page_number=" + pageNumber : ""
    let perPageCount = perPage ? "&per_page=" + perPage : "&per_page=10"
    let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/user/all?s=s&${key}${projId}${number}${perPageCount}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            return response.data
        })
})


const deleteUser = createAsyncThunk("api/delete-user", (id) => {
    let token = localStorage.getItem("token")
    let config = {
        method: "delete",
        url: `${process.env.REACT_APP_BASEURL}/api/user/delete/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            toast.success("User deleted successfully !")
            return response.data
        })
        .catch(error => {
            if (error.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})

const getSingleUser = createAsyncThunk("api/single-user", (id, { dispatch }) => {
    let token = localStorage.getItem("token")
    let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/user/user-data/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    return axios(config)
        .then(response => {
            dispatch(updateSingleUserData({
                name: response.data.data.name,
                role: response.data.data.role,
                password: "",
                status: response.data.data.status,
                designation: response.data.data.designation,
                email: response.data.data.email,
                email_password: response.data.data.email_password

            }))
            return response.data

        })

        .catch(error => {
            if (error.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})

const updateUserByAdmin = createAsyncThunk("api/update-user", ({ id, data }, { dispatch }) => {
    let token = localStorage.getItem("token")
    let config = {
        method: "put",
        url: `${process.env.REACT_APP_BASEURL}/api/user/update/${id}`,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            toast.success("User updated successfully !")
            dispatch(userData({}))
            return response.data
        })
        .catch(error => {
            if (error.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})


const getSingleUserProject = createAsyncThunk("api/single-user-project", (id, { dispatch }) => {
    let token = localStorage.getItem("token")
    let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/user_project/user-data/${id}`,
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


const getProjectByClientId = createAsyncThunk("api/project-by-client-id", (id, { dispatch }) => {
    // const projectClientId = getState().formData.project_client_id;
    let token = localStorage.getItem("token")
    let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/user_project/client-project/${id}`,
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


const addNewProject = createAsyncThunk("api/add-new-project", (data, { dispatch }) => {
    let token = localStorage.getItem("token")
    let config = {
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/user_project/new`,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            toast.success("project added successfully !")
            dispatch(getSingleUserProject(data.user_id))
            return response.data
        })
        .catch(error => {
            if (error.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})


const unassignProject = createAsyncThunk("api/unassign-project", (data, { dispatch }) => {
    console.log(data, "hello data")
    let token = localStorage.getItem("token")
    let config = {
        method: "put",
        url: `${process.env.REACT_APP_BASEURL}/api/user_project/update`,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            toast.success("projectstatus Updated successfully !")
            dispatch(getSingleUserProject(data.user_id))
            return response.data
        })
        .catch(error => {
            if (error.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})


const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        addUser: {},
        addNewProject: {},
        error: "",
        deleteUserStatus: null,
        singleUser: {},
        singleUserProject: [],
        projectByClientId: [],
        unassignProject: {},
        loading: false
    },
    reducers: {
        clearDeleteUserSuccess: (state, action) => {
            state.loading = false
            state.deleteUserStatus = action.payload
        },
        updateSingleUserData: (state, action) => {
            state.loading = false
            state.singleUser = action.payload
        },
        clearUserSlice: (state, action) => {
            state = {
                data: [],
                addUser: {},
                addNewProject: {},
                error: "",
                deleteUserStatus: null,
                singleUser: {},
                singleUserProject: [],
                projectByClientId: [],
                unassignProject: {},
                loading: false
            }
        }
    },
    extraReducers: {
        [addUser.fulfilled]: (state, action) => {
            state.loading = false
            state.addUser = action.payload
        },
        [addUser.pending]: (state) => {
            state.loading = true
        },
        [addUser.rejected]: (state) => {
            state.loading = false
            state.error = "User not added !"
        },

        [addNewProject.fulfilled]: (state, action) => {
            state.loading = false
            state.addNewProject = action.payload
        },
        [addNewProject.pending]: (state) => {
            state.loading = true
        },
        [addNewProject.rejected]: (state) => {
            state.loading = false
            state.error = "User not added !"
        },

        [userData.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        [userData.pending]: (state) => {
            state.loading = true
        },
        [userData.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false
            state.deleteUserStatus = action.payload
        },
        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.rejected]: (state) => {
            state.loading = false
            state.error = "User not deleted !"
        },
        [getSingleUser.fulfilled]: (state) => {
            state.loading = false
        },
        [getSingleUser.pending]: (state) => {
            state.loading = true
        },
        [getSingleUser.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong !"
        },
        [updateUserByAdmin.fulfilled]: (state) => {
            state.loading = false
        },
        [updateUserByAdmin.pending]: (state) => {
            state.loading = true
        },
        [updateUserByAdmin.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong !"
        },

        [unassignProject.fulfilled]: (state, action) => {
            state.loading = false
            state.unassignProject = action.payload
        },
        [unassignProject.pending]: (state) => {
            state.loading = true
        },
        [unassignProject.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong !"
        },

        [getSingleUserProject.fulfilled]: (state, action) => {
            state.loading = false
            state.singleUserProject = action.payload
        },
        [getSingleUserProject.pending]: (state) => {
            state.loading = true
        },
        [getSingleUserProject.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong !"
        },

        [getProjectByClientId.fulfilled]: (state, action) => {
            state.loading = false
            state.projectByClientId = action.payload
        },
        [getProjectByClientId.pending]: (state) => {
            state.loading = true
        },
        [getProjectByClientId.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong !"
        },

    }
})

export { addUser, userData, deleteUser, getSingleUser, updateUserByAdmin, getSingleUserProject, getProjectByClientId, addNewProject, unassignProject }
export const { clearDeleteUserSuccess, updateSingleUserData, clearUserSlice } = userSlice.actions
export default userSlice.reducer;
