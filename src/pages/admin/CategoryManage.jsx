import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../components/admin/Sidebar";
import Nav from "../../components/admin/Nav";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { UrlImage } from "../../../url";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {
  getAllCategory,
  handleDeleteCategory,
} from "../../redux/slice/admin/productSlice";
import ModalAddCategory from "../../components/admin/ModalAddCategory";
import { toast } from "react-toastify";
import { getCategory } from "../../axios/service";
import ModalDeleteCategory from "../../components/admin/ModalDeleteCategory";

const CategoryManage = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [listCategory, setListCategory] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const deleteCategory = useSelector(
    (state) => state.admin.product.deleteCategory
  );
  const createCategory = useSelector(
    (state) => state.admin.product.createCategory
  );

  const totalPagesCat = useSelector(
    (state) => state.admin.product.totalPagesCat
  );

  useEffect(() => {
    // dispatch(getAllCategory(page));
    // setTotalPage(totalPagesCat);
    fetchAllCategory();
  }, [page, createCategory, deleteCategory]);

  const fetchAllCategory= async () => {
    try {
      const res = await getCategory(page);
      setListCategory(res.data.getallcat);
      setTotalPage(res.data.totalPagesCat);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = (e) => {
    const currentPage = e.selected + 1;
    setPage(currentPage);
    dispatch(getAllCategory(currentPage));
  };

  const displayAdd = () => {
    setShowModalAdd(true);
  };

  const handleClose = () => {
    setShowModalAdd(false);
  };

const HandledeleteClick = (category_id) => {
  setCategoryToDelete(category_id);
  setShowModalDelete(true);
};

  const deleteClick = async (category_id) => {
    dispatch(handleDeleteCategory(category_id)).then((res) => {
      toast.success("Xoa thanh cong");
    });
  };

  return (
    <>
      <ModalDeleteCategory
        showModalDelete={showModalDelete}
        handleCloseDelete={() => setShowModalDelete(false)}
        deleteClick={deleteClick}
        categoryToDelete={categoryToDelete}
      />
      <div className="container-fluid bg min-vh-100 bg-gray-300 ">
        <div className="row ">
          {toggle && (
            <div className="col-4 col-md-2 bg-white vh-100 position-fixed ">
              <SideBar />
            </div>
          )}
          {<div className="col-4 col-md-2"></div>}
          <ModalAddCategory
            showModalAdd={showModalAdd}
            handleClose={handleClose}
          />
          <div className="col">
            <div className="px-3">
              <Nav />
              <div className="flex justify-between">
                <div className="text-gray-500 text-2xl">Quản lý danh mục</div>
                <button
                  onClick={() => displayAdd()}
                  type="button"
                  className="btn btn-primary bg-blue-800"
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
                  {listCategory &&
                    listCategory.length > 0 &&
                    listCategory.map((item, index) => {
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

export default CategoryManage;
