import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ProductCategories() {
  const location = useLocation()
  const type = location.pathname.split("/")[1]
  const category = location.pathname.split("/")[2]
  // const baseURL = "http://localhost:5000"
  const baseURL = "https://api.lerandomhouse.com"
  const [products, setproducts] = useState([])
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/products/category?type=${type}&category=${category}`)
        setproducts(data)
      }
      catch (err) {
        console.log(err)
      }
    }
    getProducts()
  },[category , type])
  return (
    <>
    <Header />
    <Navbar />
    <div className='products my-5 px-10'>
      <div className='products my-5 px-10'>
          <div className='py-3 border-b-2 border-fade text-mute'>{category.charAt(0).toUpperCase()}{category.slice(1) }</div>
          <div className="products-wrapper my-5">
            <div className='flex flex-wrap m-w-24 justify-around items-center'>
              {products.length === 0 ? (<div className='h-80 flex items-center justify-center'>No Found Items</div>) : 
                products.map((product) => (
                  <Product product={product} key={ product.id} />
                ))
            }
            </div>
          </div>
      </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductCategories