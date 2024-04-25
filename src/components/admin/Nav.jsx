import React from "react";
import { profileAdmin } from "../../redux/slice/admin/authSlice";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";

const Nav = ({ Toggle }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <BsLayoutTextSidebarReverse
        className="navbar-brand bi bi-justify-left fs-4 text-blue-500"
        onClick={Toggle}
      ></BsLayoutTextSidebarReverse>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>
      
    </nav>
  );
};

export default Nav;
