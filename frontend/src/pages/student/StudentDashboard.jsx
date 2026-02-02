import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API } from "../../config/api.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function StudentDashboard() {
  const [stats, setStats] = useState({
    total_books: 0,
    total_issued: 0,
    not_returned: 0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const studentId = localStorage.getItem("studentUserInfo");

  useEffect(() => {
    if (!studentId) {
      navigate("/user/login");
      return;
    }
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_API}/user/stats/`, {
          params: { student_id: studentId },
        });
        setStats(res.data.stats);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch stats!");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);
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
              <span>My Library Dashboard</span>
            </h3>
          </div>
          <p className="mt-3">
            Welcome! <b>Guest</b>
          </p>
        </div>
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary"></div>
            <span className="mt-3 text-muted">Loading...</span>
          </div>
        ) : (
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="text-uppercase text-muted mb-1 small">
                        Total Books
                      </h6>
                      <h3 className="mb-0">{stats.total_books}</h3>
                    </div>
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "42px",
                        height: "42px",
                        background: "#e0e7ff",
                      }}
                    >
                      <i className="fa-solid fa-layer-group text-primary"></i>
                    </div>
                  </div>
                  <p className="text-muted mb-0 small">
                    All books currently available in the library.
                  </p>
                  <div className="mt-3">
                    <Link
                      to="/user/books"
                      className="small text-primary text-decoration-none"
                    >
                      View Books <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="text-uppercase text-muted mb-1 small">
                        Pending Returns
                      </h6>
                      <h3 className="mb-0">{stats.not_returned}</h3>
                    </div>
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "42px",
                        height: "42px",
                        background: "#e0e7ff",
                      }}
                    >
                      <i className="fa-solid fa-layer-group text-primary"></i>
                    </div>
                  </div>
                  <p className="text-muted mb-0 small">
                    Books that are due for return but haven't been returned yet.
                    Please return on time to avoid late fines.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="text-uppercase text-muted mb-1 small">
                        Total Books Issued
                      </h6>
                      <h3 className="mb-0">{stats.total_issued}</h3>
                    </div>
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: "42px",
                        height: "42px",
                        background: "#e0e7ff",
                      }}
                    >
                      <i className="fa-solid fa-layer-group text-primary"></i>
                    </div>
                  </div>
                  <p className="text-muted mb-0 small">
                    Count of all books issued to you.
                  </p>
                  <div className="mt-3">
                    <Link
                      to="/user/books"
                      className="small text-primary text-decoration-none"
                    >
                      View issue history
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
