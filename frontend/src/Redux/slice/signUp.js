import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

//Action for Sign Up function

export const userSignUp = createAsyncThunk('userSignUp', async(body) => {
    const result = await axios.post('http://localhost:4000/api/v1/register', body);
    console.log(result.data);
    return result.data;
});

//Slice for Sign Up function 

const userSignUpSlice = createSlice({
    name : 'userSignUp',
    initialState : {
        isLoading : false,
        isError : false,
        user : {},
        token : ''
    },
    extraReducers : (builder) => {
        builder.addCase(userSignUp.pending, (state, action) => {
            state.isLoading = true
       });
       builder.addCase(userSignUp.fulfilled, (state, action) => {
           state.isLoading = false;
           state.user = action.payload.user;
           state.token = action.payload.token;
           console.log("This is state token",state.token);
       });
       builder.addCase(userSignUp.rejected, (state, action) => {
           state.isError  = true;
           state.isLoading = true
       });
    }
})

export default userSignUpSlice.reducer;