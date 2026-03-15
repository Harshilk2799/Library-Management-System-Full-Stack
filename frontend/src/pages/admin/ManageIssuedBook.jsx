import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "../../config/api.js";

function ManageIssuedBook() {
  const [issueBooks, setIssueBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchIssueBooks() {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_API}/admin/manage-issue-book/`);
        setIssueBooks(res.data.issued);
      } catch (error) {
        toast.error("Failed to load issue books");
      } finally {
        setLoading(false);
      }
    }
    fetchIssueBooks();
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
          <div className="col-md-8 mx-auto d-flex justify-content-between align-items-center">
            <div className="mb-4 text-center">
              <h4 className="fw-semibold mb-1">
                <i className="fa-solid fa-layer-group text-primary me-2"></i>
                Manage Issued Books
              </h4>
              <p className="text-muted small">
                View all issued books, their status and return details
              </p>
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/admin/issue-book")}
            >
              <i className="fa-solid fa-plus me-1"></i> Issue New Book
            </button>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary"></div>
              </div>
            ) : issueBooks.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="small text-muted">
                    <tr>
                      <th>#</th>
                      <th>Student Name</th>
                      <th>Book Name</th>
                      <th>ISBN</th>
                      <th>Issued Date</th>
                      <th>Returned Date</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issueBooks.map((book, index) => (
                      <tr key={book.uid}>
                        <td>{index + 1}</td>
                        <td>{book.student_name}</td>
                        <td>{book.book_title}</td>
                        <td>{book.book_isbn}</td>
                        <td>{new Date(book.issued_at).toLocaleDateString()}</td>
                        <td>
                          {book.returned_at ? (
                            new Date(book.returned_at).toLocaleDateString()
                          ) : (
                            <span className="badge bg-danger">
                              Not Returned Yet
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              navigate(`/admin/issued-book/${book.uid}/`)
                            }
                          >
                            <i className="fa-solid fa-pen-to-square me-1"></i>
                            Details / Return
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted small">No issued book found!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageIssuedBook;
