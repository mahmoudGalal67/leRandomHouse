import axios from 'axios'
import React, { useRef, useState } from 'react'

import Footer from "../components/Footer";
import Header from "../components/Header";

function ForgetPassword() {
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"
  const email = useRef()
  const newPassword = useRef()
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(null)
  
  const forgetPassword = async (e) => {
  e.preventDefault()
    const emailValue = email.current.value
    const newPasswordValue = newPassword.current.value
    if (newPasswordValue !== "" && emailValue !== "") {
      setloading(true)
      try {
        await axios.post(`${baseURL}/auth/forgetPassword`, { email: emailValue, newPassword: newPasswordValue })
        setloading(false)
      }
      catch (err) {
        seterror(err.response.data);
        setloading(false)
      }
    }
    else {
      seterror("Please add all fields")
    }
  }

  return (
    <>
    <Header />
      <div className='forget-password w-full flex justify-center'>
        {loading &&
      <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-overlay">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>}
      <div className="wrapper flex flex-col gap-2 items-center justify-center lg:w-1/2 w-4/5">
        <img src={require('../assets/logo.png')} className="w-60" alt="" />
        <span className='text-fade'>Welcome back !</span>
        <h2 className='font-bold'>Forget your password ?</h2>
        <form onSubmit={forgetPassword} className="flex flex-col gap-2 justify-center my-5 w-full">
          <label>Email :</label>
          <input type="email" ref={email} className="borde-fade p-3 outline-none border-2"/>
          <label>Enter new password :</label>
          <input type="text" ref={newPassword} className="borde-fade p-3 outline-none border-2"/>
          {error && <div className='error'>{error}</div>}
          <button type='submit' className='bg-fade text-white p-3 my-5 hover:bg-black'>Send</button>
        </form>
      </div>
      </div>
      <Footer />
    </>
  )
}

export default ForgetPassword