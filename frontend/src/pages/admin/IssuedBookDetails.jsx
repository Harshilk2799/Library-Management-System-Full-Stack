import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_API } from "../../config/api.js";

function IssuedBookDetails() {
  const { issued_id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fine, setFine] = useState("");

  console.log(issue);
  const navigate = useNavigate();

  async function fetchIssue() {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_API}/admin/issue-book-detail/${issued_id}/`
      );
      setIssue(res.data.issued);
      if (res.data.issued.fine) {
        setFine(res.data.issued.fine);
      }
    } catch (error) {
      toast.error("Failed to load issue book details");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchIssue();
  }, [issued_id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to return this book?")) return;

    if (!fine) {
      toast.error("Please enter the fine amount (enter 0 if no fine).");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_API}/admin/return-book/${issued_id}/`,
        {
          fine: fine,
        }
      );
      toast.success(res.data.message);
      //   navigate("/admin/manage-issue-book");
      fetchIssue();
    } catch (error) {
      toast.error("Failed to return book");
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return (
      <div
        className="py-5 d-flex justify-content-center align-items-center"
        style={{
          background: "linear-gradient(135deg, #f3f4ff, #fdfbff)",
          minHeight: "100vh",
        }}
      >
        <div className="spinner-border text-primary"></div>
      </div>
    );
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
          <div className="col-md-8 mx-auto d-flex justify-content-between align-items-center">
            <div className="mb-4 text-center">
              <h4 className="fw-semibold mb-1">
                <i className="fa-solid fa-layer-group text-primary me-2"></i>
                Issued Book Details
              </h4>
              <p className="text-muted small">
                View student and book details, return status and fine
                information.
              </p>
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/admin/manage-issue-book")}
            >
              <i className="fa-solid fa-plus me-1"></i> Back to List
            </button>
          </div>
        </div>
        {/* Student and Book Info. */}
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h5 className="fw-semibold mb-3">Student Details</h5>
                <hr />
                <p className="mb-1">
                  <strong>Student Name:</strong> {issue?.student_name}
                </p>
                <p className="mb-1">
                  <strong>Fine: </strong>
                  {issue?.fine != null
                    ? `₹ ${issue?.fine}`
                    : "No fine recorded yet!"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h5 className="fw-semibold mb-3">Book Details</h5>
                <hr />
                {issue?.book_img && (
                  <img
                    src={`http://127.0.0.1:8000${issue?.book_img}`}
                    className="img-fluid rounded"
                    style={{
                      width: "100px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      marginBottom: "12px",
                    }}
                    alt={issue?.title}
                  />
                )}
                <p className="mb-1">
                  <strong>Book Name:</strong> {issue?.book_title}
                </p>
                <p className="mb-1">
                  <strong>Book ISBN:</strong> {issue?.book_isbn}
                </p>
                <p className="mb-1">
                  <strong>Issued Date:</strong>
                  {new Date(issue?.issued_at).toLocaleDateString()}
                </p>
                <p className="mb-1">
                  <strong>Return Date:</strong>
                  {issue?.returned_at
                    ? new Date(issue?.returned_at).toLocaleDateString()
                    : "Not returned Yet!"}
                </p>
              </div>
            </div>
            <div className="card border-0 shadow-sm rounded-4 mt-2">
              <div className="card-body p-4">
                <h5 className="fw-semibold mb-3">Return Book</h5>
                <hr />
                {issue?.is_returned ? (
                  <p className="text-success small mb-0">
                    This book already been returned. Fine:{" "}
                    <strong>₹ {issue.fine || 0}</strong>
                  </p>
                ) : (
                  <>
                    <div className="mb-3">
                      <label
                        htmlFor="fine"
                        className="form-label small fw-medium"
                      >
                        Fine Amount (₹) (if any)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={fine}
                        placeholder="Enter fine amount, e.g. 0 or 10"
                        onChange={(e) => setFine(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle-fill me-2"></i>
                          "Return Book"
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssuedBookDetails;
