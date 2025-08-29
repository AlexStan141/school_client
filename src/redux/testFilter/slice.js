import { createSlice } from "@reduxjs/toolkit";

const testFilterSlice = createSlice({
    name: "testFilter",
    initialState: {
        value: ""
    },
    reducers: {
        setTestFilter(state, action){
            state.value = action.payload;
        }
    }
})

export const {setTestFilter} = testFilterSlice.actions;
export const testFilterReducer = testFilterSlice.reducer;