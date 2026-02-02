import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API } from "../../config/api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function StudentBooks() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_API}/user/book/list/`);
        console.log(res.data.books);
        setBooks(res.data.books);
        setFiltered(res.data.books);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch books!");
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    const searchText = search.trim().toLowerCase();
    if (!searchText) {
      setFiltered(books);
      return;
    }
    const filteredBooks = books.filter(
      (book) =>
        book?.title?.toLowerCase().includes(searchText) ||
        book?.author_name?.toLowerCase().includes(searchText) |
          book?.isbn?.toLowerCase().includes(searchText)
    );
    setFiltered(filteredBooks);
  }, [search, books]);
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
                <i className="fa-solid fa-book text-primary"></i>
              </span>
              <span>Available Books</span>
            </h3>
            <p className="text-muted">
              Explore all books in the library catalogue with their quantity and
              availability.
            </p>
          </div>
          <div className="mt-3">
            <div className="input-group">
              <span className="input-group-text bg-white border-0">
                <i className="fa-solid fa-magnifying-glass text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search by title, author or ISBN"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary"></div>
            <span className="mt-3 text-muted">Loading...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center my-5">
            <i className="fa-solid fa-book-open-reader fa-3x text-muted"></i>
            <p className="mt-3 text-muted">No books found.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filtered.map((bookInfo) => (
              <div className="col-md-4" key={bookInfo.uid}>
                <div className="card border-0 shadow-sm h-100 rounded-4">
                  <div className="card-body d-flex flex-column">
                    <div
                      className="bg-light d-flex align-items-center justify-content-center mb-3"
                      style={{ height: "200px" }}
                    >
                      <img
                        src={`http://127.0.0.1:8000${bookInfo.cover_image}`}
                        alt={bookInfo.title}
                        style={{ maxWidth: "380px", objectFit: "contain" }}
                      />
                    </div>
                    <h6 className="mb-1 text-truncate">{bookInfo.title}</h6>
                    <p className="mb-2 text-muted small">
                      <i className="fa-solid fa-user-pen me-1"></i>
                      {bookInfo.author_name}
                    </p>
                    <p className="small mb-1">
                      <span className="badge text-primary border border-primary-subtle">
                        <i className="fa-solid fa-tag"></i>
                        {bookInfo.category_name}
                      </span>
                    </p>
                    <p className="mb-1 small text-muted">
                      <i className="fa-solid fa-barcode"></i> ISBN:
                      {bookInfo.isbn}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <span className="fw-semibold text-success">
                        ₹ {bookInfo.price}
                      </span>
                      <span
                        className={`badge px-3 py-2 rounded-pill ${
                          bookInfo.available_quantity > 0
                            ? "bg-success-subtle text-success border border-success-subtle"
                            : "bg-danger-subtle text-danger border border-danger-subtle"
                        }`}
                      >
                        {bookInfo.available_quantity > 0
                          ? `Available (${bookInfo.available_quantity})`
                          : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentBooks;
