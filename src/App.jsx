import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home/Home";
import ProductList from "./components/ProductList/ProductList";
import "aos/dist/aos.css";
import CustomerRoute from "./routes/CustomerRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/admin/*" element={<AdminRoute />} /> */}
          <Route path="/*" element={<CustomerRoute />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
};

export default App;
