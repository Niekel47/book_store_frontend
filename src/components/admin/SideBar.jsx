import React, { useEffect } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { RiDashboard3Fill } from "react-icons/ri";
import { BsFillCartFill } from "react-icons/bs";
import { FcManager } from "react-icons/fc";
import { FaBagShopping } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdCategory } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { logoutAdmin, profileAdmin } from "../../redux/slice/admin/authSlice";
import Logo from "../../assets/website/logo.png";
import { MdPublish } from "react-icons/md";
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
          <div>
            <div className="font-bold underline text-blue-500">Welcome!</div>
            {adminProfile.fullname}
          </div>
        </>
      ) : (
        <>
          <div>
            <div>Hello</div>
          </div>
        </>
      )}
      <hr className="text-dark" />
      <a href="/admin/dashboard" className="font-bold text-lg flex gap-2 py-3">
        <img src={Logo} alt="Logo" className="w-7" />
        Books
      </a>
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
          <MdCategory className="text-3xl text-blue-500 mr-1" />
          <span>Quản lý danh mục</span>
        </div>
        <hr className="text-dark" />
        <div
          className="list-group-item py-2 cursor-pointer"
          onClick={() => navigate("/admin/publisher")}
        >
          <MdPublish className="text-3xl text-blue-500 mr-1" />
          <span>Quản lý nhà xuất bản</span>
        </div>
        <hr className="text-dark" />
        <div
          className="list-group-item py-2 cursor-pointer"
          onClick={() => navigate("/admin/author")}
        >
          <FcManager className="text-3xl text-blue-500 mr-1" />
          <span>Quản lý tác giả</span>
        </div>
        <hr className="text-dark" />

        <div
          className="list-group-item py-2 cursor-pointer"
          onClick={() => navigate("/admin/user")}
        >
          <FaUserAlt className="text-3xl text-blue-500 mr-1" />
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
