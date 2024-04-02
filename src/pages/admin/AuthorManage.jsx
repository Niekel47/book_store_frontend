import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/SideBar";
import Nav from "../../components/admin/Nav";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { UrlImage } from "../../../url";
import { useDispatch, useSelector } from "react-redux";
// import { getAllAuthor } from "../../redux/slice/admin/ListPageSlice";
import {
  getAllAuthor,
  handleDeleteAuthor,
} from "../../redux/slice/admin/productSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ModalAddAuthor from "../../components/admin/ModalAddAuthor";
import { toast } from "react-toastify";

const AuthorManage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const listAuthor = useSelector((state) => state.admin.product.listAuthor);
  const deleteAuthor = useSelector((state) => state.admin.product.deleteAuthor);
  const createAuthor = useSelector((state) => state.admin.product.createAuthor);
  const totalPages = useSelector(
    (state) => state.admin.product.totalPagesAuthor
  );
  console.log("totalPages", totalPages);
  // console.log("Pagecount", Pagecount);

  useEffect(() => {
    dispatch(getAllAuthor(page)).then((res) => {
      // const Pagecount = res;
      setTotalPage(totalPages);
    });
  }, [page, createAuthor, deleteAuthor]);

  const handlePageClick = (e) => {
    const currentPage = e.selected + 1;
    setPage(currentPage);
    dispatch(getAllAuthor(currentPage));
  };

  const displayAdd = () => {
    setShowModalAdd(true);
  };

  const handleClose = () => {
    setShowModalAdd(false);
  };

  const deleteClick = async (author_id) => {
    dispatch(handleDeleteAuthor(author_id)).then((res) => {
      toast.success("Xoa thanh cong");
    });
  };

  return (
    <>
      <div className="container-fluid bg min-vh-100 bg-gray-300 ">
        <div className="row ">
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>

          {<div className="col-4 col-md-2"></div>}
          <ModalAddAuthor
            showModalAdd={showModalAdd}
            handleClose={handleClose}
          />

          <div className="col">
            <div className="px-3">
              <Nav />
              <div className="flex justify-between">
                <div className="text-gray-500 text-2xl">Quản lý tác giả</div>
                <button
                  onClick={() => displayAdd()}
                  type="button"
                  className="btn btn-primary bg-blue-800"
                >
                  Thêm tác giả
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
                  {Array.isArray(listAuthor) &&
                    listAuthor.map((authors, index) => (
                      <tr key={authors.id}>
                        <td>{index + 1}</td>
                        <td>{authors.id}</td>
                        <td>{authors.name}</td>
                        <td>
                          <MdDelete
                            className="text-2xl mr-2 cursor-pointer text-red-700"
                            onClick={() => deleteClick(authors.id)}
                          />
                          <FaEdit
                            className="text-2xl mr-2 cursor-pointer text-yellow-500 ml-1"
                            onClick={() => showEdit(authors)}
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
                pageCount={totalPages}
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

export default AuthorManage;
