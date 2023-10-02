import { createSlice } from "@reduxjs/toolkit";


const commonSlice = createSlice({
    name: 'common',
    initialState: {
        loading: false
    },
    reducers: {
        isLoading : (state, action)=>{
            state.loading = action.payload
        }
    }
})

export const { isLoading } = commonSlice.actions
export default commonSlice.reducer