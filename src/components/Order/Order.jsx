import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotal } from "../../redux/slice/customer/cartSlice";
import { addOrder } from "../../redux/slice/customer/orderSlice";
import { clearCart } from "../../redux/slice/customer/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  fetchDistricts,
  fetchProvinces,
  fetchWards,
} from "../../redux/slice/customer/productSlice";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [province, setProvinces] = useState([]);
  // const [district, setDistricts] = useState([]);
  // const [ward, setWards] = useState([]);
  const [province_id, setProvinceId] = useState("");
  const [district_id, setDistrictId] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [ward_id, setWardId] = useState([]);
  const [selectedWardId, setSelectedWardId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [sessionId, setSessionId] = useState("");
  
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const cartTotalAmount = useSelector(
    (state) => state.customer.cart.cartTotalAmount
  );
  const userProfile = useSelector(
    (state) => state.customer.auth.isSuccessProfile
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const provinces = useSelector((state) => state.customer.product.provinces);
  const selectedProvince = provinces.find(
    (province) => province.province_id === province_id
  );
  const selectedDistrict = district_id.find(
    (district) => district.district_id === selectedDistrictId
  );
  const selectedWard = ward_id.find((ward) => ward.ward_id === selectedWardId);
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.fullname || "");
      setPhone(userProfile.phone || "");
    }
    dispatch(getTotal());
    dispatch(fetchProvinces());
    if (province_id) {
      dispatch(fetchDistricts(province_id)).then((response) => {
        if (Array.isArray(response.payload)) {
          setDistrictId(response.payload);
        } else {
          console.error("response.payload is not an array");
        }
      });
    }
    if (selectedDistrictId) {
      dispatch(fetchWards(selectedDistrictId)).then((response) => {
        if (Array.isArray(response.payload)) {
          setWardId(response.payload);
        } else {
          console.error("response.payload is not an array");
        }
      });
    }
  }, [userProfile, cart, province_id, selectedDistrictId]);

  const isValidOrder = () => {
    if (!userProfile) {
      toast.error("Vui lòng đăng nhập để đặt hàng");
      navigate("/login");
      return false;
    }
    if (cart.length === 0) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ hàng");
      return false;
    }
    if (!name) {
      toast.error("Vui lòng nhập tên người nhận ");
      return false;
    }
    if (!phone) {
      toast.error("Vui lòng nhập số điện thoại");
      return false;
    }
    const isValidPhone =
      /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g.test(
        phone
      );
    if (isValidPhone === false) {
      toast.error("Vui lòng nhập đúng số điện thoại");
      return false;
    }
    if (!payment) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return false;
    }
    return true;
  };
  
  const orderClick = () => {
    let check = isValidOrder();
    if (check === true) {
      let user_id = userProfile.id;
      let data_order = {
        cart: cart,
        user: {
          name: name,
          address: `${address}, ${selectedWard.ward_name}, ${selectedDistrict.district_name}, ${selectedProvince.province_name}`,
          phone: phone,
          user_id: user_id,
          payment: payment,
          transactionId: transactionId,
          sessionId: sessionId,
        },
      };
      console.log("data_order", data_order);
      console.log("sessionId", sessionId);
      console.log("transactionId", transactionId);
      dispatch(addOrder(data_order)).then((result) => {
        if (result.payload.success === true) {
          dispatch(clearCart());
          setName("");
          setPhone("");
          setAddress("");
          setPayment("");
          setProvinceId("");
          setSelectedDistrictId("");
          setSelectedWardId("");
          toast.success(`${result.payload.message}`);
        }
      });
    }
  };
  const onApproveOrder = (data, actions) => {
    return actions.order
      .capture()
      .then((details) => {
        // Check if order details are valid
        setTransactionId(details.id);
        orderClick();
        console.log("details",details)
        dispatch(clearCart());
        toast.success("Payment successful!");
        setName("");
        setPhone("");
        setAddress("");
        setPayment("");
        setProvinceId("");
        setSelectedDistrictId("");
        setSelectedWardId("");
      })
      .catch((error) => {
        // Handle any errors from the capture process
        console.log("Payment failed:", error);
      });
  };
  const onCreateOrder = (data, actions) => {
    // Convert total from VND to USD
    const exchangeRate = 23000; // Replace this with the current exchange rate
    const totalInUSD = (cartTotalAmount / exchangeRate).toFixed(2); // Use toFixed(2) to round to 2 decimal places

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalInUSD, // Use total in USD
            currency_code: "USD", // Specify the currency as USD
          },
        },
      ],
    });
  };

  const Stripe = async () => {
    const stripe = await loadStripe(
      "pk_test_51P65guRqcbVXZc9kNNZYEf7PX8R8awgYBsrJ5WMUQr36tXYmCjRUwu4U0RYnhWULM9P4aXcQLHuFn3Ozo8kmXfqg00I0soTrZc"
    );
    const body = {
      products: cart,
    };
    const headers = {
      "Content-type": "application/json",
    };
    const response = await fetch(
      "http://localhost:3001/api/stripe/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();
    setSessionId(session.id);
    console.log("session", session);
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };
  

  return (
    <div style={{ marginTop: "50px" }} className="container-fluid">
      <h4>CHI TIẾT ĐẶT HÀNG</h4>
      <div className="row">
        <div className="col-6">
          <hr />
          <form>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Người nhận hàng</label>
                  <p style={{ color: "#cd3f34" }}>*</p>
                  <input
                    style={{ height: "50px", borderColor: "gray" }}
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Số điện thoại</label>
                  <p style={{ color: "#cd3f34" }}>*</p>
                  <input
                    style={{ height: "50px", borderColor: "gray" }}
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Địa chỉ nhận hàng</label>
              <input
                style={{ height: "40px", borderColor: "gray" }}
                type="text"
                className="form-control"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
              <div className="mb-2 mt-2">
                <label className="form-label">Tỉnh/Thành Phố:</label>
                <select
                  value={province_id}
                  onChange={(event) => setProvinceId(event.target.value)}
                  className="form-select"
                >
                  {provinces.map((province) => (
                    <option
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Quận/Huyện:</label>
                <select
                  value={selectedDistrictId}
                  onChange={(event) =>
                    setSelectedDistrictId(event.target.value)
                  }
                  className="form-select"
                >
                  {district_id &&
                    district_id.map((district) => (
                      <option
                        key={district.district_id}
                        value={district.district_id}
                      >
                        {district.district_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Phường/Xã:</label>
                <select
                  value={selectedWardId}
                  onChange={(event) => setSelectedWardId(event.target.value)}
                  className="form-select"
                >
                  {ward_id.map((ward) => (
                    <option key={ward.ward_id} value={ward.ward_id}>
                      {ward.ward_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="col-6">
          <div
            style={{
              margin: "auto",
              width: "100%",
              height: "425px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <div style={{ paddingLeft: "55px", paddingTop: "10px" }}>
              <h5>THÀNH TIỀN</h5>
              <div style={{ marginTop: "20px" }} className="row">
                <div className="col-6">
                  <h6>TỔNG</h6>
                </div>
                <div className="col-6">
                  <p style={{ color: "#ce1515 ", fontWeight: "bold" }}>
                    {cartTotalAmount.toLocaleString("vi-VN")} đ
                  </p>
                </div>
              </div>
              <div>
                <h6>Phương thức thanh toán</h6>
                <div style={{ marginTop: "20px" }} className="form-check">
                  <input
                    style={{ borderColor: "#883731" }}
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value={"off"}
                    onChange={(event) => setPayment(event.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Thanh toán khi nhận hàng
                  </label>
                </div>
                <div style={{ marginTop: "20px" }} className="form-check">
                  <input
                    style={{ borderColor: "#883731" }}
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value={"paypal"}
                    onChange={(event) => setPayment(event.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Thanh toán paypal
                  </label>
                </div>
                <div style={{ marginTop: "20px" }} className="form-check">
                  <input
                    style={{ borderColor: "#883731" }}
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value={"stripe"}
                    onChange={(event) => setPayment(event.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    Thanh toán Stripe
                  </label>
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                {payment === "off" && (
                  <button
                    style={{
                      width: "80%",
                      height: "45px",
                      border: "none",
                      borderRadius: "15px",
                      margin: "auto",
                      backgroundColor: "#ca1515",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    onClick={() => orderClick()}
                  >
                    ĐẶT HÀNG
                  </button>
                )}
                {payment === "stripe" && (
                  <button
                    style={{
                      width: "80%",
                      height: "45px",
                      border: "none",
                      borderRadius: "15px",
                      margin: "auto",
                      backgroundColor: "#ca1515",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    onClick={() => Stripe()}
                  >
                    ĐẶT HÀNG STRIPE
                  </button>
                )}
                {payment === "paypal" && (
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      color: "blue",
                      shape: "pill",
                      label: "paypal",
                      height: 45,
                    }}
                    createOrder={(data, actions) =>
                      onCreateOrder(data, actions)
                    }
                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
