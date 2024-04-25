import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/admin/Nav";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { UrlImage } from "../../../url";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPublisher,
  handleDeletePublisher,
} from "../../redux/slice/admin/productSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import ModalAddPublisher from "../../components/admin/ModalAddPublisher";
import SideBar from "../../components/admin/Sidebar";
import { getPublisher } from "../../axios/service";



const PublisherManage = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [listPublisher, setListPublisher] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
   const [toggle, setToggle] = useState(true);
   const Toggle = () => {
     setToggle(!toggle);
   };
  
  const deletePublisher = useSelector(
    (state) => state.admin.product.deletePublisher
  );
  const createPublisher = useSelector(
    (state) => state.admin.product.createPublisher
  );

  const totalPagesPublihser = useSelector(
    (state) => state.admin.product.totalPagesPublihser
  );

  useEffect(() => {
   fetchAllPublisher();
  }, [page, deletePublisher, createPublisher]);

const fetchAllPublisher = async () => {
  try {
    const res = await getPublisher(page);
    setListPublisher(res.data.getPublisher);
    setTotalPage(res.data.totalPagesPublihser);
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
  const deleteClick = async (publisher_id) => {
    dispatch(handleDeletePublisher(publisher_id)).then((res) => {
      toast.success("Xoa thanh cong");
    });
  };

  return (
    <>
      <div className="container-fluid bg min-vh-100 bg-gray-300 ">
        <div className="row ">
          {toggle && (
            <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
              <SideBar />
            </div>
          )}
          {toggle && <div className="col-4 col-md-2"></div>}
          <ModalAddPublisher
            showModalAdd={showModalAdd}
            handleClose={handleClose}
          />

          <div className="col">
            <div className="px-3">
              <Nav Toggle={Toggle} />
              <div className="flex justify-between">
                <div className="text-gray-500 text-2xl">Quản lý NXB</div>
                <button
                  onClick={() => displayAdd()}
                  type="button"
                  className="btn btn-primary bg-blue-800"
                >
                  Thêm nhà xuất bản
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
                  {listPublisher &&
                    listPublisher.length > 0 &&
                    listPublisher.map((item, index) => {
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

export default PublisherManage;
