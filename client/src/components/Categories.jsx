import React from 'react'
import { Link } from 'react-router-dom'
import "./categories.scss"

function Categories({ categories ,setShowcategory ,navTypes , number}) {
  if  (!categories.images) return
  return (
      < div className='categories absolute z-10 px-5 w-full bg-white text-black max-w-full' onMouseEnter={(()=>setShowcategory(true))} onMouseLeave={()=>setShowcategory(false)}>
        <div className="wrapper px-7 py-5 flex justify-between">
          <div className='w-1/3 flex justify-center'>
            <img src={categories?.images[0]} alt="" className='max-w-full h-40 object-cover object-center' />
          </div>
          <ul className='categories-wrapper h-fit w-1/3'>
            {categories?.categories.map((item , index) => (
              <li className='text-center h-fit px-5 text-sm' key={index} ><Link to={`/${navTypes[number][1]}/${item.replace(/\s/g, "").toLowerCase()}`}>{item}</Link></li>
            ))}
          </ul>
          <div className='w-1/3 flex justify-center'>
            <img src={categories?.images[1]} alt="" className='max-w-full h-40 object-cover object-center' />
          </div>
        </div>
      </div >
    )
}

export default Categories