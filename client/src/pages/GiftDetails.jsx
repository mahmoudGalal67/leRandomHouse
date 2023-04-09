import React, { useEffect, useState } from 'react'
import "./productDetails.scss"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { fetchFailure, fetchFinish, fetchStart } from '../redux/cartSlice'

import {BsBag} from "react-icons/bs"
import Slider from "react-slick";
import axios from "axios"
import {  useLocation, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'

function GiftDetails() {


  const { user } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.cart)
  const navigate = useHistory()
  

  const location = useLocation()
  const dispatch = useDispatch()
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"
  const id = location.pathname.split("/")[3]
  const category = location.pathname.split("/")[2]
  const type = location.pathname.split("/")[1]
    // const bf = "http://localhost:5000/uploads"
  const bf = "https://api.lerandomhouse.com/uploads"
  const [gift, setgift] = useState({})
  const [similar, setsimilar] = useState([])
  const [admin, setadmin] = useState(false)


  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }, [id])
  
  useEffect(() => {
      const verify = async () => {
        const res = await axios.get(`${baseURL}/admin`, { headers: { verify: user?.verify } })
      setadmin(res.data.verify)
    }
    verify()
  },[user?.verify ,navigate])

  useEffect(() => {
    const getGift = async () => {
      try {
        axios.get(`${baseURL}/products/gift/${id}`).then((productFeed)=>setgift(productFeed.data))
        axios.get(`${baseURL}/products/category?type=${type}&category=${category}`).then((productFeed)=>setsimilar(productFeed.data))
      }
      catch (err) {
        console.log(err)
    }
    }
    getGift()
  }, [id])

  const addToCart = async () => {
    if(!user) return navigate.push("/login")
      dispatch(fetchStart())
      await axios.post(`${baseURL}/cart/${String(user.id)}`, { ...gift})
      dispatch(fetchFinish())
      navigate.push('/cart')
  }
  const settings = {
      infinite: true,
      autoplaySpeed: 2000,
      slidesToShow: similar.length>4 ? 4 : similar.length,
      slidesToScroll: 1,
      // autoplay: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow:similar.length>3 ? 3 : similar.length,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 780,
          settings: {
            slidesToShow: similar.length>2 ? 2 : similar.length,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 560,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ]
  };
  const deleteProduct = async (id, type) => {
    if (window.confirm("Are you sure you want to delete  " + gift.title)) {
    dispatch(fetchStart())
    try {
    await axios.delete((`${baseURL}/products/product/${id}?type=${type}`))
    dispatch(fetchFinish())
    navigate.push("/")
    }
    catch (err) {
      console.log(err)
      dispatch(fetchFailure("Someting went wrong"))
    }
    }
  }
  if(!gift) return
  return (
  <>
    {loading &&
      <div className="flex justify-center items-center top-0 left-0 w-full h-screen bg-overlay fixed">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>}
    <Header />
    <Navbar />
      <div className="product-details m-8">
    <div className='flex items-center av:items-start flex-col av:flex-row text-gray'>
      <div className="left w-10/12 av:w-1/2">
        <div className="image_wrapper flex w-full">
          <div className='w-full px-5'><img className='w-full object-cover sm:h-96 h-60' src={`${bf}/${gift.image}`} alt="" /></div>
          </div>
            <p className='av:my-5 text-center mb-2 px-12 text-sm'>{ gift.desc}</p>
      </div>
      <div className="right av:w-1/2 w-10/12 flex flex-col av:items-start items-center av:gap-4 gap-2 p-5 av:pl-32">
            <div className='text-lg'>{gift.title}</div>
            <div>{gift.price}</div>
        <div className='text-xs items-center flex gap-5 p-3 border-2 border-green-300 w-fit'><img src={require("../assets/images/details/Group (1).png")} alt="" /> Same Day Delivery Available</div>
        <div className='flex items-center  justify-center gap-5 w-60 border-2 border-black py-2 px-4 bg-gray text-center text-white cursor-pointer hover:scale-110 transition duration-100 ease-in-out' onClick={addToCart}><BsBag /> Add To Basket</div>
        {/* <div className='flex items-center justify-center  gap-5 w-60 border-2 border-black py-2 px-4 text-center cursor-pointer hover:scale-110 transition duration-100 ease-in-out'><AiOutlineHeart /> Add to favourites</div> */}
        {admin && <div className='p-4 bg-price my-5 text-white cursor-pointer hover:scale-110'  onClick={()=>deleteProduct(gift.id,gift.type)}>Delete</div>}
        <div className='text-xs items-center flex gap-5'><img src={require("../assets/images/details/Group.png")} alt="" /> Free Online Returns Within 14 Days</div>
        </div>
      </div>
      <div className="same-category my-12">
        <h3 className='text-2xl text-gray text-center mb-5'>You May Also Like</h3>
      {
      similar.length &&
        <Slider {...settings}>
        {similar.map((item) => (
          <div className='similar-item p-5 flex justify-center items-center' key={item.id}>
            <Product className="category-item w-auto" type='similar' product={item} />
          </div>
          ))}
        </Slider>
      }
      </div>
      </div>
      <Footer />
    </>
  )
}


export default GiftDetails