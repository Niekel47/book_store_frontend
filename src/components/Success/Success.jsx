import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/slice/customer/cartSlice";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());
    navigate("/");
  }, [dispatch, navigate]);

  return <div>Success</div>;
};

export default Success;
