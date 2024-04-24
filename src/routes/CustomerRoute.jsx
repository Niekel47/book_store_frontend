import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import ProductDetail from "../pages/customer/ProductDetail";
import Cart from "../pages/customer/Cart";
import DetailPRODUCT from "../pages/customer/DetailSingleProduct";
import OrderWait from "../pages/customer/OrderWait";
import OrderStatus from "../components/OrderStatus/OrderStatus";
import OrderShip from "../pages/customer/OrderShip";
import OrderComplete from "../pages/customer/OrderComplete";
import OrderCancel from "../pages/customer/OrderCancel";
import Success from "../components/Success/Success";
import Cancel from "../components/Cancel/Cancel";
import AboutPage from "../pages/customer/AboutPage";
import Search from "../pages/customer/Search";
// import DetailPRODUCT from "../pages/customer/DetailPRODUCT";

const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/product/:product_id" element={<DetailPRODUCT />} />
      <Route path="/order_wait/:user_id" element={<OrderWait />} />
      <Route path="/order_ship/:user_id" element={<OrderShip />} />
      <Route path="/order_complete/:user_id" element={<OrderComplete />} />
      <Route path="/order_cancel/:user_id" element={<OrderCancel />} />
      <Route path="/search" element={<Search/>} />
    </Routes>
  );
};

export default CustomerRoute;
