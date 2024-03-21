import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/SideBar";
import Nav from "../../components/admin/Nav";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { UrlImage } from "../../../url";
import { useDispatch } from "react-redux";

const UserManage = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user")
      .then((response) => {
        console.log("data", response.data);
        setUsers(response.data.users);
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "gray" }} className="text fs-4">
                  Quản lý người dùng
                </div>
                <button
                  onClick={() => displayAdd()}
                  type="button"
                  className="btn btn-primary"
                >
                  Thêm người dùng
                </button>
              </div>
              <table className="table caption-top bg-white rounded mt-2">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">ID</th>
                    <th scope="col">fullname</th>
                    <th scope="col">email</th>
                    <th scope="col">phone</th>
                    <th scope="col">address</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(users) &&
                    users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.id}</td>
                        <td>{user.fullname}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.address}</td>
                        <td>{user.RoleId}</td>
                        <td>{user.status}</td>
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

export default UserManage;
