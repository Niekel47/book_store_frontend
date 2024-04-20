import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrderShip,
  orderConfirmAction,
} from "../../redux/slice/customer/orderSlice";
import { UrlImage } from "../../../url";
import OrderStatus from "../../components/OrderStatus/OrderStatus";
import Navbar from "../../components/NavBar/NavBar";

const OrderShip = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const orders = useSelector((state) => state.customer.order.orderShip);
  console.log("orders", orders);
  const orderConfirm = useSelector(
    (state) => state.customer.order.handleOrderConfirm
  );
  useEffect(() => {
    dispatch(getOrderShip(user_id));
  }, [orderConfirm]);

  const orderConfirmClick = (order_id) => {
    dispatch(orderConfirmAction(order_id));
  };
  return (
    <>
      <Navbar />
      <div style={{ marginBottom: "800px" }} className="container">
        <div>
          <span style={{ fontSize: "18px" }}>
            <FaHome />
          </span>
          <span
            style={{ marginLeft: "5px", fontSize: "17px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Trang Chủ {">"}{" "}
          </span>
          <span
            style={{
              marginLeft: "5px",
              fontSize: "17px",
              color: "gray",
              cursor: "pointer",
            }}
          >
            Đơn hàng đang giao
          </span>
        </div>
        <div
          className="container"
          style={{ height: "50px", marginTop: "20px" }}
        >
          <OrderStatus />
          <div className="container" style={{ marginTop: "50px" }}>
            {orders && orders.length > 0 ? (
              <>
                {orders.map((order, index) => {
                  return (
                    <React.Fragment key={order.id}>
                      {order.OrderProducts.map((item, indexItem) => {
                        return (
                          <div
                            style={{ marginBottom: "20px" }}
                            className="row"
                            key={`order-${indexItem}`}
                          >
                            <div className="col-2">
                              <div>
                                <img
                                  width={"120px"}
                                  src={item.Product.image}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="col-10">
                              <p style={{ fontSize: "17px" }}>
                                {item.Product.name}
                              </p>
                              <p style={{ fontSize: "17px" }}>
                                x {item.quantity}
                              </p>
                              <p
                                style={{
                                  fontWeight: "bold",
                                  color: "#883731 ",
                                  fontSize: "18px",
                                }}
                              >
                                {item.Product.price.toLocaleString("vi-VN")} đ
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div className="row">
                        <div className="col-4">
                          <i
                            style={{
                              color: "gray",
                              fontSize: "14px",
                            }}
                          >
                            Đơn hàng đang được giao nếu không gặp vấn đề gì vui
                            lòng bấm đã nhận hàng
                          </i>
                        </div>
                        <div className="col-4">
                          <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                            Thành tiền:{" "}
                            <span
                              style={{
                                color: "#883731 ",
                              }}
                            >
                              {order.total.toLocaleString("vi-VN")} đ
                            </span>
                          </p>
                        </div>
                        <div className="col-4">
                          <button
                            style={{
                              width: "200px",
                              height: "45px",
                              border: "none",
                              borderRadius: "10px",
                              backgroundColor: "#883731",
                              color: "white",
                              fontWeight: "bold",
                            }}
                            onClick={() => orderConfirmClick(order.id)}
                          >
                            Đã nhận
                          </button>
                        </div>
                      </div>
                      <hr />
                    </React.Fragment>
                  );
                })}
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h5>Chưa có đơn hàng nào đang giao!</h5>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default OrderShip;
