import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios  from "axios";
import { login } from "../../redux/slice/customer/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer"
import Navbar from "../NavBar/NavBar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.customer.auth.isLoadingLogin);
  const isAuth = useSelector((state) => state.customer.auth.isAuthSucess);
  const defaultvalidinput = {
    isValidEmail: true,
    isValidPassword: true,
  };
  const [objectInput, setObjectInput] = useState(defaultvalidinput);

  const isvalidinput = () => {
    setObjectInput(defaultvalidinput);

    if (!email) {
      toast.error("email is required");
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Invalid email");
      return false;
    }
    if (!password) {
      toast.error("password is required");
      return false;
    }
    return true;
  };
  const handaleLogin = async () => {
    let check = isvalidinput();
    if (check) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/auth/login",
          {
            email,
            password,
          }
        );
        console.log("response", response.data);
        if (response.status === 200) {
          toast.success("Đăng nhập thành công");
          navigate("/")
        } else {
          toast.error("No record existed");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("An error occurred while registering user.");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

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
                  <form method="POST" onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                      <input
                        className={
                          objectInput.isValidEmail
                            ? "form-control"
                            : "form-control is valid"
                        }
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-4">
                      <input
                        className={
                          objectInput.isValidPassword
                            ? "form-control"
                            : "form-control is valid"
                        }
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button
                          className="btn btn-primary px-4 text-dark"
                          type="button"
                          onClick={handaleLogin}
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
                  </form>
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
