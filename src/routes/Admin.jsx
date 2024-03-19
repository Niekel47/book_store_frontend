import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../components/admin/Admin";


const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      
    </Routes>
  );
};

export default AdminRoute;
