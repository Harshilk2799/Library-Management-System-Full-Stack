import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_API } from "../../config/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_API}/admin/dashboard-stats/`);
        console.log(res.data);
        setStats(res.data);
      } catch (error) {
        toast.error("Failed to fetch admin stats");
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
        {/* Header */}
        <div className="row mb-4">
          <div className="col-md-10 mx-auto d-flex justify-content-between align-items-center">
            <div className="mb-4 text-center">
              <h4 className="fw-semibold mb-1">
                <i className="fa-solid fa-gauge-high text-primary me-2"></i>
                Admin Dashboard
              </h4>
              <p className="text-muted small">
                Quick overview of library stats and activities.
              </p>
            </div>
            <div className="badge bg-primary-subtle text-primary py-2 px-3 rounded-pill">
              <i className="fa-solid fa-shield-halved"></i> Admin Panel
            </div>
          </div>
        </div>

        {stats && (
          <>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body d-flex">
                    <div className="me-3 d-flex align-items-center">
                      <span
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#eef2ff",
                          color: "#4f46e5",
                        }}
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      >
                        <i className="fa-solid fa-user-graduate"></i>
                      </span>
                    </div>
                    <div>
                      <p className="text-muted text-uppercase mb-1">
                        Total Students
                      </p>
                      <h3 className="fw-semibold mb-1">
                        {stats?.students?.total}
                      </h3>
                      <p className="small mb-0">
                        Active:
                        <span className="text-success fw-semibold">
                          &nbsp; {stats?.students?.active}
                        </span>
                        &nbsp; Inactive:
                        <span className="text-danger fw-semibold">
                          &nbsp; {stats?.students?.blocked}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body d-flex">
                    <div className="me-3 d-flex align-items-center">
                      <span
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#eef2ff",
                          color: "#4f46e5",
                        }}
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      >
                        <i className="fa-solid fa-book-open"></i>
                      </span>
                    </div>
                    <div>
                      <p className="text-muted text-uppercase mb-1">
                        Total Books
                      </p>
                      <h3 className="fw-semibold mb-1">
                        {stats?.books?.total}
                      </h3>
                      <p className="small mb-0">
                        Available:
                        <span className="text-success fw-semibold">
                          &nbsp; {stats?.books?.available}
                        </span>
                        &nbsp; Out of Stock:
                        <span className="text-danger fw-semibold">
                          &nbsp; {stats?.books?.out_of_stock}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body d-flex">
                    <div className="me-3 d-flex align-items-center">
                      <span
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#eef2ff",
                          color: "#4f46e5",
                        }}
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      >
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                      </span>
                    </div>
                    <div>
                      <p className="text-muted text-uppercase mb-1">
                        Issued Records
                      </p>
                      <h3 className="fw-semibold mb-1">
                        {stats?.issued_books?.total}
                      </h3>
                      <p className="small mb-0">
                        Currently issued:
                        <span className="text-success fw-semibold">
                          &nbsp; {stats?.issued_books?.currently_issued}
                        </span>
                        &nbsp; Returned:
                        <span className="text-danger fw-semibold">
                          &nbsp; {stats?.issued_books?.returned}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body d-flex">
                    <div className="me-3 d-flex align-items-center">
                      <span
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#eef2ff",
                          color: "#4f46e5",
                        }}
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      >
                        <i className="fa-solid fa-layer-group"></i>
                      </span>
                    </div>
                    <div>
                      <p className="text-muted text-uppercase mb-1">
                        Categories
                      </p>
                      <h3 className="fw-semibold mb-1">
                        {stats?.categories?.total}
                      </h3>
                      <p className="small text-muted mb-0">
                        Different genres and classifications of books available
                        in the library.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body d-flex">
                    <div className="me-3 d-flex align-items-center">
                      <span
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#eef2ff",
                          color: "#4f46e5",
                        }}
                        className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      >
                        <i className="fa-solid fa-user-pen"></i>
                      </span>
                    </div>
                    <div>
                      <p className="text-muted text-uppercase mb-1">Authors</p>
                      <h3 className="fw-semibold mb-1">
                        {stats?.authors?.total}
                      </h3>
                      <p className="small text-muted mb-0">
                        Writers and contributors of the books available in the
                        library.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
