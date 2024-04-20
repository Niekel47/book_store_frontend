import React, { useEffect } from "react";
import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrderWait,
  orderCancelAction,
} from "../../redux/slice/customer/orderSlice";
import { UrlImage } from "../../../url";
import OrderStatus from "../../components/OrderStatus/OrderStatus";

const OrderWait = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  console.log("user_id", user_id);
  const userProfile = useSelector(
    (state) => state.customer.auth.isSuccessProfile
  );
  const orders = useSelector((state) => state.customer.order.orderWait);
  console.log("orders", orders);
  const orderCancel = useSelector(
    (state) => state.customer.order.handleOrderCancel
  );
  useEffect(() => {
    dispatch(getOrderWait(user_id));
  }, [orderCancel]);

  const canelOrderClick = (order_id) => {
    dispatch(orderCancelAction(order_id));
  };
  return (
    <>
      <Navbar />
      <div style={{ height: "1000px" }} className="container">
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
            Đơn hàng đang chờ
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
                    <div key={`order-${order.id}`}>
                      {order.OrderProducts.map((item, itemIndex) => {
                        return (
                          <div
                            style={{ marginBottom: "20px" }}
                            className="row"
                            key={`item-${index}-${itemIndex}`}
                          >
                            <div className="col-3">
                              <div>
                                <img
                                  width={"120px"}
                                  src={item.Product.image}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="col-9">
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
                          <i style={{ fontSize: "14px", color: "gray" }}>
                            Đơn hàng đang được chờ duyệt!
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
                              backgroundColor: "#ca1515",
                              color: "white",
                              fontWeight: "bold",
                            }}
                            onClick={() => canelOrderClick(order.id)}
                          >
                            Hủy đơn hàng
                          </button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h5>Chưa có đơn hàng nào đang chờ duyệt!</h5>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default OrderWait;
