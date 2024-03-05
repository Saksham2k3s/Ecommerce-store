import React, { useEffect, useState } from 'react'
import { fetchProduct } from '../../Redux/slice/fetchProduct';
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/layout/Loading/Loading';
import Product from '../../components/ProductCard/ProductCard';
import './Products.css'
import Search from '../../components/Search/Search';
import { useParams } from 'react-router-dom';
import {Slider, Typography} from '@mui/material';

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "mobiles",
]

function Products() {
  const { keyword } = useParams();
    const dispatch = useDispatch();
    const { isLoading, isError, products, resultPerPage, pcountProducts} = useSelector(state => state.fetchProduct);
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 50000]);
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(5);
    const lastPage = Math.ceil(pcountProducts / resultPerPage)
    
    useEffect(() => {
        dispatch(fetchProduct({keyword, currentPage, price, category}));
    }, [dispatch, keyword, currentPage, price,category]);

    

    const handleFirstPage = () => {
      setCurrentPage(1)
    }

    const handleNextPage = () => {
      setCurrentPage(currentPage+1)
    }

const handlePrevPage = () => {
  setCurrentPage(currentPage-1)
}

const handleLastPage = () => {
  setCurrentPage(lastPage)
}

const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
};

    if(isLoading) return <> <Loading/> </>
  return (
   
    <>
    <Search/>
    <div className='container'>
        {
            products && products.map((product,idx) => (
                <Product product={product} key={idx}  />
              ))
        }
    </div>
    
     <div className="filterBox">
  
     <Typography>Categories</Typography>
    { category && <div className='selectedCatogery'>
      <div>{category}</div>
      <div className='remove' onClick={() => setCategory('')} >&times;</div>
      </div>} 
       <ul className='categoryBox' >
      {
        categories.map((category) => (
          <li className={`category-link`} key={category} onClick={() => setCategory(category)} >{category}</li>
        ))
      }
       </ul>

       {/* ToDo - Ratings Filter */}
  
      {/* <fieldset>
        <Typography component="legend" >Ratings Above</Typography>
        <Slider value={rating} 
         onChange={(e, newRating) => {
          setRating(newRating);
          
         }}
         valueLabelDisplay='auto'
         aria-labelledby='continous-slider'
         max={5}
         min={0}
        />
      </fieldset> */}

      <Typography>Price</Typography>
       <Slider value={price} onChange={priceHandler} valueLabelDisplay='auto' aria-label='range-slider' min={0} max={50000} />
      </div>    

    <div className="paginationBox">
  <button onClick={handleFirstPage} className="paginationButton">1st</button>
  <button onClick={handlePrevPage} className="paginationButton" disabled={currentPage <= 1}>Prev</button>
  <button className="currentPage">{currentPage}</button>
  <button onClick={handleNextPage} className="paginationButton" disabled={currentPage >= lastPage}>Next</button>
  <button onClick={handleLastPage} className="paginationButton">Last</button>
</div>

         
    </>
  )
}

export default Products