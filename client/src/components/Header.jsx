import React, { useEffect } from 'react'
import "./header.scss"
import { FaUserCircle } from "react-icons/fa"
import { AiOutlineHeart , AiOutlineLogout} from "react-icons/ai"
import { BsBag } from "react-icons/bs"
import {RxDashboard} from "react-icons/rx"
import { Link,useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { setCart ,resetCart} from "../redux/cartSlice"
import { logout } from '../redux/authSlice' 
import axios from 'axios'


function Header() {
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useHistory()
  const { user } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.cart)
  
    useEffect(() => {
    const getCart = async () => {
      if(user){
        try {
          const { data } = await axios.get(`${baseURL}/cart/${user?.id}`)
          if (!data.length && location.pathname.split("/")[1] === "orderDetails") {
            navigate.push("/")
          }
          dispatch(setCart(data))
        }
        catch (err) {
          console.log(err);
        }
      }
    }
    getCart()
  },[user , dispatch,navigate])

  const removeUser = () => {
    dispatch(logout())
    dispatch(resetCart())
    navigate.push("/")
  }

  return (
    <div className='header'>
    <div className="xl:pl-36 sm:pl-16 av:py-12 py-5 text-center flex justify-between">
      <div className="left px-2">
        <Link className='header-logo lg:text-8xl av:text-5xl sm:text-4xl font-medium text-2xl' to="/">Le Random House</Link>
      </div>
      <div className="right w-1/2 lg:w-1/5 flex items-center mr-3">
          <div className="header-icons flex items-center gap-5 justify-end w-full">
          {!user ? <Link to="/login"><FaUserCircle /></Link> : <AiOutlineLogout className='cursor-pointer hover:text-link' onClick={removeUser}/>}
          <Link to='/wishlist'><AiOutlineHeart/></Link>
            <div className="cart relative">
              <Link to='/cart'><BsBag /></Link>
              {cart.length>0 &&<span className='cart-count'>{cart.length}</span>}
            </div>
            {user?.verify&&<Link to="/dashboard"><RxDashboard/></Link>}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Header