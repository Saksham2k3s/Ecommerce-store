import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'
function Product({product}) {
    const options = {
        edit : false,
        color : 'rgba(20,20,20,0.1)',
        activeColor : 'tomato',
        value : product.ratings ? product.ratings : 0,
        isHalf : true
    }
  return (
    <>
    <Link className='productCard' to = {`/product/details/${product._id}`} >
          <img src='https://assets.ajio.com/medias/sys_master/root/20230703/YxKm/64a2f7b8eebac147fc48ac73/-473Wx593H-466325670-purple-MODEL2.jpg' alt={product.name} />
          <p>{product.name}</p>
          <div>
            <ReactStars {...options} /> <span>{product.numOfReviews}</span>
          </div>
          <span>{product.price}</span>
    </Link>
    </>
  )
}

export default Product