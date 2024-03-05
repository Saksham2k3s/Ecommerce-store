import { configureStore } from '@reduxjs/toolkit';
import fetchProductReducer from './slice/fetchProduct';
import productDetailsReducer from './slice/productDetails';
import userLoginReducer from './slice/login'
import userSignUpReducer from './slice/signUp'
import checkAuthReducer from './slice/userAuth'
export const store = configureStore({
    reducer : {
          fetchProduct : fetchProductReducer,
          productDetails : productDetailsReducer,
          userLogin : userLoginReducer,
         userSignUp : userSignUpReducer,
         checkAuth : checkAuthReducer
    }
})
