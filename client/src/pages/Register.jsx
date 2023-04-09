import React, { useRef,useEffect ,useState} from 'react'
import axios from 'axios'
import { useHistory ,useLocation, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {BiShow ,BiHide} from "react-icons/bi"

import Footer from "../components/Footer";
import Header from "../components/Header";
import { fetchStart , fetchFailure, fetchFinish } from '../redux/authSlice';


function Register() {
  const { loading, error } = useSelector((state) => state.auth)
  const navigate = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"

  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const password = useRef()
  
  const [showPassword, setshowPassword] = useState(false)
  const handleShowPassword = () => {
    setshowPassword((prev)=>!prev)
  }

  useEffect(() => {
    dispatch(fetchFinish())
  },[location.pathname ,dispatch])

  const register = async (e) => {
    e.preventDefault()
    
    if (firstName.current.value !== '' && lastName.current.value !== '' && email.current.value !== '' && password.current.value !== '') {
      dispatch(fetchStart())
      try {
      const userInfo ={firstName:firstName.current.value , lastName:lastName.current.value , email:email.current.value ,password:password.current.value}
        await axios.post(`${baseURL}/auth/register`, userInfo)
        dispatch(fetchFinish())
        navigate.push("/login")
    }
      catch (err) {
        dispatch(fetchFailure(err.response.data))
    }
  } else {
    dispatch(fetchFailure("Please add all fields"))
    }}
  return (
    <>
  <Header />
        {loading &&
      <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-overlay">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>}
    <div className='register relative'>
      <div className='m-12'>
        <div className='text-center text-black font-bold md:text-5xl text-3xl my-8'>Create account</div>
        <form className='flex flex-col justify-center md:w-1/2 w-full m-auto' onSubmit={register}>
          <input className='p-5 outline-none border-2 my-5' type="text" placeholder='first name' ref={firstName}/>
          <input className='p-5 outline-none border-2 my-5' type="text" placeholder='last name' ref={lastName}/>
          <input className='p-5 outline-none border-2 my-5' type="email" placeholder='Email' ref={email}/>
          <div className='p-5 outline-none border-2 my-5 flex justify-between items-center'><input className='outline-none w-full' autoComplete={password} type={showPassword?"text":"password"} placeholder='Password' ref={password} />{ !showPassword ?<BiShow className='text-2xl cursor-pointer' onClick={handleShowPassword}/>:<BiHide className='text-2xl cursor-pointer' onClick={handleShowPassword}/>}</div>
            <Link className='underline text-center my-5' to="/login">Already have account</Link>
          {error && <div className='error'>{ error}</div>}
          <button type='submit' className='p-4 text-white bg-black w-2/5 m-auto transition duration-75 transform hover:scale-110 ease-in-out'>Create</button>
        </form>
      </div>
    </div>
  <Footer />
    </>
  )
}

export default Register