import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from "axios"
import { useSelector } from 'react-redux'

import {ImCheckboxChecked} from "react-icons/im"
import {FaTrashAlt} from "react-icons/fa"

import "./dashboard.css"

function Dashboard() {
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"
  const { user } = useSelector((state) => state.auth)
  const [orders, setorders] = useState([])
  const navigate = useHistory()
  useEffect(() => {
    const verify = async () => {
      const { data } = await axios.get(`${baseURL}/admin`, { headers: { verify: user?.verify } })
      if(!data.verify) navigate.push("/")
    }
    verify()
  }, [user?.verify, navigate])
  useEffect(() => {
    const getOrdersInfo =async () => {
      const { data } = await axios.get(`${baseURL}/orders/getInfo`)
      setorders(data)
    }
    getOrdersInfo()
  }, [navigate])
  
  const setAsdelivred =async (id) => {
    setorders(orders.map((order)=>order.id===id?{...order,delivred:true}:order))
    axios.put(`${baseURL}/orders/update/${id}`)
  }
  const deleteOrder = async (id) => {
    setorders(orders.filter((order)=>order.id!==id))
    axios.delete(`${baseURL}/orders/orderInfo/${id}`)
    axios.delete(`${baseURL}/orders/orderProducts/${id}`)
  }
  return (
    <div>
      <header className='flex justify-around items-center '>
        <div className="left"><Link to="/"><img className='w-20 h-20 md:w-40 md:h-40' src={require("../assets/logo.png")} alt="" /></Link></div>
        <div className="right font-bold text-2xl av:text-5xl">WELCOME ADMIN</div>
      </header>
      <nav className='flex justify-center items-center text-sm gap-5 av:gap-20 fon-bold av:text-2xl bg-black  text-white'>
        <Link to="/dashboard/addProduct" className='hover:bg-white hover:text-black px-4 py-3 text-center'>
          <div className="nav-item">
            Add Product
          </div>
        </Link>
        <Link to="/dashboard/addGift" className='hover:bg-white hover:text-black px-4 py-3 text-center'>
          <div className="nav-item">
            Add Gift & Fragrance
          </div>
        </Link>
      </nav>
      <section className='w-full flex items-center justify-center p-5'>
        {!orders.length ? <img src={require("../assets/images/header/LRH_preview_rev_1 1.png")} alt="" /> :
          <div className='overflow-auto w-full'>
            <table className="content-table w-full">
        <thead>
          <tr>
            <th> Number</th>
            <th>Informaion</th>
            <th>Adresses</th>
            <th>Postal</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {orders.map((order, index) => (
          <tr key={order.id} className="hover:bg-fade">
            <td>{index + 1}</td>
            <td><div><Link to={`/order/details/${order.name}/${order.id}`}>{order.name} </Link><br /> <a href={`mailto:${order.email}`}>{order.email} </a><br /> <a href={`https://wa.me/${order.phone}text=HI`}>{ order.phone}</a></div></td>
            <td>{order.villa}<br /> {order.adresse}<br /> {order.country} <br /> { order.city}</td>
            <td>{order.villaNumber}<br />{ order.countryCode} <br /> {order.zipCode}</td>
            <td className='text-2xl font-bold'>{order.totalPrice}</td>
            <td ><div className='flex md:justify-around justify-between gap-7 items-center text-xl'>{ order.delivred?<ImCheckboxChecked className='text-green' /> :<ImCheckboxChecked className='cursor-pointer hover:text-link' onClick={()=>setAsdelivred(order.id)}/>} <FaTrashAlt className='cursor-pointer hover:text-link' onClick={()=>deleteOrder(order.id)}/></div></td>
          </tr>
          ))}
        </tbody>
    </table>
      </div>
        }
      </section>
    </div>
  )
}

export default Dashboard