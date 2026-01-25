import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_API } from "../config/api.js";
import { useNavigate } from "react-router-dom";

function AddBook() {
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
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDropdown, setLoadingDropdown] = useState(false);

  async function fetchDropdownData() {
    setLoadingDropdown(true);
    try {
      const [authorRes, categoryRes] = await Promise.all([
        axios.get(`${BASE_API}/admin/author/`),
        axios.get(`${BASE_API}/admin/category/`),
      ]);

      const categories = categoryRes.data.category || [];
      const activeCategories = categories.filter(
        (category) => category.is_active
      );
      setAuthors(authorRes.data.authors);
      setCategories(activeCategories);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load authors/categories!");
    } finally {
      setLoadingDropdown(false);
    }
  }
  useEffect(() => {
    fetchDropdownData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(); // Create FormData object for multipart/form-data
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("author", formData.author);
    data.append("isbn", formData.isbn);
    data.append("price", formData.price);
    data.append("cover_image", formData.cover_image);
    data.append("is_issued", formData.is_issued);
    data.append("quantity", formData.quantity);

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_API}/admin/book/`, data);
      if (res.data.success) {
        toast.success(res.data.message || "Book added Successfully!");
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
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
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
          <div className="col-md-8 mx-auto text-center">
            <h4 className="fw-semibold mb-1">
              <i className="fa-solid fa-book text-primary me-2"></i>
              Add Book
            </h4>
            <p className="text-muted small">
              Create new book by filling the form below.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="row justify-content-center">
          {/* Form */}
          <div className="col-md-10">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                {loadingDropdown ? (
                  <div className="text-center my-5">
                    <span className="spinner-border text-primary"></span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="mb-3">
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
                    </div>

                    <div className="row g-3">
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
                            htmlFor="isbn"
                            className="form-label small fw-medium"
                          >
                            ISBN Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="isbn"
                            value={formData.isbn}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                isbn: e.target.value,
                              })
                            }
                            placeholder="Unique ISBN"
                            required
                          />
                          <p className="text-muted small mb-0">
                            ISBN must be unique for each book
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-4">
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
                      <div className="col-md-4">
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
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label
                            htmlFor="cover_image"
                            className="form-label small fw-medium"
                          >
                            Book Cover
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            accept="images/*"
                            id="cover_image"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cover_image: e.target.files[0],
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-plus me-2"></i>
                            Add Book
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
