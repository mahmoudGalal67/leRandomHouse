import React, { useRef ,useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useHistory ,useLocation } from 'react-router-dom'

import { GoogleLogin } from '@react-oauth/google';
import {FacebookLoginButton} from 'react-social-login-buttons'
import { LoginSocialFacebook } from 'reactjs-social-login'
import jwt_decode from "jwt-decode";

import {BiShow ,BiHide} from "react-icons/bi"

import Footer from "../components/Footer";
import Header from "../components/Header";
import { addUser , fetchStart , fetchFailure, fetchFinish} from '../redux/authSlice';

import { useDispatch, useSelector } from 'react-redux'


function Login() {
  const { loading, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useHistory()
  const location = useLocation()
  
  // const baseURL = "http://localhost:5000"
    const baseURL = "https://api.lerandomhouse.com"


  const email = useRef()
  const password = useRef()
  const [showPassword, setshowPassword] = useState(false)
  const handleShowPassword = () => {
    setshowPassword((prev)=>!prev)
  }
  useEffect(() => {
    dispatch(fetchFinish())
  },[location.pathname ,dispatch])

  const login = async (e) => {
    e.preventDefault()
    if (email.current.value !== '' && password.current.value !== '') {
      dispatch(fetchStart())
      try {
        const userInfo = { email: email.current.value, password: password.current.value }
        const { data } = await axios.post(`${baseURL}/auth/login`, userInfo)
        dispatch(addUser(data))
        dispatch(fetchFinish())
        navigate.push("/")
      } catch (err) {
      dispatch(fetchFailure(err.response.data))
      }}
    else {
      dispatch(fetchFailure("Please add all fields"))
    }
  }
  
  const googleSuccess = ({ credential }) => {
    let decodedHeader = jwt_decode(credential);
    dispatch(addUser({
      id:String(decodedHeader.sub),
      firstName: decodedHeader.given_name,
      lastName: decodedHeader.family_name,
      email:decodedHeader.email,
    }))
    navigate.push("/")
}

  const facebookSuccess = ({ data }) => {
    dispatch(addUser({
      id:  String(data.id) ,
      firstName: data.first_name,
      lastName: data.last_name,
      email:data.email,
    }))
    navigate.push("/")
  }
  return (
    <>
    <Header/>
    <div className='login '>
      <div className='m-12'>
        {loading &&
      <div className="flex justify-center items-center top-0 left-0 w-full h-full bg-overlay fixed">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>}
        <div className='text-center text-black font-bold md:text-5xl text-3xl my-8'>Login</div>
        <form className='flex flex-col justify-center md:w-1/2 w-full m-auto' onSubmit={login}>
          <input className='p-5 outline-none border-2 my-5' type="email" placeholder='Email' ref={email}/>
          <div className='p-5 outline-none border-2 my-5 flex justify-between items-center'><input className='outline-none w-full' type={showPassword?"text":"password"} autoComplete={password} placeholder='Password' ref={password} />{ !showPassword ?<BiShow className='text-2xl cursor-pointer' onClick={handleShowPassword}/>:<BiHide className='text-2xl cursor-pointer' onClick={handleShowPassword}/>}</div>
          <Link className='underline my-5' to="/forgetPassword">Forget password</Link>
          {error && <div className='error'>{ error}</div>}
            <button type='submit' className='p-4 text-white bg-black w-2/5 m-auto transition duration-75 transform hover:scale-110 ease-in-out'>Login</button>
            <div className='flex flex-col items-center w-full justify-center gap-5 mt-8'>
              <GoogleLogin
                style={{ padding:"20px"}}
                onSuccess={googleSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
              />
              <LoginSocialFacebook
              appId='872195537325397'
              onResolve={facebookSuccess}
              onReject={(err) => {
              console.log(err)
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
            </div>
          <Link className='underline text-center my-5' to="/register">Create account</Link>
        </form>
      </div>
      </div>
      <Footer/>
    </>
  )
}

export default Login