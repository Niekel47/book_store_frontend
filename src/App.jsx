import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import CustomerRoute from "./routes/CustomerRoute";
import AdminRoute from "./routes/Admin";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/*" element={<CustomerRoute />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
