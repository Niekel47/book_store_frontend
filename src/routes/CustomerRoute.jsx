import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import ProductList from "../components/ProductList/ProductList";
import ProductDetail from "../pages/customer/ProductDetail";

const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detail" element={<ProductDetail />} />
    </Routes>
  );
};

export default CustomerRoute;
