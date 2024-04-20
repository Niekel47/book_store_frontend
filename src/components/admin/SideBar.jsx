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
          <NavDropdown title="Tài Khoản" id="collapsible-nav-dropdown">
            <NavDropdown.Item>Hello ! {adminProfile.fullname}</NavDropdown.Item>
            <NavDropdown.Item onClick={() => logoutClick()}>
              Đăng Xuất
            </NavDropdown.Item>
          </NavDropdown>
        </>
      ) : (
        <>
          <NavDropdown title="Tài Khoản" id="collapsible-nav-dropdown">
            <NavDropdown.Item onClick={() => navigate("/admin/login")}>
              Đăng Nhập
            </NavDropdown.Item>
          </NavDropdown>
        </>
      )}
      <hr className="text-dark" />
      <div className="" onClick={() => navigate("/admin")}>
        <img src="" alt="" />
        <a className="" onClick={() => navigate("/admin")}>
          Admin
        </a>
      </div>
      <div>
        {/* <div
          onClick={() => navigate("/admin")}
          className="list-group-item py-2 cursor-pointer"
        >
          <RiDashboard3Fill className="text-3xl text-blue-500 mr-1" />
          <span>Dashboard</span>
        </div> */}
        <div
          onClick={() => navigate("/admin/order")}
          className="list-group-item py-2 cursor-pointer"
        >
          <BsFillCartFill className="text-3xl text-blue-500 mr-1" />
          <span>Quản Lý Đơn Hàng</span>
        </div>

        <div
          onClick={() => navigate("/admin/product")}
          className="list-group-item py-2 cursor-pointer"
        >
          <FaBagShopping className="text-3xl text-blue-500 mr-1" />
          <span> Quản Lý Sản Phẩm</span>
        </div>

        <div
          className="list-group-item py-2 cursor-pointer "
          onClick={() => navigate("/admin/category")}
        >
          <FaBagShopping className="text-3xl text-blue-500 mr-1" />
          <span>Quản lý danh mục</span>
        </div>

        <div
          className="list-group-item py-2 cursor-pointer"
          onClick={() => navigate("/admin/publisher")}
        >
          <FaBagShopping className="text-3xl text-blue-500 mr-1" />
          <span>Quản lý nhà xuất bản</span>
        </div>

        <div
          className="list-group-item py-2 cursor-pointer"
          onClick={() => navigate("/admin/author")}
        >
          <FaBagShopping className="text-3xl text-blue-500 mr-1" />
          <span>Quản lý tác giả</span>
        </div>

        <div
          className="list-group-item py-2 cursor-pointer"
          onClick={() => navigate("/admin/user")}
        >
          <FaBagShopping className="text-3xl text-blue-500 mr-1" />
          <span>Quản lý người dùng</span>
        </div>

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
