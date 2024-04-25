import React, { useEffect } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { RiDashboard3Fill } from "react-icons/ri";
import { BsFillCartFill } from "react-icons/bs";
import { FaBagShopping } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/silce/admin/authSlice";
import { toast } from "react-toastify";
import { logoutAdmin, profileAdmin } from "../../redux/slice/admin/authSlice";
import Logo from "../../assets/website/logo.png";
import { Nav } from "react-bootstrap";
const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminProfile = useSelector(
    (state) => state.admin.auth.isSuccessProfileAdmin
  );
  const isSuccessLoginAdmin = useSelector(
    (state) => state.customer.auth.isSuccessLoginAdmin
  );
  useEffect(() => {
    const token = localStorage.getItem("jwt_admin");
    if (token) {
      dispatch(profileAdmin());
    }
  }, [isSuccessLoginAdmin]);
  const logoutClick = () => {
    dispatch(logoutAdmin()).then((res) => {
      if (res.payload && res.payload.success === true) {
        toast.success(`${res.payload.message}`);
      }
    });
    localStorage.removeItem("jwt_admin");
    navigate("/admin");
    window.location.reload();
  };
  return (
    <div className="bg-white SideBar p-2">
      {adminProfile && adminProfile.fullname ? (
        <>
          <div title="Tài Khoản" id="collapsible-nav-dropdown">
            <div className="font-bold underline text-blue-500">Welcome!</div>
            {adminProfile.fullname}
          </div>
        </>
      ) : (
        <>
          <div title="Tài Khoản" id="collapsible-nav-dropdown">
            <div onClick={() => navigate("/admin/login")}>Hello</div>
          </div>
        </>
      )}
      <a
        href="/admin/dashboard"
        className="font-bold text-2xl sm:text-3xl flex gap-2 py-3"
      >
        <img src={Logo} alt="Logo" className="w-10" />
        Books
      </a>
      <hr className="text-dark" />
      <div>
        <hr className="text-dark" />
        <div
          onClick={() => navigate("/admin/order")}
          className="list-group-item py-2 cursor-pointer"
        >
          <BsFillCartFill className="text-3xl text-blue-500 mr-1" />
          <span>Quản Lý Đơn Hàng</span>
        </div>
        <hr className="text-dark" />
        <div
          onClick={() => navigate("/admin/product")}
          className="list-group-item py-2 cursor-pointer"
        >
          <FaBagShopping className="text-3xl text-blue-500 mr-1" />
          <span> Quản Lý Sản Phẩm</span>
        </div>
        <hr className="text-dark" />
        <div
          className="list-group-item py-2 cursor-pointer "
          onClick={() => navigate("/admin/category")}
        >
          <FaBagShopping className="text-3xl text-blue-500 mr-1" />
          <span>Quản lý danh mục</span>
        </div>
        <hr className="text-dark" />
        <div
          className="list-group-item py-2 cursor-pointer"
          onClick={() => navigate("/admin/publisher")}
        >
          <FaBagShopping className="text-3xl text-blue-500 mr-1" />
          <span>Quản lý nhà xuất bản</span>
        </div>
        <hr className="text-dark" />
        <div
          className="list-group-item py-2 cursor-pointer"
          onClick={() => navigate("/admin/author")}
        >
          <FaBagShopping className="text-3xl text-blue-500 mr-1" />
          <span>Quản lý tác giả</span>
        </div>
        <hr className="text-dark" />

        <div
          className="list-group-item py-2 cursor-pointer"
          onClick={() => navigate("/admin/user")}
        >
          <FaBagShopping className="text-3xl text-blue-500 mr-1" />
          <span>Quản lý người dùng</span>
        </div>
        <hr className="text-dark" />
        <div
          onClick={() => logoutClick()}
          className="list-group-item py-2 cursor-pointer"
        >
          <IoLogOutOutline className="text-3xl text-blue-500 mr-1" />
          <span>Đăng Xuất</span>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
