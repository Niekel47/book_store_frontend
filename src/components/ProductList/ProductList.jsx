import React, { useEffect, useState } from "react";
import axios from "axios";
import { UrlApi, UrlImage } from "../../../url";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductHome } from "../../redux/slice/customer/productSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const URL_Image = UrlImage();
const URL_API = UrlApi();

const ProductList = () => {
  const navigate = useNavigate();
  const listProducts = useSelector(
    (state) => state.customer.product.listProduct
  );
  const userProfile = useSelector(
    (state) => state.customer.auth.isSuccessProfile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductHome());
  }, []);

  const Detail = () => {
    if (userProfile) {
      navigate("/product");
    } else {
      toast.error("Bạn cần đăng nhập");
      navigate("/login");
    }
  };

  return (
    <>
      <section className="mt-4 mb-12">
        <div className="container">
          {/* header */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Sách Hay dành cho Bạn
            </p>
            <h1 className="text-3xl font-bold">Sách HOT</h1>
          </div>

          {/* Body section */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 section-name padding-y-sm">
              {/* Card */}
              {listProducts.map((item, index) => (
                <div key={item.id} className="row space-y-3 ">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt=""
                      className="h-[220px] w-[220px] object-cover rounded-md "
                    />
                  </Link>
                  <p className="flex justify-center items-center gap-1">
                    {item.name}
                  </p>
                  <p className="flex justify-center items-center gap-1">
                    {item.price.toLocaleString("vi-VN")}đ
                  </p>
                  <div>
                    <div className="flex justify-center items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                className="text-center mt-10 cursor-pointer  bg-primary text-white py-1 px-5 rounded-md"
                onClick={Detail}
              >
                Xem tất cả
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList;
