import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "../components/Home/Home";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import ProductList from "../components/ProductList/ProductList";

const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<ProductList />} />
    </Routes>
  );
};

export default CustomerRoute;
