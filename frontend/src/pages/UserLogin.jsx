import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_API } from "../config/api.js";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    console.log(formData);
    try {
      const res = await axios.post(`${BASE_API}/user/login/`, formData);
      if (res.data.success) {
        toast.success(res.data.message || `Login successful!`);
        localStorage.setItem("studentUserInfo", res.data.student_id);
        setFormData({
          email: "",
          password: "",
        });
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.log(error);
      const response = error.response?.data;

      const errors = response.errors;

      // 1️ non_field_errors → global toast
      if (errors?.non_field_errors) {
        errors.non_field_errors.forEach((msg) => {
          toast.error(msg);
        });
      }

      // 2️ field-level errors
      Object.keys(errors || {}).forEach((field) => {
        if (field !== "non_field_errors") {
          errors[field].forEach((msg) => {
            toast.error(msg);
          });
        }
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="py-5"
      style={{
        background: "linear-gradient(180deg, #f3f4f6, #fdfbff)",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="row mb-3">
          <div className="col-md-8 mx-auto text-center">
            <h4 className="fw-semibold mb-1">
              <i className="fa-solid fa-user text-primary me-2"></i>
              User Login
            </h4>
            <p className="text-muted small">
              Please enter your login credentials to access your account.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="row">
          {/* Form */}
          <div className="col-md-6 mx-auto">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label small fw-medium"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label small fw-medium"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="Enter password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-100"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Logging in...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-user-plus me-2"></i>
                        Login
                      </>
                    )}
                  </button>
                  <p className="text-center mt-2 text-muted small">
                    New here?
                    <Link to="/user/signup"> Register now</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserLogin;
