import React, { useEffect } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import {setWishlist , deleteWishlist} from "../redux/wishlistSlice"

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {  Link, useHistory } from 'react-router-dom'
import { AiFillDelete } from "react-icons/ai"

function Wishlist() {
  // const bf = "http://localhost:5000/uploads"
  const bf = "https://api.lerandomhouse.com/uploads"
  const {user}= useSelector((state) => state.auth)
  const {wishlist}= useSelector((state) => state.wishlist)
  const navigate = useHistory()
  const dispatch = useDispatch()
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"
  useEffect(() => {
    if (!user) {
      navigate.push("/login")
    }
  },[user , navigate])

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/wishlist/${user?.id}`)
        dispatch(setWishlist(data))
      }
      catch (err) {
        console.log(err);
      }
    }
    getWishlist()
  },[user , dispatch])

  const deleteFromWishlist = (id , userId) => {
    axios.delete(`${baseURL}/wishlist/${id}/${userId}`)
    dispatch(deleteWishlist(id))
  }
  return (
  <div className='min-h-screen flex justify-between flex-col'>
    <Header />
      <div className='cart mx-12'>
        <div className='flex flex-col gap-3 justify-center'>
          <h3 className='font-bold text-3xl text-center'>My Wishlist</h3>
          <p className='text-center text-fade'>Personalize Your Shopping Experience With Your Wishlist.</p>
          <div className='h-px text-mute w-full bg-fade my-5'></div>
        </div>
          <div className='flex flex-col gap-3'>
          <h3 className='font-bold text-3xl' >Heart It.</h3>
          <div className=' text-fade'>Store Everything You Love On One Page.</div>
          <p className=' text-gray'>Think About It Before Purchasing It.</p>
          <div className='text-gray'> Get Notification About Out-Of-Stock Items.</div>
          <div className="cart-wrapper p-5 flex justify-around gap-4 items-center flex-wrap">
          {!wishlist.length ? <div >NO Found Items</div> :
            wishlist.map((item) => (
          <div className="cart-item w-60 flex-col flex justify-center gap-3 relative" key={item.id}>
          <Link to={item.type==="gifts" ?`/gifts/${item.category}/${item.id}` :`/product/${item.type}/${item.category}/${item.id}`}><img className='object-cover w-full h-60' src={`${bf}/${item.image}`} alt="" /></Link>
          <div  className='text-center'>{item.title}</div>
              <div className='text-center'>{item.price}</div>
              <AiFillDelete className='text-2xl cursor-pointer text-red absolute bottom-20 opacity-0 right-1' onClick={()=>deleteFromWishlist(item.id ,user.id)}/>
          </div>
          ))}
        </div>
        </div>
      </div>
    <Footer />
  </div>
  )
}

export default Wishlist

