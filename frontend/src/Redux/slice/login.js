
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

//Action => put the login details 

export const userLogin = createAsyncThunk('userLogin', async(body) => {

   

// const config = { headers : { 'Content-Type' : 'application/json' }}
  
    const result = await axios.post('http://localhost:4000/api/v1/login', body);
    console.log(result.data);
    return result.data;
});



//Slice for login 

const userLoginSlice = createSlice({
    name : 'userLogin',
    initialState : {
        isLoading : false,
        isError : false,
        errorMessage : '',
        user : {},
        token : ''
    },
     extraReducers : (builder) => {
        builder.addCase(userLogin.pending, (state, action) => {
             state.isLoading = true
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            console.log("This is state token",state.token);
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isError  = true;
            state.isLoading = true;
            state.errorMessage = action.error.message;
        });
     }
})

export default userLoginSlice.reducer;