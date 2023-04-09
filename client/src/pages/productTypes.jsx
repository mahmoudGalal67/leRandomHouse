import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import "./productTypes.scss"

import Slider from "react-slick";
import Product from '../components/Product';
import Header from "../components/Header"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import axios from 'axios';

  const ProductTypes=()=> {
  const Categories = {
  women:
    [
      {category: "Abaya",
        image: (require("../assets/images/categories/women/abaya.png"))
      },
      {category: "Kaftan",
        image: (require("../assets/images/categories/women/koftan.png"))
      },
      {category: "Dresses",
        image: (require("../assets/images/categories/women/dressess.png"))
      },
      {category: "Lingerie",
        image: (require("../assets/images/categories/women/lengire.png"))
      },
      {
      category: "Tops",
        image: (require("../assets/images/categories/women/tops.png"))
      },
      {
      category: "Pants",
        image: (require("../assets/images/categories/women/pants.png"))
      },
      {
      category: "Skirts",
        image: (require("../assets/images/categories/women/skirrt.png"))
      },
      {
      category: "Bags",
        image: (require("../assets/images/categories/women/bags.png"))
      },
      {
      category: "Accessories",
        image: (require("../assets/images/categories/women/accessories.png"))
      },
      {
      category: "Shoes",
        image: (require("../assets/images/categories/women/shoes.png"))
      },
      ],
      gifts:[],
      new:[]
}
    const settings = {
      lazyLoad: true,
      infinite: true,
      autoplaySpeed: 2000,
      slidesToShow: 6,
      slidesToScroll: 1,
      // autoplay: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
      ]
    };
    const location = useLocation()
    const type = location.pathname.split("/")[1]
    // const baseURL = "http://localhost:5000"
    const baseURL = "https://api.lerandomhouse.com"

    const [products, setproducts] = useState([])

    useEffect(() => {
      const getProducts = async () => {
        try {
          const {data} = await axios.get(`${baseURL}/products/type?type=${type}`)
          setproducts(data)
        }
        catch (err) {
          console.log(err);
        }
      }
      getProducts()
    },[type])
    return (
      <>
        <Header />
        <Navbar />
    <section className='types-page p-5'>
      <div className='categories-section my-5'>
        <Slider {...settings}>
        {Categories[type].map((item , index) => (
            <div className="category-item px-4" key={index}>
            <Link to={`/${type}/${item.category.replace(/\s/g, "").toLowerCase()}`} className='relative'>
              <img src={item.image} alt="" />
            </Link>
          </div>
        ))}
        </Slider>
        <div className='products my-5 px-10'>
          <div className='py-3 border-b-2 border-fade text-mute'>Shop All</div>
            {products.length === 0 ? <div className='h-80 flex items-center justify-center'>No Found Items</div> :
            <div className="products-wrapper my-5">
              <div className='flex flex-wrap m-w-24 justify-around items-center'>
                    {products.map((product => (
                      <Product product={product} key={product.id} />
                )))}
            </div>
          </div>}
          
        </div>
        </div>
        </section>
        <Footer />
      </>
  )
}

export default ProductTypes