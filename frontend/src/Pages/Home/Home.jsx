import React, { useEffect, useState } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import { Link } from "react-router-dom";
import Product from "../../components/ProductCard/ProductCard";
import MetaData from "../../components/layout/MetaData";
import Loading from '../../components/layout/Loading/Loading'
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../Redux/slice/fetchProduct";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch();
  const { isLoading, products, isError } = useSelector(
    (state) => state.fetchProduct
  );
  

  useEffect(() => {
    dispatch(fetchProduct({keyword, currentPage}));
  }, []);

  return (
    <>
      <MetaData title="Ecommerce" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <Link href="#container">
          <button>
            Scroll <CgMouse />{" "}
          </button>
        </Link>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {
            isLoading || isError ? (
                <Loading/>
            ) : (
                products && products.map((product,idx) => (
                  <Product product={product} key={idx} />
                ))
            )
        }
       
      </div>
      <div className="viewMoreBtn" >
          <Link to={'/products'} ><button>View More</button></Link>
        </div>
    </>
  );
}

export default Home;
