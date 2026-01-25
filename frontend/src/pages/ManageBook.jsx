import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "../config/api.js";

function ManageBook() {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    isbn: "",
    price: "",
    cover_image: null,
    is_issued: false,
    quantity: 0,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchAll() {
    setLoadingList(true);
    try {
      const [authorRes, categoriesRes, bookRes] = await Promise.all([
        axios.get(`${BASE_API}/admin/author/`),
        axios.get(`${BASE_API}/admin/category/`),
        axios.get(`${BASE_API}/admin/book/`),
      ]);
      console.log("Author: ", bookRes.data.books);
      setAuthors(authorRes.data.authors);
      setCategories(categoriesRes.data.category);
      setBooks(bookRes.data.books);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingList(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const submitData = new FormData();
      console.log("ID: ", id);
      submitData.append("book_id", String(id));
      submitData.append("title", formData.title);
      submitData.append("category", formData.category);
      submitData.append("author", formData.author);
      submitData.append("price", formData.price);
      submitData.append("is_issued", formData.is_issued);
      submitData.append("quantity", formData.quantity);
      // submitData.append("cover_image", formData.cover_image);
      // Only append cover_image if it's a File object (new upload)
      if (formData.cover_image instanceof File) {
        submitData.append("cover_image", formData.cover_image);
      }
      console.log("Form Data: ", submitData);

      const res = await axios.patch(`${BASE_API}/admin/book/`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("RESULT: ", res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        handleCancelEdit();
        await fetchAll();
      }
    } catch (error) {
      console.log("ERROR: ", error);
      const message = error.response.data.message;
      toast.error(message || "Something went wrong!");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(bookId) {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    const findOutBookId = books.find((book) => book.uid === bookId);
    console.log(findOutBookId);
    try {
      const res = await axios.delete(`${BASE_API}/admin/book/`, {
        data: { book_id: findOutBookId.uid },
      });
      console.log("RESULT: ", res.data.message);
      if (res.data.success) {
        toast.success(res.data.message);
        console.log("BOOKS: ", books);
        setBooks((prev) =>
          prev.filter((book) => book.uid !== findOutBookId.uid)
        );
        if (id == bookId) {
          handleCancelEdit();
        }
      }
    } catch (error) {
      console.log("ERROR: ", error);
      const message = error.response.data.message;
      toast.error(message || "Something went wrong!");
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, cover_image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleEdit(book) {
    setId(book.uid);
    setFormData({
      title: book.title,
      category: book.category,
      author: book.author,
      isbn: book.isbn,
      price: book.price,
      cover_image: book.cover_image,
      is_issued: book.is_issued,
      quantity: book.quantity,
    });
    setImagePreview(`http://127.0.0.1:8000${book.cover_image}`);
  }

  function handleCancelEdit() {
    setId(null);
    setFormData({
      title: "",
      category: "",
      author: "",
      isbn: "",
      price: "",
      cover_image: null,
      is_issued: false,
      quantity: 0,
    });
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
                Manage Books
              </h4>
              <p className="text-muted small">
                View, edit and delete books from the library system.
              </p>
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/admin/add-book")}
            >
              <i className="fa-solid fa-plus me-1"></i> Add Book
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="row">
          {/* Form */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h6 className="mb-3 fw-semibold">
                  {id ? "Edit Book" : "Select a book to edit"}
                </h6>

                {id ? (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3">
                      <div className="col-md-12">
                        <div className="mb-1">
                          <label
                            htmlFor="title"
                            className="form-label small fw-medium"
                          >
                            Book Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={formData.title}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                title: e.target.value,
                              })
                            }
                            placeholder="e.g. Python for Beginners"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="category"
                            className="form-label small fw-medium"
                          >
                            Category
                          </label>
                          <select
                            className="form-select"
                            name="category"
                            id="category"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                category: e.target.value,
                              })
                            }
                            required
                            value={formData.category}
                          >
                            <option value="">-- Select Category --</option>
                            {categories.map((category) => (
                              <option key={category.uid} value={category.uid}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="author"
                            className="form-label small fw-medium"
                          >
                            Author
                          </label>
                          <select
                            className="form-select"
                            name="author"
                            id="author"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                author: e.target.value,
                              })
                            }
                            required
                            value={formData.author}
                          >
                            <option value="">-- Select Author --</option>
                            {authors.map((author) => (
                              <option key={author.uid} value={author.uid}>
                                {author.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="price"
                            className="form-label small fw-medium"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="price"
                            value={formData.price}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                price: e.target.value,
                              })
                            }
                            min={0}
                            step={0.01}
                            placeholder="e.g. 199.99"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="quantity"
                            className="form-label small fw-medium"
                          >
                            Quantity
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            value={formData.quantity}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                quantity: e.target.value,
                              })
                            }
                            placeholder="e.g. 2"
                            required
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="cover_image"
                            className="form-label small fw-medium"
                          >
                            Book Cover
                          </label>
                          {imagePreview && (
                            <div className="mb-2">
                              <img
                                src={imagePreview}
                                alt="Cover Preview"
                                className="img-fluid rounded"
                                style={{ maxWidth: "100px", height: "70px" }}
                              />
                            </div>
                          )}
                          <input
                            type="file"
                            className="form-control"
                            accept="images/*"
                            id="cover_image"
                            onChange={handleImageChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <button
                          type="submit"
                          disabled={saving}
                          className="btn btn-primary w-50"
                        >
                          {saving ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <i className="fa-solid fa-plus me-2"></i>
                              Update
                            </>
                          )}
                        </button>
                        <button
                          type="submit"
                          onClick={handleCancelEdit}
                          className="btn btn-secondary w-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <p className="text-muted small">
                    Click on the <strong>Edit</strong> button in the table to
                    modify a author.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="col-md-8">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h6 className="fw-semibold mb-3">Books Listing</h6>
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary"></div>
                  </div>
                ) : books.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                      <thead className="small text-muted">
                        <tr>
                          <th>#</th>
                          <th>Book</th>
                          <th>Category</th>
                          <th>Author</th>
                          <th>ISBN</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((book, index) => (
                          <tr key={book.uid}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={`http://127.0.0.1:8000${book.cover_image}`}
                                className="img-fluid rounded"
                                style={{ maxWidth: "100px", height: "auto" }}
                                alt={book.title}
                              />
                              <p className="mt-2 text-start small fw-semibold">
                                {book.title}
                              </p>
                            </td>
                            <td>{book.category_name}</td>
                            <td>{book.author_name}</td>
                            <td>{book.isbn}</td>
                            <td>{book.price}</td>
                            <td>{book.quantity}</td>
                            <td className="text-center">
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEdit(book)}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(book.uid)}
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted small">
                    No books found. Try adding a new one.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageBook;
