import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import CustomerRoute from "./routes/CustomerRoute";
import AdminRoute from "./routes/Admin";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const initialOptions = {
  "client-id":
    "AfTC8H7j0OH6-BXSdYtrgj5__1ZeJFbtZ5G7hqKznAHbVHKYvm1T5YBL0TCFecewNYMIvRxcc0kKTzrl",
  currency: "VND",
  intent: "capture",
};
const App = () => {
  return (
    <PayPalScriptProvider>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/*" element={<CustomerRoute />} />
        </Routes>
        <ToastContainer />
      </Router>
    </PayPalScriptProvider>
  );
};

export default App;
