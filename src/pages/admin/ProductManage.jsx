import React, { useState, useEffect } from "react";
import Nav from "../../components/admin/Nav";

import axios from "axios"; // Import axios
import ReactPaginate from "react-paginate";
import { MdDelete } from "react-icons/md";
import { UrlImage } from "../../../url";
import { FaEdit } from "react-icons/fa";
import ModalAddProduct from "../../components/admin/ModalAddProduct";
import ModalEditProduct from "../../components/admin/ModalEditProduct";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  handleDeleteProduct,
  getAllProduct,
} from "../../redux/slice/admin/productSlice";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../components/admin/Sidebar";

const ProductManage = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const [toggle, setToggle] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [productEdit, setProductEdit] = useState({});
  const dispatch = useDispatch();
  const deleteProduct = useSelector(
    (state) => state.admin.product.deleteProduct
  );
  const createProduct = useSelector(
    (state) => state.admin.product.createProduct
  );
  const updateProduct = useSelector(
    (state) => state.admin.product.updateProduct
  );
  const listProducts = useSelector((state) => state.admin.product.listProduct);
  const Pagecount = useSelector((state) => state.admin.product.totalPages);

  const Toggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    dispatch(getAllProduct(page)).then((res) => {
      setTotalPage(Pagecount);
    });
  }, [page, deleteProduct, createProduct, updateProduct]);

  const handlePageClick = (e) => {
    const currentPage = e.selected + 1;
    setPage(currentPage);
    dispatch(getAllProduct(currentPage));
  };
  const handleCloseEdit = () => {
    setShowModalEdit(false);
  };
  const showEdit = (product) => {
    setShowModalEdit(true);
    setProductEdit(product);
  };
  const handleClose = () => {
    setShowModalAdd(false);
  };
  const displayAdd = () => {
    setShowModalAdd(true);
  };
  const deleteClick = async (product_id) => {
    dispatch(handleDeleteProduct(product_id)).then((res) => {
      toast.success("Xoa thanh cong");
    });
  };

  return (
    <>
      <div className="container-fluid bg min-vh-100 bg-gray-300 ">
        <div className="row ">
          {toggle && (
            <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
              <SideBar/>
            </div>
          )}
          {toggle && <div className="col-4 col-md-2"></div>}
          <ModalAddProduct
            showModalAdd={showModalAdd}
            handleClose={handleClose}
          />
          <ModalEditProduct
            showModalEdit={showModalEdit}
            handleCloseEdit={handleCloseEdit}
            productEdit={productEdit}
          />
          <div className="col">
            <div className="px-3">
              <Nav Toggle={Toggle} />
              <div className="flex justify-between">
                <div className="text-gray-500 text-2xl">Quản lý sản phẩm</div>
                <button
                  onClick={() => displayAdd()}
                  type="button"
                  className="btn btn-primary bg-blue-800"
                >
                  THÊM SẢN PHẨM
                </button>
              </div>
              <table className="table caption-top bg-white rounded mt-2">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Action</th>
                    {/* <th scope="col">Description</th> */}
                  </tr>
                </thead>
                <tbody>
                  {listProducts &&
                    listProducts.length > 0 &&
                    listProducts.map((item, index) => {
                      const displayIndex = (page - 1) * 5 + index + 1;
                      return (
                        <tr key={index}>
                          <th scope="row">{displayIndex}</th>

                          <td style={{ width: "150px" }}>
                            <img
                              width={"100px"}
                              src={ item.image}
                              alt=""
                            />
                          </td>
                          <td style={{ width: "400px" }}>{item.name}</td>
                          <td
                            style={{
                              color: "#883731",
                              fontWeight: "bold",
                            }}
                          >
                            {item.price.toLocaleString("vi-VN")} đ
                          </td>
                          <td>
                            <MdDelete
                              className="text-2xl mr-2 cursor-pointer text-red-700"
                              onClick={() => deleteClick(item.id)}
                            />
                            <FaEdit
                              className="text-2xl mr-2 cursor-pointer text-yellow-500 ml-1"
                              onClick={() => showEdit(item)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <ReactPaginate
                nextLabel=" >"
                onPageChange={(e) => handlePageClick(e)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={Pagecount}
                previousLabel="< "
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductManage;
