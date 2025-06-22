import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

axios.defaults.baseURL = "https://school-server-59er.onrender.com"

export const fetchTests = createAsyncThunk("tests/fetchAll",
    async (_, thunkAPI) => {
        try{
            const response = await axios.get("/test")
            //response.data contine datele luate din backend  
            return response.data.data
        } catch(e){
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const fetchTeacherTests = createAsyncThunk("tests/fetchTeacherTests",
    async (userId, thunkAPI) => {
        try{
            const response = await axios.get(`/test/${userId}`)
            return response.data.data
        } catch(e){
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)