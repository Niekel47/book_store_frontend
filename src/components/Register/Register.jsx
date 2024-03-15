import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slice/customer/authSlice";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSuccess = useSelector(
    (state) => state.customer.auth.isSuccessRegister
  );
  const isError = useSelector((state) => state.customer.auth.isErrorRegister);

  const defaultvalidinput = {
    isValidEmail: true,
    isValidPassword: true,
    isValidPhone: true,
    isValidAddress: true,
  };
  const [objectInput, setObjectInput] = useState(defaultvalidinput);
  const isValidInput = () => {
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
    if (!fullname) {
      toast.error("Full name is required");
      return false;
    }
    if (!password) {
      toast.error("password is required");
      return false;
    }
    if (!phone) {
      toast.error("phone is required");
      return false;
    }
    if (!address) {
      toast.error("address is required");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration successful!");
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleRegister();
  };

  const handleRegister = async () => {
    let check = isValidInput();
    let data_user = {
      fullname: fullname,
      email: email,
      phone: phone,
      address: address,
      password: password,
    };
    if (check) {
      dispatch(register(data_user));
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mb-4 mx-4">
              <div className="card-body p-4">
                <h1>Register</h1>
                <p className="text-medium-emphasis my-2">Create your account</p>

                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Fullname"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      className={
                        objectInput.isValidEmail
                          ? "form-control"
                          : "form-control is valid"
                      }
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      className={
                        objectInput.isValidPassword
                          ? "form-control"
                          : "form-control is valid"
                      }
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      className={
                        objectInput.isValidPhone
                          ? "form-control"
                          : "form-control is valid"
                      }
                      type="text"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      className={
                        objectInput.isValidAddress
                          ? "form-control"
                          : "form-control is valid"
                      }
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-success text-black" type="submit">
                    Create Account
                  </button>
                </form>
                <button
                  className="btn btn-primary text-black d-flex "
                  type="button"
                >
                  <Link to="/login">Back</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
