import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
//make http post req to login user
export const exercRender=createAsyncThunk('exerciserender',async()=>{
    let response = await axios.get("http://localhost:4000/exercise/get-exercise")
    return response.data.payload;
});

let exerciseSlice=createSlice({
    name:"exercise",
    initialState:{
        exercObj:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        errMsg:''

    },
    reducers:{
    },
    extraReducers:{
        //track lyfcycle of promise returned by createAsyncThunk function
        [exercRender.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [exercRender.fulfilled]:(state,action)=>{
            state.exercObj=action.payload;
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.errMsg='';

        },
        [exercRender.rejected]:(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.exercObj={};
            state.errMsg=action.payload.message;
        },

    }
})

//export action creators
export default exerciseSlice.reducer;

