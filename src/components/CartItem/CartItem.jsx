import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { UrlImage } from "../../../url.js";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import {
  removeCart,
  decreaseCart,
  addTocart,
  getTotal,
} from "../../redux/slice/customer/cartSlice";

import { useNavigate } from "react-router-dom";
import Order from "../Order/Order.jsx";

const CartItem = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const { cartTotalQuantity} = useSelector(
    (state) => state.customer.cart
  );
  const cartTotalAmount = useSelector(
    (state) => state.customer.cart.cartTotalAmount
  );
  const removeCartClick = (product) => {
    dispatch(removeCart(product));
  };
  const decreaseCartClick = (product) => {
    dispatch(decreaseCart(product));
  };
  const increaseCartClick = (product) => {
    dispatch(addTocart(product));
  };
  useEffect(() => {
    dispatch(getTotal());
  }, [cartTotalQuantity, cart]);
  return (
    <>
      <div className="mb-24 container">
        <div className="container-fluid mt-12">
          <table className="table table-borderless ">
            <thead>
              <tr>
                <th scope="col" className="align-middle">
                  SẢN PHẨM
                </th>
                <th scope="col" className="align-middle">
                  TÊN
                </th>
                <th scope="col" className="align-middle">
                  GIÁ
                </th>
                <th scope="col" className="align-middle">
                  SỐ LƯỢNG
                </th>
                <th scope="col" className="align-middle">
                  TỔNG TIỀN
                </th>
                <th scope="col" className="align-middle"></th>
              </tr>
            </thead>
            <tbody>
              {cart && cart.length > 0 ? (
                <>
                  {cart.map((item, index) => {
                    return (
                      <tr key={`cart-${index}`}>
                        <td>
                          <img
                            src={item.image}
                            className="w-20"
                            alt=""
                          />
                        </td>
                        <td className="w-96 text-left ">{item.name}</td>
                        <td className="font-bold text-red-700  ">
                          {item.price.toLocaleString("vi-VN")} đ
                        </td>
                        <td className="flex items-center">
                          <FaCircleMinus
                            onClick={() => decreaseCartClick(item)}
                            className="text-gray-500 text-xl mr-2 cursor-pointer"
                          />
                          {item.cartQuantity}
                          <FaCirclePlus
                            onClick={() => increaseCartClick(item)}
                            className="text-gray-500 text-xl ml-2 cursor-pointer"
                          />
                        </td>
                        <td className="font-bold text-red-700">
                          {(item.cartQuantity * item.price).toLocaleString(
                            "vi-VN"
                          )}{" "}
                          đ
                        </td>
                        <td>
                          <TiDelete
                            onClick={() => removeCartClick(item)}
                            className="text-gray-500 text-5xl cursor-pointer"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <tr>
                  <td colSpan="6">Không có sản phẩm nào trong giỏ hàng</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Order />
      </div>
    </>
  );
};

export default CartItem;
