import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Action => fetch product details

export const productDetails = createAsyncThunk('productDetails', async (id) => {
  const productDetails = await axios.get(`http://localhost:4000/api/v1/product/details/${id}`);
 
  return productDetails.data
});

//Slice for 

const productDetailsSlice = createSlice({
    name : 'productDetails',
    initialState : {
        isLoading : false,
        isError : false,
        product : {},
    },
    extraReducers : (builder) => {
        builder.addCase(productDetails.pending, (state, action) => {
            state.isLoading = true
        });
         builder.addCase(productDetails.fulfilled, (state, action) => {
           state.isLoading = false;
           state.product = action.payload.product;
           
         });
         builder.addCase(productDetails.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true
         });
    }
});

export default productDetailsSlice.reducer;