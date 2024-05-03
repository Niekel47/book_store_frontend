import React, { useEffect } from "react";
import Logo from "../../assets/website/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { logout, profile } from "../../redux/slice/customer/authSlice";
import { useDispatch, useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoBagHandle } from "react-icons/io5";
import {
  getTotal,
  updateCartQuantity,
} from "../../redux/slice/customer/cartSlice";
import SearchInput from "../SearchInput/SearchInput";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "All Books",
    link: "/product",
  },
  {
    id: 3,
    name: "About",
    link: "/about",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigatePage = (page) => {
    navigate(page);
  };
  const userProfile = useSelector(
    (state) => state.customer.auth.isSuccessProfile
  );
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const { cartTotalQuantity } = useSelector((state) => state.customer.cart);
  const logoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    toast.success("Đăng xuất thành công");
    // navigate("/");
    window.location.reload();
  };
  const navigateToCart = () => {
    if (userProfile) {
      navigate("/cart");
    } else {
      toast.error("Bạn cần đăng nhập!");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(profile());
      // dispatch(updateCartQuantity(cartTotalQuantity));
       dispatch(getTotal());
    }
    
     
    
  }, [cartTotalQuantity, cart]);

  return (
    <>
      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div>
              <a href="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
                <img src={Logo} alt="Logo" className="w-10" />
                Books
              </a>
            </div>
            <div className="flex justify-between items-center gap-4">
              <ul className="hidden sm:flex items-center gap-4">
                {Menu.map((menu) => (
                  <li key={menu.id}>
                    <a
                      href={menu.link}
                      className="inline-block py-4 px-4 hover:text-primary duration-200"
                    >
                      {menu.name}
                    </a>
                  </li>
                ))}
                {/* Simple Dropdown and Links */}
                <li className="group relative cursor-pointer">
                  {/* <a
                    href="/#home"
                    className="flex h-[72px] items-center gap-[2px]"
                  >
                    Quick Links{" "}
                    <span>
                      <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a> */}
                  {/* <div className="absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block  ">
                    <ul className="space-y-3">
                      {DropdownLinks.map((data) => (
                        <li key={data.name}>
                          <a
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                            href={data.link}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </li>
              </ul>
              {/* <button
                onClick={() => handleOrderPopup()}
                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3"
              >
                Order
                <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
              </button> */}
              <div className="relative inline-block">
                <IoBagHandle
                  onClick={navigateToCart}
                  className="text-blue-800 text-3xl"
                />
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-block w-5 h-5 rounded-full bg-blue-800 text-center leading-5 text-white">
                  {cartTotalQuantity}
                </span>
              </div>
            </div>
          </div>
          {userProfile && userProfile.fullname ? (
            <>
              <NavDropdown title="Tài Khoản" id="collapsible-nav-dropdown">
                <NavDropdown.Item>
                  Hello ! {userProfile.fullname}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => logoutClick()}>
                  Đăng Xuất
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => navigatePage(`/order_wait/${userProfile.id}`)}
                >
                  Đơn Hàng
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <NavDropdown title="Tài Khoản" id="collapsible-nav-dropdown">
                <NavDropdown.Item onClick={() => navigatePage("/login")}>
                  Đăng Nhập
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigatePage("/register")}>
                  Đăng Ký
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </div>
      </div>
      <SearchInput />
    </>
  );
};

export default Navbar;
