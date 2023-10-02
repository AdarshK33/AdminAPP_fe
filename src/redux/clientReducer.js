import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "../utils/Toast";


const getClientsData = createAsyncThunk('api/getclients', ({ searchKey = "", pageNumber = 1, perPage = 10 }) => {
    let token = localStorage.getItem("token")
    let key = searchKey ? "&searchKey=" + searchKey : ""
    let number = pageNumber ? "&page_number=" + pageNumber : ""
    let perPageCount = perPage ? "&per_page=" + perPage : "&per_page=10"
    let config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/client/all?s=s&${key}${number}${perPageCount}`,
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

const addClient = createAsyncThunk('api/addclients', (data, { dispatch }) => {
    let token = localStorage.getItem("token")
    let config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASEURL}/api/client/new`,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            toast.success("Client added successfully !")
            console.log(response.data);
            return response.data
        })
        .catch(error => {
            if (error.response)
                toast.error(`${error.response.data.errMessage}`)
        })
})
const deleteClient = createAsyncThunk('api/deleteclient', (id) => {
    let token = localStorage.getItem("token")
    let config = {
        method: 'delete',
        url: `${process.env.REACT_APP_BASEURL}/api/client/delete/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            toast.success("Client deleted successfully !")
            return response.data
        })
        .catch(error => {
            if (error.response)
                toast.error(`${error.response.data.errMessage}`)
        })
})


const updateClient = createAsyncThunk('api/updateclients', ({ client_id, data }, { dispatch }) => {
    let token = localStorage.getItem("token")
    let config = {
        method: 'put',
        url: `${process.env.REACT_APP_BASEURL}/api/client/update/${client_id}`,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            dispatch(updateSingleClient({}))
            dispatch(getClientsData({}))
            return response.data
        })
})

const getSingleClientData = createAsyncThunk('api/getsingleclients', (client_id, { dispatch }) => {
    let token = localStorage.getItem("token")
    let config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASEURL}/api/client/client-data/${client_id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(response => {
            dispatch(updateSingleClient({
                name: response.data.data.client_name,
                email: response.data.data.client_email,
                contact: response.data.data.client_contact,
                address: response.data.data.client_address,
                project_user_ids: response.data.data.project_user_ids
            }))
            return response.data
        })
})


const clientSlice = createSlice({
    name: 'client',
    initialState: {
        data: [],
        singleClient: {},
        addClient: {},
        updateClient: {},
        deleteClient: null,
        error: "",
        loading: false
    },
    reducers:{
        updateSingleClient: (state, action)=>{
            state.singleClient = action.payload
        },
        clearClientSlice: (state, action)=>{
            state = {
                data: [],
                singleClient: {},
                addClient: {},
                updateClient: {},
                deleteClient: null,
                error: "",
                loading: false
            }
        }
    },
    extraReducers: {
        [getClientsData.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        [getClientsData.pending]: (state) => {
            state.loading = true
        },
        [getClientsData.rejected]: (state) => {
            state.loading = false
            state.error = "Something went wrong"
        },
        [addClient.fulfilled]: (state, action) => {
            state.loading = false
            state.addClient = action.payload
        },
        [addClient.pending]: (state) => {
            state.loading = true
        },
        [addClient.rejected]: (state) => {
            state.loading = false
            state.error = "Client not added!"
        },
        [deleteClient.fulfilled]: (state, action) => {
            state.loading = false
            state.deleteClient = action.payload

        },
        [deleteClient.pending]: (state) => {
            state.loading = true
        },
        [deleteClient.rejected]: (state) => {
            state.loading = false
            state.error = "Client not deleted!"
        },
        [getSingleClientData.fulfilled]: (state,action) => {
            state.loading = false
        },
        [getSingleClientData.pending]: (state) => {
            state.loading = true
        },
        [getSingleClientData.rejected]: (state) => {
            state.loading = false
            state.error = "No Client Data!"
        }
    }
})

export { getClientsData, addClient, getSingleClientData, updateClient,deleteClient }
export const { clearClientSuccess, updateClientData, clearClientSlice } = clientSlice.actions
export const {updateSingleClient} = clientSlice.actions
export default clientSlice.reducer;