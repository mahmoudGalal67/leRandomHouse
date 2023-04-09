import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";


import Slider from "react-slick";
import { Link } from "react-router-dom";

function Home() {
  const settings = {
      lazyLoad: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
  };
  return (
    <div className="Home overflow-x-hidden">
        <Header />
        <Navbar />
      <header>
        {/* <Slider {...settings}>
          <img src={require("../assets/images/Home/shop this look/01.jpg")} alt="" />
          <img src={require("../assets/images/Home/shop this look/02.jpg")} alt="" />
          <img src={require("../assets/images/Home/shop this look/03.jpg")} alt="" />
          <img src={require("../assets/images/Home/shop this look/04.jpg")} alt="" />
          <img src={require("../assets/images/Home/shop this look/05.jpg")} alt="" />
        </Slider> */}
        <h2 className="text-center my-3 md:my-7 font-bold text-sm md:text-3xl">Shop By Category</h2>
        <Link to="/women"><img src={require("../assets/images/Home/categories/01.jpg")} alt="" /></Link>
        <Link to="/gifts"><img src={require("../assets/images/Home/categories/04.jpg")} alt="" /></Link>
        <Link to="/new"><img src={require("../assets/images/Home/categories/05.jpg")} alt="" /></Link>
      </header>
      <Footer />
    </div>
  )
}

export default Home