import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../redux/slice/customer/productSlice";
import { FaCartShopping, FaStar } from "react-icons/fa6";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { UrlImage } from "../../../url";
import {
  addTocartDetail,
  getTotal,
} from "../../redux/slice/customer/cartSlice";
import { toast } from "react-toastify";

const DetailProduct = () => {
  const URL_IMAGE = UrlImage();
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const productDetails = useSelector(
    (state) => state.customer.product.productDetail
  );
  const userProfile = useSelector(
    (state) => state.customer.auth.isSuccessProfile
  );
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const { cartTotalQuantity } = useSelector((state) => state.customer.cart);
  const addTocartClick = (product, cartQuantity) => {
    if (userProfile) {
      let product_cart = { ...product, cartQuantity: cartQuantity };
      dispatch(addTocartDetail(product_cart));
      setQuantity(1);
    } else {
      toast.error("Bạn cần đăng nhập");
    }
  };

  useEffect(() => {
    dispatch(getProductDetail(product_id));
    // dispatch(getTotal());
  }, []);

  // Render product details
  return (
    <>
      {productDetails && (
        <div
          style={{ marginBottom: "50px", marginTop: "20px" }}
          className="container"
        >
          <h3 style={{ marginBottom: "40px", color: "gray" }}>
            CHI TIẾT SẢN PHẨM
          </h3>
          <div className="row">
            <div className="col-6">
              <div style={{ width: "90%" }}>
                <MDBCarousel showControls>
                  <MDBCarouselItem itemId={1}>
                    <img
                      src={productDetails.image}
                      width={"100px"}
                      className="d-block w-80"
                      alt="..."
                    />
                  </MDBCarouselItem>
                  <MDBCarouselItem itemId={2}>
                    <img
                      src={productDetails.image}
                      width={"100px"}
                      className="d-block w-80"
                      alt="..."
                    />
                  </MDBCarouselItem>
                  <MDBCarouselItem itemId={3}>
                    <img
                      src={productDetails.image}
                      width={"100px"}
                      className="d-block w-80"
                      alt="..."
                    />
                  </MDBCarouselItem>
                </MDBCarousel>
              </div>
            </div>
            <div className="col-6">
              <div>
                <p style={{ fontSize: "35px", fontWeight: "bold" }}>
                  {productDetails.name}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>Tác giả:</p>
                <p style={{ textAlign: "justify", fontSize: "15px" }}>
                  {productDetails.Author.name}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                  Nhà xuất bản:
                </p>
                <p style={{ textAlign: "justify", fontSize: "15px" }}>
                  {productDetails.Publisher.name}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                  Danh mục:
                </p>
                <p style={{ textAlign: "justify", fontSize: "15px" }}>
                  {productDetails.Categories &&
                    productDetails.Categories.map((category, index) => (
                      <span key={index}> {category.name}</span>
                    ))}
                </p>
              </div>
              {/* <div>
                <p style={{ fontSize: "25px", fontWeight: "bold" }}>
                  Nhà xuất bản:{productDetails.Categoires.name}
                </p>
              </div> */}
              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#883731 ",
                    fontSize: "18px",
                  }}
                >
                  Giá:
                  {productDetails.price.toLocaleString("vi-VN")} đ
                </p>
              </div>
              <div>
                <p
                  style={{
                    marginBottom: "10xp",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Mô tả:
                </p>
                <p style={{ textAlign: "justify", fontSize: "15px" }}>
                  {productDetails.description}
                </p>
              </div>
              <div
                style={{
                  marginBottom: "10xp",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Số lượng:
              </div>
              <div>
                <input
                  style={{ width: "60px" }}
                  className="form-control"
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                />
              </div>
              <div className="mt-5 hover:to-blue-700 ">
                <button
                  type="button"
                  className="text-red-900 btn btn-secondary hover:to-blue-700"
                  onClick={() => addTocartClick(productDetails, quantity)}
                >
                  <FaCartShopping /> Thêm giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProduct;
