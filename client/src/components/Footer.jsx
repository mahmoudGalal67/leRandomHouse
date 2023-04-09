import React from 'react'

function Footer() {
  return (
    <div className='footer bg-footer'>
      <div className="wrapper flex items-center flex-wrap">
        <div className='lg:w-1/3 sm:w-1/2 flex flex-col items-center w-full p-8'>
          <img src={require("../assets/logo.png")} alt="" className='w-40 max-w-none'/>
          <div className='flex w-full justify-center gap-6 mt-10'>
            <a href=""><img src={require("../assets/images/soicalicons/svg (1).png")} alt="" /></a>
            <a href=""><img src={require("../assets/images/soicalicons/svg (2).png")} alt="" /></a>
            <a href=""><img src={require("../assets/images/soicalicons/svg.png")} alt="" /></a>
            <a href=""><img src={require("../assets/images/soicalicons/Vector.png")} alt="" /></a>
          </div>
        </div>
        {/* <div className='lg:w-1/4 sm:w-1/2 flex flex-col items-center lg:items-start w-full p-5'>
          <span className='mb-5 font-bold block'>QUICK LINKS</span>
          <ul>
            <li><a href="/">Size Guide</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">My Account</a></li>
            <li><a href="/">FAQs</a></li>
            <li><a href="/">Opio Gift Cards</a></li>
          </ul>
        </div> */}
        <div className='lg:w-1/3 sm:w-1/2 flex flex-col items-center  w-full p-5'>
          <span className='mb-5 font-bold block'>Help And Support</span>
          <ul>
            {/* <li><a href="/">Help</a></li> */}
            <li><a href="https://wa.me/+971527112123?text=HI">Contact Us</a></li>
          </ul>
        </div>
        <div className='lg:w-1/3 sm:w-1/2 flex flex-col items-center lg:items-start w-full p-5'>
          {/* <span className='mb-5 font-bold block'>NEWSLETTER</span>
          <p className='text-center'>Sign up for exclusive offers, new launches, original stories, events and more.</p>
            <input type="text" className='p-3 border-b-2 border-black outline-none' placeholder='Enter Email                   ->'/> */}
          <div className='flex w-full justify-center gap-3 mt-6'>
            <img src={require("../assets/images/payment/svg (1).png")} alt="" />
            <img src={require("../assets/images/payment/svg.png")} alt="" />
            <img src={require("../assets/images/payment/VF_Cash_Logo_-_RED_f6e8b365-3f93-4e8c-ace6-772d3e54380c_120x.jpg.png")} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer