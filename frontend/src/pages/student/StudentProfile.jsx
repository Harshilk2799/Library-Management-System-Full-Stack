import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API } from "../../config/api.js";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function StudentProfile() {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const studentId = localStorage.getItem("studentUserInfo");
  console.log(studentId);

  useEffect(() => {
    async function fetchProfile() {
      try {
        // setLoading(true);
        const res = await axios.get(`${BASE_API}/user/profile/`, {
          params: { student_id: studentId },
        });
        setProfile({
          full_name: res.data.full_name,
          email: res.data.email,
          mobile: res.data.mobile,
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch profile!");
      }
    }
    fetchProfile();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.patch(
        `${BASE_API}/user/profile/`,
        {
          full_name: profile.full_name,
          mobile: profile.mobile,
        },
        {
          params: { student_id: studentId },
        }
      );
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
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
                <i className="fa-solid fa-user-graduate text-primary"></i>
              </span>
              <span>My Profile</span>
            </h3>
            <p className="text-muted">
              View an update your basic profile details.
            </p>
          </div>
          <p className="mt-3">
            Welcome <b>{profile.full_name || "Guest"}</b>
          </p>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="full_name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={profile.full_name}
                      onChange={(e) =>
                        setProfile({ ...profile, full_name: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      disabled
                      value={profile.email}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      Mobile No.
                    </label>
                    <input
                      type="number"
                      name="mobile"
                      value={profile.mobile}
                      max={10}
                      onChange={(e) =>
                        setProfile({ ...profile, mobile: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn ${
                      loading ? "btn-secondary" : "btn-primary"
                    } w-100`}
                  >
                    {loading ? "Saving..." : "Update Profile"}
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

export default StudentProfile;
