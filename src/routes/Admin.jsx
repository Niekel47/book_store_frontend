import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../components/admin/Admin";
import ProductManage from "../pages/admin/ProductManage";
import UserManage from "../pages/admin/UserManage";
import CategoryManage from "../pages/admin/CategoryManage";
import PublisherManage from "../pages/admin/PublisherMange";
import AuthorManage from "../pages/admin/AuthorManage";
import Login from "../pages/admin/Login";
import OrderManage from "../pages/admin/OrderManage";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Admin />} />
      <Route path="/product" element={<ProductManage />} />
      <Route path="/user" element={<UserManage />} />
      <Route path="/category" element={<CategoryManage />} />
      <Route path="/publisher" element={<PublisherManage />} />
      <Route path="/author" element={<AuthorManage />} />
      <Route path="/order" element={<OrderManage />} />
    </Routes>
  );
};

export default AdminRoute;
