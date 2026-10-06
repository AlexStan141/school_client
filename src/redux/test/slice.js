import { createSlice } from "@reduxjs/toolkit";
import { fetchTests, fetchTeacherTests, getTest, addTest, deleteTest, editTest, processChange } from "./operations";

const handlePending = state => {
    state.loaded = false;
}

const handleRejected = (state, action) => {
    state.loaded = false;
    state.error = action.payload;
}

const testsSlice = createSlice({
    name: "tests",
    initialState: {
        items: [],
        loaded: false,
        error: null,
        success: null,
        filter: ""
    },
    extraReducers: builder => {
        builder
        .addCase(addTest.pending, handlePending)
        .addCase(addTest.rejected, handleRejected)
        .addCase(editTest.rejected, (state, action) => {
            state.loaded = true;
            state.error = action.payload;
        })
        .addCase(editTest.pending, handlePending)
        .addCase(fetchTests.pending, handlePending)
        .addCase(fetchTests.rejected, handleRejected)
        .addCase(fetchTeacherTests.pending, handlePending)
        .addCase(fetchTeacherTests.rejected, handleRejected)
        .addCase(getTest.pending, handlePending)
        .addCase(getTest.rejected, handleRejected)
        .addCase(deleteTest.pending, handlePending)
        .addCase(deleteTest.rejected, handleRejected)
        .addCase(processChange.pending, handlePending)
        .addCase(processChange.rejected, handleRejected)
        .addCase(fetchTests.fulfilled, (state, action) => {
            state.items = action.payload;
            state.error = null;
            state.loaded = true;
        })
        .addCase(fetchTeacherTests.fulfilled, (state, action) => {
            state.items = action.payload;
            state.error = null;
            state.loaded = true;
        })
        .addCase(getTest.fulfilled, (state, action) => {
            state.displayedTest = action.payload;
            state.error = null;
            state.loaded = true;
        })
        .addCase(addTest.fulfilled, (state, action) => {
            state.items.push(action.payload);
            state.error = null;
            state.loaded = true;
            state.success = "Test added successfully!"
        })
        .addCase(editTest.fulfilled, (state, action) => {
            state.error = null;
            state.loaded = true;
            state.success = "Test added successfully!"
        })
        .addCase(deleteTest.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload._id);
            state.error = null;
            state.loaded = true;
            state.success = "Test deleted successfully!"
        })
        .addCase(processChange.fulfilled, state => {
            state.loaded = true;
            state.error = null;
        })
    }
})

export const testsReducer = testsSlice.reducer;