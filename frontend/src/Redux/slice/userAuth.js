import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// Action => check user is logined or not ?

export const checkAuth = createAsyncThunk('checkAuth', async() => {
    const response = axios.get('http://localhost:4000/api/v1/profile');
    
    return (await response).data;

});

//Slice for check user auth

const checkAuthSlice = createSlice({
    name : 'checkAuth',
    initialState : {
        isLoading : true,
        isError : false,
        isAuthenticated : false,
        user : {}
    },

    extraReducers : (builder) => {
        builder.addCase(checkAuth.pending, (state, action) => {
            state.isLoading = true
       });
       builder.addCase(checkAuth.fulfilled, (state, action) => {
           state.isLoading = false;
           state.user = action.payload.user;
           state.token = action.payload.token;
           console.log("This is state token",state.token);
       });
       builder.addCase(checkAuth.rejected, (state, action) => {
           state.isError  = true;
           state.isLoading = true
       });
    }
})

export default checkAuthSlice.reducer;

