import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "../../config/api.js";

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_API}/admin/login/`, {
        username,
        password,
      });
      console.log("RESULT: ", res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("adminUser", res.data.user.username);
        // navigate("/admin/dashboard");
        window.location.href = "/admin/dashboard";
      }
    } catch (error) {
      console.log("ERROR: ", error);
      const message = error.response.data.message;
      toast.error(message || "Something went wrong!");
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
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="mb-4 text-center">
              <h4 className="fw-semibold mb-1">
                <i className="fa-solid fa-shield-halved text-primary"></i> Admin
                Sign In
              </h4>
              <p className="text-muted small">
                Use the admin account created via <code>createsuperuser</code>
              </p>
            </div>
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label
                      htmlFor="username"
                      className="form-label small fw-medium"
                    >
                      Username
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <i className="fa-regular fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control "
                        id="username"
                        value={username}
                        disabled={isLoading}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Admin Username"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label small fw-medium"
                    >
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent">
                        <i className="fa-solid fa-key"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        disabled={isLoading}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Admin Password"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-100"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>{" "}
                        Sign In...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-right-to-bracket"></i> Sign In
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

export default AdminLogin;
