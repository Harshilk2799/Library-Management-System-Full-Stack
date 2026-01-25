import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_API } from "../config/api.js";

function AdminChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("adminUser");
    console.log("Username: ", username);
    setUser(username);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password do not match!");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 character long");
      return;
    }
    setIsLoading(true);

    const username = localStorage.getItem("adminUser");
    try {
      const res = await axios.post(`${BASE_API}/admin/change-password/`, {
        username: username,
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      if (res.data.success) {
        toast.success(res.data.message || "Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.data.message || "Failed to change password.");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.errors) {
        toast.error(error.response.data.errors[0]);
      }
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
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
        <div className="row mb-4">
          <div className="col-md-8 mx-auto text-center">
            <h4 className="fw-semibold mb-1">
              <i className="fa-solid fa-key text-primary me-2"></i>
              Admin Change Password
            </h4>
            <p className="text-muted small">
              Update your account's password here.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="row">
          {/* Form */}
          <div className="col-md-8 mx-auto">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label
                      htmlFor="currentPassword"
                      className="form-label small fw-medium"
                    >
                      Current Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        className="form-control"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <i className="fa-solid fa-eye-slash"></i>
                        ) : (
                          <i className="fa-solid fa-eye"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="newPassword"
                      className="form-label small fw-medium"
                    >
                      New Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="fa-solid fa-key"></i>
                      </span>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="form-control"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <i className="fa-solid fa-eye-slash"></i>
                        ) : (
                          <i className="fa-solid fa-eye"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="confirmNewPassword"
                      className="form-label small fw-medium"
                    >
                      Confirm New Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">
                        <i className="fa-solid fa-key"></i>
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control"
                        id="confirmNewPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Enter confirm password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <i className="fa-solid fa-eye-slash"></i>
                        ) : (
                          <i className="fa-solid fa-eye"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-100"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-key me-2"></i>
                        Update Password
                      </>
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
export default AdminChangePassword;
