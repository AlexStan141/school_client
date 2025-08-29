import { createSlice } from "@reduxjs/toolkit";
import { fetchTests, fetchTeacherTests, getTest, addTest, deleteTest } from "./operations";

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
        displayedTest: {},
        filter: ""
    },
    extraReducers: builder => {
        builder
        .addCase(addTest.pending, handlePending)
        .addCase(addTest.rejected, handleRejected)
        .addCase(fetchTests.pending, handlePending)
        .addCase(fetchTests.rejected, handleRejected)
        .addCase(fetchTeacherTests.pending, handlePending)
        .addCase(fetchTeacherTests.rejected, handleRejected)
        .addCase(getTest.pending, handlePending)
        .addCase(getTest.rejected, handleRejected)
        .addCase(deleteTest.pending, handlePending)
        .addCase(deleteTest.rejected, handleRejected)
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
        .addCase(addTest.fulfilled, (state, action) => {
            state.items.push(action.payload);
            state.error = null;
            state.isLoading = false;
        })
        .addCase(deleteTest.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload._id);
            state.error = null;
            state.isLoading = false;
        })
    }
})

export const testsReducer = testsSlice.reducer;