import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../../components/admin/Sidebar";
import Nav from "../../components/admin/Nav";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { UrlImage } from "../../../url";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUser,
  handleDeleteUser,
} from "../../redux/slice/admin/productSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const UserManage = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const listUsers = useSelector((state) => state.admin.product.listUser);
  const [toggle, setToggle] = useState(true);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const Toggle = () => {
    setToggle(!toggle);
  };
  const deleteuser = useSelector((state) => state.admin.product.deleteUser);
  const totalPages = useSelector((state) => state.admin.product.totalPagesUser);

  useEffect(() => {
    dispatch(getAllUser());
    setTotalPage(totalPages);
  }, [deleteuser]);

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const displayAdd = () => {
    setShowModalAdd(true);
  };

  const handleClose = () => {
    setShowModalAdd(false);
  };

  const deleteClick = async (user_id) => {
    dispatch(handleDeleteUser(user_id)).then((res) => {
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
          <div className="col">
            <div className="px-3">
              <Nav Toggle={Toggle} />
              <div className="flex justify-between">
                <div className="text-gray-500 text-2xl">Quản lý người dùng</div>
              </div>
              <table className="table caption-top bg-white rounded mt-2">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">fullname</th>
                    <th scope="col">email</th>
                    <th scope="col">phone</th>
                    <th scope="col">address</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(listUsers) &&
                    listUsers.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.fullname}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.address}</td>
                        <td>{user.RoleId}</td>
                        <td>
                          <MdDelete
                            className="text-2xl mr-2 cursor-pointer text-red-700"
                            onClick={() => deleteClick(user.id)}
                          />
                          <FaEdit
                            className="text-2xl mr-2 cursor-pointer text-yellow-500 ml-1"
                            // onClick={() => showEdit(category)}
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

export default UserManage;
