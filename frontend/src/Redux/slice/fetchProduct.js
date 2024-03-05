
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//Action
export const fetchProduct = createAsyncThunk('fetchProduct', async ({keyword = '', currentPage = 1, price = [0, 50000], category, rating = 0}) => {
    
    try {
        console.log("This is category",category);
        if(category){
            const products = await fetch(`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`);
            const data = await products.json();
            console.log(data);
            return data; 
        }
            const products = await fetch(`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`);
            const data = await products.json();
            console.log(data);
            return data;  
       
    } catch (error) {
        throw new Error('Failed to fetch products', error);
    }
});


const fetchProductSlice = createSlice({
    name : 'fetchProduct',
    initialState : {
        isLoading : false,
        isError : false,
        products : [],
        pcountProducts : 0,
        resultPerPage : 0,
        
    },
    extraReducers : (builder) => {
        builder.addCase(fetchProduct.pending, (state, action) => {
            state.isLoading = true
        });
         builder.addCase(fetchProduct.fulfilled, (state, action) => {
           state.isLoading = false;
           state.products = action.payload.result;
           state.pcountProducts = action.payload.countProducts;
           state.resultPerPage = action.payload.resultPerPage;
           
         });
         builder.addCase(fetchProduct.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true
         });
    }
});

export default fetchProductSlice.reducer;