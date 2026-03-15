import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "../../config/api.js";

function IssueBook() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [studentEmail, setStudentEmail] = useState("");
  const [book, setBook] = useState(null);
  const [bookQuery, setBookQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [remark, setRemark] = useState("");

  async function handleFetchStudent() {
    if (!studentEmail) {
      toast.error("Please enter student Email");
      return;
    }
    setStudent(null);
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_API}/admin/students/search-by-email/`,
        { params: { email: studentEmail } }
      );
      setStudent(res.data.student);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch student");
    } finally {
      setLoading(false);
    }
  }
  async function handleFetchBook() {
    if (!bookQuery) {
      toast.error("Please enter book title or book isbn");
      return;
    }
    setBook(null);
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_API}/admin/books/search/`, {
        params: { q: bookQuery },
      });
      console.log("DEMO: ", res.data.book);
      setBook(res.data.book);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch book");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!studentEmail || !bookQuery || !remark) {
      toast.error("Please fill all the fields!");
      return;
    }
    if (book.quantity <= 0) {
      toast.error("Book is out of stock!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_API}/admin/issue-book/`, {
        email: studentEmail,
        book: book.isbn,
        remark: remark,
      });
      toast.success(res.data.message);
      setRemark("");
      setBook(null);
      setBookQuery("");
      setStudent(null);
      setStudentEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch book");
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
        {/* Header */}
        <div className="row mb-4">
          <div className="col-md-8 mx-auto d-flex justify-content-between align-items-center">
            <div className="mb-4 text-center">
              <h4 className="fw-semibold mb-1">
                <i className="fa-solid fa-layer-group text-primary me-2"></i>
                Issue a New Book
              </h4>
              <p className="text-muted small">
                Search student and book, then issue the book with a remark.
              </p>
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/admin/manage-issue-book")}
            >
              Manage Issued Books
            </button>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-7">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-4">
                    <label
                      htmlFor="student-email"
                      className="form-label fw-medium"
                    >
                      Student Email <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={studentEmail}
                        required
                        placeholder="e.g. example@gmail.com"
                        onChange={(e) => setStudentEmail(e.target.value)}
                        // onBlur={handleFetchStudent}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleFetchStudent}
                      >
                        {loading ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <i className="fa-solid fa-search"></i>
                        )}
                      </button>
                    </div>
                    <div className="mt-2 small">
                      {student ? (
                        <span className="text-success fw-bold">
                          {student.full_name} | {student.email} |{" "}
                          {student.mobile}
                        </span>
                      ) : (
                        <span className="text-muted">
                          {" "}
                          Please enter the student's email and click "Find
                          Student".
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="student-email"
                      className="form-label fw-medium"
                    >
                      ISBN Number or Book Title{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        value={bookQuery}
                        required
                        placeholder="e.g. Python for Beginner"
                        onChange={(e) => setBookQuery(e.target.value)}
                        // onClick={handleFetchBook}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleFetchBook}
                      >
                        {loading ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          <i className="fa-solid fa-search"></i>
                        )}
                      </button>
                    </div>
                    <div className="mt-2 small">
                      {book ? (
                        <span className="text-success fw-bold">
                          {book.title} | (ISBN: {book.isbn}) - QTY:{" "}
                          {book.quantity}
                        </span>
                      ) : (
                        <span className="text-muted">
                          {" "}
                          Please enter the book ISBN or title and click "Find
                          Book".
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="form-label small fw-medium">
                      Remark <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="e.g. Issued for 7 days, handle with care, etc.."
                      value={remark}
                      rows={3}
                      required
                      onChange={(e) => setRemark(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm"></span>
                        Issue Book
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-book-open me-1"></i> Issue
                        Book
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-3">
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#eef2ff",
                      color: "#4f46e5",
                    }}
                    className="rounded-circle d-inline-flex align-items-center justify-content-center me-3"
                  >
                    <i className="fa-solid fa-user-graduate"></i>
                  </div>
                  <div>
                    <div className="small text-muted">Student</div>
                    <div className="fw-semibold">
                      {student ? student.full_name : "No student selected"}
                    </div>
                    {student && (
                      <div className="text-muted small">{student.email}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="card border-0 shadow-sm rounded-4 mt-3">
              <div className="card-body p-3">
                <div className="d-flex">
                  {book && book.cover_image ? (
                    <img
                      src={`http://127.0.0.1:8000${book.cover_image}`}
                      className="rounded me-3"
                      alt={book.title}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="rounded me-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "70px",
                        height: "70px",
                        background: "#f3f4f6",
                      }}
                    >
                      <i className="fa-solid fa-book text-muted"></i>
                    </div>
                  )}
                  <div>
                    <div className="small text-muted">Book</div>
                    <div className="fw-semibold">
                      {book ? book.title : "No book selected"}
                    </div>
                    {book && (
                      <div className="text-muted small">
                        ISBN: {book.isbn} - QTY: {book.quantity}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueBook;
