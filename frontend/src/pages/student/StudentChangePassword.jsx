import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API } from "../../config/api.js";
import { toast } from "react-toastify";

function StudentChangePassword() {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const studentId = localStorage.getItem("studentUserInfo");

  function togglePassword(field) {
    setShowPassword((prev) => ({ ...prev, [field]: !showPassword[field] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      toast.error("New password and confirm password do not match!");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_API}/user/change-password/`, {
        student_id: studentId,
        old_password: formData.old_password,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      });

      toast.success(res.data.message || "Password changed successfully!");
      setFormData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to change password!");
    } finally {
      setLoading(false);
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
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h3 className="mb-1 d-flex align-items-center  gap-2">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "36px",
                  height: "36px",
                  background: "#0f766e1a",
                }}
              >
                <i className="fa-solid fa-key text-primary"></i>
              </span>
              <span>Change Password</span>
            </h3>
            <p className="text-muted">Change your accound password.</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="old_password" className="form-label">
                      Old Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword.old ? "text" : "password"}
                        className="form-control"
                        id="old_password"
                        value={formData.old_password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            old_password: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => togglePassword("old")}
                      >
                        <i
                          className={`fa-solid ${
                            showPassword.old ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="new_password" className="form-label">
                      New Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword.new ? "text" : "password"}
                        className="form-control"
                        id="new_password"
                        value={formData.new_password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            new_password: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => togglePassword("new")}
                      >
                        <i
                          className={`fa-solid ${
                            showPassword.new ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirm_password" className="form-label">
                      Old Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        className="form-control"
                        id="confirm_password"
                        value={formData.confirm_password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirm_password: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => togglePassword("confirm")}
                      >
                        <i
                          className={`fa-solid ${
                            showPassword.confirm ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn btn-primary ${
                      loading ? "disabled opacity-75" : ""
                    } w-100`}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Saving...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentChangePassword;
