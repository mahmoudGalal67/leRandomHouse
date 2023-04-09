import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/login";
import ForgetPassword from "./pages/ForgetPassword";

import { lazy,Suspense } from "react";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductTypes from "./pages/productTypes";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { HashRouter  as Router, Switch, Route } from "react-router-dom";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import ProductCategories from "./pages/ProductCategories";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Whishlist";
import GiftDetails from "./pages/GiftDetails";
import OrderDetails from "./pages/OrderDetails";
import OrderProducts from "./pages/OrderProducts";

const  Dashboard = lazy(()=>import("./pages/dashboard"));
const AddProduct= lazy(()=>import("./pages/AddProduct"));
const AddGift= lazy(()=>import("./pages/AddGift"));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/forgetPassword",
//     element: <ForgetPassword />,
//   },
//   {
//     path: "/:type",
//     element: <ProductTypes />,
//   },
//   {
//     path: "/:type/:category",
//     element: <ProductCategories />,
//   },
//   {
//     path: "/product/:type/:category/:id",
//     element: <ProductDetails />,
//   },
//   {
//     path: "/:type/:category/:id",
//     element: <GiftDetails />,
//   },
//   {
//     path: "/cart",
//     element: <Cart />,
//   },
//   {
//     path: "/wishlist",
//     element: <Wishlist />,
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />,
//   },
//   {
//     path: "/dashboard/addProduct",
//     element: <AddProduct />,
//   },
//   {
//     path: "/dashboard/addGift",
//     element: <AddGift />,
//   },
//   {
//     path: "/orderDetails",
//     element: <OrderDetails />,
//   },
//   {
//     path: "/order/details/:clinetName/:id",
//     element: <OrderProducts />,
//   },
// ]);

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="39796629098-4gbk8vjjlu6uj3d75rgvcbc5031cf5m0.apps.googleusercontent.com">
      <Router >
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgetPassword">
            <ForgetPassword />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/wishlist">
            <Wishlist />
          </Route>
          <Route path="/dashboard/addProduct">
            <Suspense fallback={<h2 className="text-center">Loading ...</h2>}><AddProduct/></Suspense>
          </Route>
          <Route path="/dashboard/addGift">
          <Suspense fallback={<h2 className="text-center">Loading ...</h2>}><AddGift/></Suspense>
          </Route>
          <Route path="/dashboard">
          <Suspense fallback={<h2 className="text-center">Loading ...</h2>}><Dashboard/></Suspense>
          </Route>
          <Route path="/orderDetails">
            <OrderDetails />
          </Route>
          <Route path="/order/details/:clinetName/:id">
            <OrderProducts />
          </Route>
          <Route path="/product/:type/:category/:id">
            <ProductDetails />
          </Route>
          <Route path="/:type/:category/:id">
            <GiftDetails />
          </Route>
          <Route path="/:type/:category">
            <ProductCategories />
          </Route>
          <Route path="/:type">
            <ProductTypes />
          </Route>
        </Switch>
      </Router>
        {/* <RouterProvider router={router} /> */}
      </GoogleOAuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
