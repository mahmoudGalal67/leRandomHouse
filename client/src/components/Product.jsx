import React from 'react'
import { favourite } from '../redux/wishlistSlice'

import { AiOutlineHeart ,AiFillHeart} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'


const Product = ({ product , type}) => {
  const dispatch = useDispatch()
  const navigate = useHistory()
  // const bf = "http://localhost:5000/uploads"
  const bf = "https://api.lerandomhouse.com/uploads"
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"
  const { wishlist } = useSelector((state) => state.wishlist)
  const {user}= useSelector((state) => state.auth)
  const isFavourite = wishlist.some((item) => item.id === product.id)
  const setFavourite = async () => {
    if(!user) return navigate.push("/login")
    dispatch(favourite(product))
    if (!isFavourite) {
      await axios.post(`${baseURL}/wishlist/${String(user.id)}`, { ...product })
    }
    else {
      await axios.delete(`${baseURL}/wishlist/${product.id}/${String(user.id)}`)
      
    }
  }
  return (
    <div className={type==="similar"?'flex justify-center flex-col gap-3 items-center my-4 w-60':'flex justify-center flex-col items-center w-60 my-4 mx-2'}>
      <div className="relative w-full">
        <Link to={product.type==="gifts" ? `/${product.type}/${product.category}/${product.id}` :`/product/${product.type}/${product.category}/${product.id}`}><img className='object-cover w-full h-60' src={`${bf}/${product.image}`} alt="" loading='lazy'/></Link>
        {isFavourite?<AiFillHeart className='absolute bottom-1 right-3 text-3xl cursor-pointer hover:scale-150 transition-all duration-75 ease-in-out' onClick={setFavourite}/>:
        <AiOutlineHeart className='absolute text-3xl bottom-1 right-3  cursor-pointer hover:scale-105 transition-all duration-75 ease-in-out' onClick={setFavourite}/>}
      </div>
      <p className='text-bold text-base text-center'>{product.title}</p>
      <div className='font-bold text-base text-fade'><span style={{color:"#B12704"}}>{product.price}</span></div>
    </div>
  )
}

export default Product


