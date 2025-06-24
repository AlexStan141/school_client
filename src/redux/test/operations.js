import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

axios.defaults.baseURL = "https://school-server-59er.onrender.com";

export const fetchTests = createAsyncThunk("tests/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/test");
            //response.data contine datele luate din backend  
            return response.data.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const fetchTeacherTests = createAsyncThunk("tests/fetchTeacherTests",
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(`/test/${userId}`);
            return response.data.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const removeTest = createAsyncThunk("tests/removeTest",
    async (testId, thunkAPI) => {
        try {
            const response = await axios.delete(`/test/${testId}`);
            return response.data.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const addTest = createAsyncThunk("tests/addTest", 
    async({title, questions}, thunkAPI) => {
        try{
            const response = await axios.post(`/test`, {title, questions});
            return response.data.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const getTest = createAsyncThunk("tests/getTest",
    async(testId, thunkAPI) => {
        try{
            const response = await axios.get(`/test/test/${testId}`);
            return response.data.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const editTest = createAsyncThunk("tests/editTest",
    async({ testId, title, questions}, thunkAPI) => {
        try{
            const response = await axios.put(`/test/${testId}`, {title, questions});
            return response.data.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const deleteTest = createAsyncThunk("tests/deleteTest",
    async(testId, thunkAPI) => {
        try{
            const response = await axios.delete(`/test/${testId}`);
            return response.data.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)