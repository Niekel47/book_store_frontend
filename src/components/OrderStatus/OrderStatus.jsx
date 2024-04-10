import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderWait,
  getOrderShip,
  getOrderComplete,
  getOrderCancel,
} from "../../redux/slice/customer/orderSlice";
import { useParams } from "react-router-dom";

const OrderStatus = () => {
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const { orderWait, orderShip, orderComplete, orderCancel } = useSelector(
    (state) => state.customer.order
  );
  useEffect(() => {
    dispatch(getOrderWait(user_id));
    dispatch(getOrderShip(user_id));
    dispatch(getOrderComplete(user_id));
    dispatch(getOrderCancel(user_id));
  }, []);
  const userProfile = useSelector(
    (state) => state.customer.auth.isSuccessProfile
  );
  const navigate = useNavigate();
  return (
    <div
      style={{ width: "70%", margin: "auto", height: "50px" }}
      className="row"
    >
      <div
        onClick={() => navigate(`/order_wait/${userProfile.id}`)}
        style={{ cursor: "pointer" }}
        className="col-3"
      >
        Chờ xác nhận
        <span style={{ color: "#d1402c " }}> ({orderWait.length})</span>
      </div>
      <div
        onClick={() => navigate(`/order_ship/${userProfile.id}`)}
        style={{ cursor: "pointer" }}
        className="col-3"
      >
        Đang giao
        <span style={{ color: "#d1402c " }}> ({orderShip.length})</span>
      </div>
      <div
        onClick={() => navigate(`/order_complete/${userProfile.id}`)}
        style={{ cursor: "pointer" }}
        className="col-3"
      >
        Đã nhận
        <span style={{ color: "#d1402c " }}> ({orderComplete.length})</span>
      </div>
      <div
        onClick={() => navigate(`/order_cancel/${userProfile.id}`)}
        style={{ cursor: "pointer" }}
        className="col-3"
      >
        Đã hủy
        <span style={{ color: "#d1402c " }}> ({orderCancel.length})</span>
      </div>
    </div>
  );
};

export default OrderStatus;
