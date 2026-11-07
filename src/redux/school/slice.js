import { createSlice } from "@reduxjs/toolkit";
import { fetchSchools } from "./operations";

const handlePending = state => {
    state.loaded = false;
}

const handleRejected = (state, action) => {
    state.loaded = false;
    state.error = action.payload;
}

const schoolsSlice = createSlice({
    name: "schools",
    initialState: {
        items: [],
        loaded: false,
        error: null    
    },
    extraReducers: builder => {
        builder
        .addCase(fetchSchools.pending, handlePending)
        .addCase(fetchSchools.rejected, handleRejected)
        .addCase(fetchSchools.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loaded = false;
            state.error = null;
        })
    }
})

export const schoolsReducer = schoolsSlice.reducer;