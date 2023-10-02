import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "../utils/Toast";

const listProjectStatusWise = createAsyncThunk('api/listprojectstatuswise', ({client_id = "", searchKey = "", pageNumber = 1, perPage = 10 }) => {
    let token = localStorage.getItem("token")
    let key = searchKey ? "&searchKey=" + searchKey : ""
    let number = pageNumber ? "&page_number=" + pageNumber : ""
    let perPageCount = perPage ? "&per_page=" + perPage : "&per_page=10"
    let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/project/all-status-wise?project_client_id=${client_id}&${key}${number}${perPageCount}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            return response.data
        })
})

const updateProjects = createAsyncThunk('api/updateProjects', ({project_id, project_client_id, data}, {dispatch}) => {
    let token = localStorage.getItem("token")

    let config = {
        method: "put",
        url: `${process.env.REACT_APP_BASEURL}/api/project/update/${project_id}`,
        data: data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            dispatch(listProjectStatusWise({client_id: project_client_id, perPage: "all"}))
            dispatch(listProjects({}))
            return response.data
        })
})

const addProject = createAsyncThunk('api/addprojects', (data) => {
    let token = localStorage.getItem("token")

    let config = {
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/api/project/new`,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            toast.success("Project added successfully")
            return response.data
        })
        .catch(error => {
            if (error.response) {
                toast.error(`${error.response.data.errMessage}`)
            }
        })
})

const listProjects = createAsyncThunk('api/listprojects', ({ searchKey = "", status = "",  pageNumber = 1, perPage = 10 }) => {
    let token = localStorage.getItem("token")
    let statuscheck = status ? "&status=" + status : ""
    let key = searchKey ? "&searchKey=" + searchKey : ""
    let number = pageNumber ? "&page_number=" + pageNumber : ""
    let perPageCount = perPage ? "&per_page=" + perPage : "&per_page=10"
    let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/project/all?s=s${key}${number}${perPageCount}${statuscheck}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            return response.data
        })
})

const getProjectDeadlines = createAsyncThunk('api/deadlines', () => {
    let token = localStorage.getItem("token")
    let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/project/deadlines`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios(config)
        .then(response => {
            toast.success("Deadlines of the projects listed !")
            return response.data
        })
})

const deleteProject = createAsyncThunk('api/deleteproject', (id) => {
    let token = localStorage.getItem("token")
    let config = {
        method: 'delete',
        url: `${process.env.REACT_APP_BASEURL}/api/project/delete/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            toast.success("Project deleted successfully !")
            return response.data
        })
        .catch(error => {
            if (error.response)
                toast.error(`${error.response.data.errMessage}`)
        })
})
const getSingleProject = createAsyncThunk('api/getsingleprojectdetail', (project_id, { dispatch }) => {
    let token = localStorage.getItem("token")
    let config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/project/project-data/${project_id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            const project_user_ids = response.data.data.project_user_ids ? (response.data.data.project_user_ids).split(',') : []
            dispatch(updateSingleProject({
                project_name: response.data.data.project_name,
                description: response.data.data.project_description,
                completed_date_time: response.data.data.completed_date_time,
                project_status: response.data.data.project_status,
                project_start_date: response.data.data.project_start_date,
                project_end_date: response.data.data.project_end_date,
                project_manager_id: response.data.data.project_manager_id,
                project_user_ids: project_user_ids,
                project_client_id: response.data.data.project_client_id
            }))
            return response.data
        })
})


const projectSlice = createSlice({
    name: 'project',
    initialState: {
        data: [],
        addProject: {},
        projectDeadlines: [],
        dataStatusWise: [],
        deleteProjectStatus: null,
        singleProject: {},
        error: "",
        loading: false
    },
    reducers: {
        clearDeleteProjectSuccess: (state, action) => {
            state.loading = false
            state.deleteProjectStatus = action.payload
        },
        updateSingleProject: (state, action) => {
            state.loading = false
            state.singleProject = action.payload
        },
        clearDataStatusWise: (state, action) => {
            state.dataStatusWise = []
        },
        clearProjectSlice: (state, action)=>{
            state = {
                data: [],
                addProject: {},
                projectDeadlines: [],
                dataStatusWise: [],
                deleteProjectStatus: null,
                singleProject: {},
                error: "",
                loading: false
            }
        }
    },
    extraReducers: {
        [addProject.fulfilled]: (state, action) => {
            state.loading = false
            state.addProject = action.payload
        },
        [addProject.pending]: (state) => {
            state.loading = true
        },
        [addProject.rejected]: (state) => {
            state.loading = false
            state.error = "Project not added !"
        },
        [listProjects.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        [listProjects.pending]: (state) => {
            state.loading = true
        },
        [listProjects.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [getProjectDeadlines.fulfilled]: (state, action) => {
            state.loading = false
            state.projectDeadlines = action.payload
        },
        [getProjectDeadlines.pending]: (state) => {
            state.loading = true
        },
        [getProjectDeadlines.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [deleteProject.fulfilled]: (state, action) => {
            state.loading = false
            state.deleteProjectStatus = action.payload
        },
        [deleteProject.pending]: (state) => {
            state.loading = true
        },
        [deleteProject.rejected]: (state) => {
            state.loading = false
            state.error = "Project not deleted !"
        },
        [getSingleProject.fulfilled]: (state) => {
            state.loading = false
        },
        [getSingleProject.pending]: (state) => {
            state.loading = true
        },
        [getSingleProject.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong !"
        },
        [listProjectStatusWise.fulfilled]: (state, action) => {
            state.loading = false
            state.dataStatusWise = action.payload
        },
        [listProjectStatusWise.pending]: (state) => {
            state.loading = true
        },
        [listProjectStatusWise.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [updateProjects.fulfilled]: (state, action) => {
            state.loading = false
        },
        [updateProjects.pending]: (state) => {
            state.loading = true
        },
        [updateProjects.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
    }
})


export { addProject, listProjects, getProjectDeadlines, deleteProject,getSingleProject, listProjectStatusWise, updateProjects }
export const { clearDeleteProjectSuccess, clearDataStatusWise,updateSingleProject, clearProjectSlice } = projectSlice.actions
export default projectSlice.reducer;