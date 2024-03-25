import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../components/admin/Admin";
import ProductManage from "../pages/admin/ProductManage";
import UserManage from "../pages/admin/UserManage";
import CategoryManage from "../pages/admin/CategoryManage";
import PublisherManage from "../pages/admin/PublisherMange";
import AuthorManage from "../pages/admin/AuthorManage";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/product" element={<ProductManage />} />
      <Route path="/user" element={<UserManage />} />
      <Route path="/category" element={<CategoryManage />} />
      <Route path="/publisher" element={<PublisherManage />} />
      <Route path="/author" element={<AuthorManage />} />
    </Routes>
  );
};

export default AdminRoute;
