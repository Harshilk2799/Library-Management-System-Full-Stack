import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API } from "../../config/api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function StudentIssuedBook() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const studentUser = localStorage.getItem("studentUserInfo");

  useEffect(() => {
    async function fetchIssuedBooks() {
      try {
        const res = await axios.get(`${BASE_API}/user/student-issued-book/`, {
          params: { student_id: studentUser },
        });
        console.log(res.data);
        setIssuedBooks(res.data);
      } catch (error) {
        toast.error("Failed to fetch issued books!");
      }
    }
    fetchIssuedBooks();
  }, []);

  const totalIssued = issuedBooks.length;
  const notReturnedCount = issuedBooks.filter(
    (issue) => !issue.is_returned
  ).length;
  const totalFine = issuedBooks.reduce((sum, issue) => {
    return sum + (issue.fine || 0);
  }, 0);
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
                <i className="fa-solid fa-receipt text-primary"></i>
              </span>
              <span>My Issued Books</span>
            </h3>
          </div>
          <p className="mt-3">
            Welcome! <b>Guest</b>
          </p>
        </div>
        <div className="row g-3 mb-4">
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted text-uppercase small mb-1">
                    Total Issued Books
                  </p>
                  <h4 className="mb-0">{totalIssued}</h4>
                </div>
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#0f766e1a",
                  }}
                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                >
                  <i className="fa-solid fa-book-open text-primary"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted text-uppercase small mb-1">
                    Not Returned Yet
                  </p>
                  <h4 className="mb-0">{notReturnedCount}</h4>
                </div>
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#0f766e1a",
                  }}
                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                >
                  <i className="fa-solid fa-clock-rotate-left text-primary"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted text-uppercase small mb-1">
                    Total Fine (₹)
                  </p>
                  <h4 className="mb-0">{totalFine}</h4>
                </div>
                <span
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#0f766e1a",
                  }}
                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                >
                  <i className="fa-solid fa-triangle-exclamation text-primary"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        {issuedBooks.length === 0 ? (
          <div className="text-center py-5">
            <div className="alert alert-info">
              <i className="fa-solid fa-info-circle-me-2"></i>No issued books
              found.
            </div>
          </div>
        ) : (
          <>
            <div className="table-responsive border rounded-3">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Book Title</th>
                    <th>ISBN</th>
                    <th>Issue Date</th>
                    <th>Return Date</th>
                    <th>Fine (₹)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {issuedBooks.map((issue, index) => (
                    <tr key={issue.uid}>
                      <td>{index + 1}</td>
                      <td>{issue.book_title}</td>
                      <td>
                        <span className="badge bg-soft-bg-secondary text-dark border border-secondary-subtle">
                          {issue.book_isbn}
                        </span>
                      </td>
                      <td>{new Date(issue.issued_at).toLocaleDateString()}</td>
                      <td>
                        {issue.returned_at ? (
                          new Date(issue.returned_at).toLocaleDateString()
                        ) : (
                          <span className="text-danger fw-bold">
                            Not returned yet!
                          </span>
                        )}
                      </td>
                      <td>{issue.fine || 0}</td>
                      <td>
                        {issue.is_returned ? (
                          <span className="text-success fw-bold">Returned</span>
                        ) : (
                          <span className="text-danger fw-bold">
                            Not Returned
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentIssuedBook;
