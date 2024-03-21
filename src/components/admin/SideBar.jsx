import React from "react";

import { RiDashboard3Fill } from "react-icons/ri";
import { BsFillCartFill } from "react-icons/bs";
import { FaBagShopping } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { logout } from "../../redux/silce/admin/authSlice";
import { toast } from "react-toastify";
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutClick = () => {
    dispatch(logoutAdmin()).then((res) => {
      if (res.payload && res.payload.success === true) {
        toast.success(`${res.payload.message}`);
      }
    });
    dispatch(logout());
    localStorage.removeItem("jwt_admin");
    toast.success("Đăng xuất thành công");
    navigate("/admin");
  };
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <img src="" alt="" />
        <p>Admin</p>
      </div>
      <hr className="text-dark" />
      <div>
        <div
          onClick={() => navigate("/admin/dashboard")}
          style={{ cursor: "pointer" }}
          className="list-group-item py-2"
        >
          <RiDashboard3Fill
            style={{ fontSize: "30px", color: "blue", marginRight: "5px" }}
          />
          <span>Dashboard</span>
        </div>
        <br />
        <div
          onClick={() => navigate("/admin/orders")}
          style={{ cursor: "pointer" }}
          className="list-group-item py-2 "
        >
          <BsFillCartFill
            style={{ fontSize: "30px", color: "blue", marginRight: "5px" }}
          />
          <span>Đơn Hàng</span>
        </div>
        <br />
        <div
          onClick={() => navigate("/admin/product")}
          style={{ cursor: "pointer" }}
          className="list-group-item py-2 "
        >
          <FaBagShopping
            style={{ fontSize: "30px", color: "blue", marginRight: "5px" }}
          />
          <span>Sản Phẩm</span>
        </div>
        <br />
        <div
          style={{ cursor: "pointer" }}
          className="list-group-item py-2 "
          onClick={() => navigate("/admin/category")}
        >
          <FaBagShopping
            style={{ fontSize: "30px", color: "blue", marginRight: "5px" }}
          />
          <span>Quản lý danh mục</span>
        </div>
        <br />
        <div
          style={{ cursor: "pointer" }}
          className="list-group-item py-2 "
          onClick={() => navigate("/admin/publisher")}
        >
          <FaBagShopping
            style={{ fontSize: "30px", color: "blue", marginRight: "5px" }}
          />
          <span>Quản lý nhà xuất bản</span>
        </div>
        <br />
        <div
          style={{ cursor: "pointer" }}
          className="list-group-item py-2 "
          onClick={() => navigate("/admin/user")}
        >
          <FaBagShopping
            style={{ fontSize: "30px", color: "blue", marginRight: "5px" }}
          />
          <span>Quản lý người dùng</span>
        </div>
        <br />

        <div
          onClick={() => logoutClick()}
          style={{ cursor: "pointer" }}
          className="list-group-item py-2 "
        >
          <IoLogOutOutline
            style={{ fontSize: "30px", color: "blue", marginRight: "5px" }}
          />
          <span>Đăng Xuất</span>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
