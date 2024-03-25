import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/SideBar";
import Nav from "../../components/admin/Nav";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { UrlImage } from "../../../url";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const CategoryManage = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/category")
      .then((response) => {
        console.log("data", response.data);
        setCategories(response.data.getallcat);
        setTotalPage(response.data.totalPages);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#f0f0f0" }}
        className="container-fluid bg min-vh-100 "
      >
        <div className="row ">
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>

          {<div className="col-4 col-md-2"></div>}

          <div className="col">
            <div className="px-3">
              <Nav />
              <div className="flex justify-between">
                <div className="text-gray-500 text-2xl">Quản lý danh mục</div>
                <button
                  onClick={() => displayAdd()}
                  type="button"
                  className="btn btn-primary"
                >
                  Thêm danh mục
                </button>
              </div>
              <table className="table caption-top bg-white rounded mt-2 ">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">ID</th>
                    <th scope="col">name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(categories) &&
                    categories.map((category, index) => (
                      <tr key={category.id}>
                        <td>{index + 1}</td>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
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

export default CategoryManage;
