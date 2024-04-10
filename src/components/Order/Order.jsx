import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotal } from "../../redux/slice/customer/cartSlice";
import { addOrder } from "../../redux/slice/customer/orderSlice";
import { clearCart } from "../../redux/slice/customer/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const cartTotalAmount = useSelector(
    (state) => state.customer.cart.cartTotalAmount
  );
  const userProfile = useSelector(
    (state) => state.customer.auth.isSuccessProfile
  );
  //   const isAuth = useSelector((state) => state.customer.auth.isAuthSucess);
  //   const dataUser = useSelector((state) => state.customer.auth.dataUser);
  //   const { isLoadingOrder } = useSelector((state) => state.customer.order);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.fullname || "");
      setPhone(userProfile.phone || "");
    }
    dispatch(getTotal());
  }, [userProfile, cart]);
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
          address: address,
          phone: phone,
          user_id: user_id,
          payment: payment,
        },
      };
      dispatch(addOrder(data_order)).then((result) => {
        if (result.payload.success === true) {
          dispatch(clearCart());
          setName("");
          setPhone("");
          setAddress("");
          setPayment("");
          toast.success(`${result.payload.message}`);
        }
      });
    }
  };
  return (
    <div style={{ marginTop: "100px" }} className="container-fluid">
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
              <p style={{ color: "#cd3f34" }}>*</p>
              <input
                style={{ height: "50px", borderColor: "gray" }}
                type="text"
                className="form-control"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="col-6">
          <div
            style={{
              margin: "auto",
              width: "70%",
              height: "350px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <div style={{ paddingLeft: "50px", paddingTop: "40px" }}>
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
              </div>
              <div style={{ marginTop: "20px" }}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
