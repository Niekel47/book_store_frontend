import React from "react";
import { profileAdmin } from "../../redux/slice/admin/authSlice";


const Nav = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <i
        style={{ color: "#e28585" }}
        className="navbar-brand bi bi-justify-left fs-4"
        // onClick={Toggle}
      ></i>
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
