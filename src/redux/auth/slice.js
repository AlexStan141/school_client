import { createSlice } from "@reduxjs/toolkit"
import { fetchUsers, register, login, logout, refreshUser, getUser, processChange } from "./operations";

const handlePending = state => {
    state.isLoading = true;
}

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
}

const usersSlice = createSlice({
    name: "users",
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        success: null,
        currentUser: {username: null, email: null, role: null},
        token: null,
        isLoggedIn: false,
        isRefreshing: false
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, handlePending)
            .addCase(fetchUsers.rejected, handleRejected)
            .addCase(getUser.pending, handlePending)
            .addCase(getUser.rejected, handleRejected)
            .addCase(register.pending, handlePending)
            .addCase(register.rejected, handleRejected)
            .addCase(login.pending, handlePending)
            .addCase(login.rejected, handleRejected)
            .addCase(logout.pending, handlePending)
            .addCase(logout.rejected, handleRejected)
            .addCase(processChange.pending, handlePending)
            .addCase(processChange.rejected, handleRejected)
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload.data;
            })
            .addCase(register.fulfilled, (state, action) => {
                //state.currentUser = action.payload.data.user
                state.token = action.payload.data.token;
                state.isLoggedIn = true;
                state.error = null;
                state.success = "User registered successfully!"
            })
            .addCase(login.fulfilled, (state, action) => {
                state.currentUser = action.payload.data.user;
                state.token = action.payload.data.token;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.currentUser = {name: null, email: null, role: null};
                state.token = null;
                state.isLoggedIn = false;
            })
            .addCase(refreshUser.pending, state => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
                console.log("isLoggedIn true");
            })
            .addCase(refreshUser.rejected, state => {
                state.isRefreshing = false;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(processChange.fulfilled, state => {
                state.error = null;
            })
    }
});

export const userReducer = usersSlice.reducer;