import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card-group d-block d-md-flex row">
              <div className="card col-md-7 p-4 mb-0">
                <div className="card-body">
                  <h1>Login</h1>
                  <p className="text-medium-emphasis my-2 ">
                    Sign In to your account
                  </p>
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Email"
                    />
                  </div>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button
                        className="btn btn-primary px-4 text-dark"
                        type="button"
                      >
                        Login
                      </button>
                    </div>
                    <div className="col-6 text-end">
                      <button className="btn btn-link px-0" type="button">
                        Forgot password?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card col-md-5 text-white bg-primary py-4">
                <div className="card-body text-center">
                  <div>
                    <h1>Sign up</h1>
                    <p className="text-medium-emphasis my-2">
                      Bạn chưa có tài khoản?Đăng ký ngay
                    </p>
                    <button
                      className="btn btn-lg btn-outline-light mt-3"
                      type="button"
                    >
                      <Link to="/register">Register Now!</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
