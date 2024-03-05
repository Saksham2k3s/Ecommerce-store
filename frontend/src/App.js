import React, { useEffect } from "react";
import Header from "./components/layout/Header/Header";
import { Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import Footer from "./components/layout/Footer/Footer";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import Products from "./Pages/Products/Products";
import LoginSingUp from "./Pages/User/LoginSignUp";
import Account from './Pages/User/Account'

import { checkAuth } from "./Redux/slice/userAuth";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.checkAuth);

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

   
  }, [dispatch]);

  useEffect(() => {
    console.log("This is isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/details/:id" element={<Details />} />
        <Route path="/login" element={<LoginSingUp />} />
        <Route path="/account" element={<Account/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
