import React, { useState, useEffect } from "react";
import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/SideBar";
import axios from "axios"; // Import axios
import ReactPaginate from "react-paginate";
import { MdDelete } from "react-icons/md";
import { UrlImage } from "../../../url";
import { FaEdit } from "react-icons/fa";
import ModalAddProduct from "../../components/admin/ModelAddProuct";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductManage = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const [toggle, setToggle] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);

  const Toggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    fetchAllProduct();
  }, [page]);

  const fetchAllProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/product", {
        params: { page: page },
      });
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const handleClose = () => {
    setShowModalAdd(false);
  };
  const displayAdd = () => {
    setShowModalAdd(true);
  };
  const deleteClick = async (product_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/api/product/${product_id}`
      );
      if (res === true) {
        toast.success("Xóa thành công!");
        fetchAllProduct(); // Refresh the product list after deletion
      }
    } catch (error) {
      toast.error(error)
    }
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#f0f0f0" }}
        className="container-fluid bg min-vh-100 "
      >
        <div className="row ">
          {toggle && (
            <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
              <Sidebar />
            </div>
          )}
          {toggle && <div className="col-4 col-md-2"></div>}
          <ModalAddProduct
            showModalAdd={showModalAdd}
            handleClose={handleClose}
          />
          <div className="col">
            <div className="px-3">
              <Nav Toggle={Toggle} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "gray" }} className="text fs-4">
                  QUẢN LÝ SẢN PHẨM
                </div>
                <button
                  onClick={() => displayAdd()}
                  type="button"
                  className="btn btn-primary"
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
                    {/* <th scope="col">Description</th> */}
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(listProduct) &&
                    listProduct.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            width={"100px"}
                            src={URL_IMAGE + item.image}
                            alt=""
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price.toLocaleString("vi-VN")} đ</td>
                        {/* <td>{item.description}</td> */}
                        <td>
                          <MdDelete
                            style={{
                              fontSize: "25px",
                              marginRight: "10px",
                              cursor: "pointer",
                              color: "#dc0000",
                            }}
                            onClick={() => deleteClick(item.id)}
                          />
                          <FaEdit
                            style={{
                              fontSize: "23px",
                              marginRight: "10px",
                              cursor: "pointer",
                              color: "#e3c01c",
                            }}
                            onClick={() => showEdit(item)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <ReactPaginate
                nextLabel=" >"
                onPageChange={(e) => handlePageClick(e)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}
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
