import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../components/admin/Sidebar";
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
import { getAuthor } from "../../axios/service";
import ModalDeleteAuthor from "../../components/admin/ModalDeleteAuthor";

const AuthorManage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [listAuthor, setListAuthor] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const deleteAuthor = useSelector((state) => state.admin.product.deleteAuthor);
  const createAuthor = useSelector((state) => state.admin.product.createAuthor);
  const [toggle, setToggle] = useState(true);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);
  const Toggle = () => {
    setToggle(!toggle);
  };
  
  useEffect(() => {
    fetchAllAuthor();
  }, [page, createAuthor, deleteAuthor]);

  const fetchAllAuthor = async () => {
    try {
      const res = await getAuthor(page);
      setListAuthor(res.data.getallAuthor);
      setTotalPage(res.data.totalPagesAuthor);
    } catch (error) {
      console.log(error);
    }
  };

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

  const deleteClick = (author_id) => {
    setAuthorToDelete(author_id);
    setShowModalDelete(true);
  };
  const HandledeleteClick = async (author_id) => {
    dispatch(handleDeleteAuthor(author_id)).then((res) => {
      toast.success("Xoa thanh cong");
    });
  };

  return (
    <>
      <ModalDeleteAuthor
        showModalDelete={showModalDelete}
        handleCloseDelete={() => setShowModalDelete(false)}
        deleteClick={HandledeleteClick}
        authorToDelete={authorToDelete}
      />
      <div className="container-fluid bg min-vh-100 bg-gray-300 ">
        <div className="row ">
          {toggle && (
            <div className="col-4 col-md-2 bg-white vh-100 position-fixed ">
              <SideBar />
            </div>
          )}
          {<div className="col-4 col-md-2"></div>}
          <ModalAddAuthor
            showModalAdd={showModalAdd}
            handleClose={handleClose}
          />

          <div className="col">
            <div className="px-3">
              <Nav Toggle={Toggle} />
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
                  {listAuthor &&
                    listAuthor.length > 0 &&
                    listAuthor.map((item, index) => {
                      const displayIndex = (page - 1) * 5 + index + 1;
                      return (
                        <tr key={index}>
                          <th scope="row">{displayIndex}</th>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
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

export default AuthorManage;
