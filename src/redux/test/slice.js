import { createSlice } from "@reduxjs/toolkit";
import { fetchTests, fetchTeacherTests, getTest } from "./operations";

const handlePending = state => {
    state.isLoading = true;
}

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
}

const testsSlice = createSlice({
    name: "tests",
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        displayedTest: {}
    },
    extraReducers: builder => {
        builder
        .addCase(fetchTests.pending, handlePending)
        .addCase(fetchTests.rejected, handleRejected)
        .addCase(fetchTeacherTests.pending, handlePending)
        .addCase(fetchTeacherTests.rejected, handleRejected)
        .addCase(getTest.pending, handlePending)
        .addCase(getTest.rejected, handleRejected)
        .addCase(fetchTests.fulfilled, (state, action) => {
            state.items = action.payload;
            state.error = null;
            state.isLoading = false;
        })
        .addCase(fetchTeacherTests.fulfilled, (state, action) => {
            state.items = action.payload;
            state.error = null;
            state.isLoading = false;
        })
        .addCase(getTest.fulfilled, (state, action) => {
            state.displayedTest = action.payload;
            state.error = null;
            state.isLoading = false;
        })
    }
})

export const testsReducer = testsSlice.reducer;