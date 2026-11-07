import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

axios.defaults.baseURL = "http://localhost:5000";

export const fetchSchools = createAsyncThunk("schools/fetchAll", 
    async(_, thunkAPI) => {
        try{
            const response = await axios.get("/school");
            return response.data.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)
