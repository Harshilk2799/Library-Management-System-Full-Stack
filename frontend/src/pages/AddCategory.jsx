import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_API } from "../config/api.js";

function AddCategory() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCategories() {
    try {
      const res = await axios.get(`${BASE_API}/admin/category/`);
      console.log(res.data);
      setCategories(res.data.category);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_API}/admin/category/`, {
        name: name,
        is_active: status,
      });
      console.log("RESULT: ", res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        setName("");
        setStatus(true);
        fetchCategories();
      }
    } catch (error) {
      console.log("ERROR: ", error);
      const message = error.response.data.message;
      toast.error(message || "Something went wrong!");
    } finally {
      setIsLoading(false);
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
              <i className="fa-solid fa-layer-group text-primary me-2"></i>
              Add Category
            </h4>
            <p className="text-muted small">
              Create new book categories and manage their active status
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="row">
          {/* Form */}
          <div className="col-md-5">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="form-label small fw-medium"
                    >
                      Category Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Programming, AI Agent"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-medium">Status</label>
                    <div className="d-flex gap-3">
                      <div className="form-check">
                        <input
                          type="radio"
                          id="active"
                          name="status"
                          className="form-check-input"
                          checked={status === true}
                          onChange={() => setStatus(true)}
                        />
                        <label
                          htmlFor="active"
                          className="form-check-label small"
                        >
                          Active
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          type="radio"
                          id="inactive"
                          name="status"
                          className="form-check-input"
                          checked={status === false}
                          onChange={() => setStatus(false)}
                        />
                        <label
                          htmlFor="inactive"
                          className="form-check-label small"
                        >
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-100"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-plus me-2"></i>
                        Create Category
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="col-md-7">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h6 className="fw-semibold mb-3">Existing Categories</h6>

                {categories.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category, index) => (
                          <tr key={category.uid}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td>
                              {category.is_active ? (
                                <span className="badge bg-success-subtle text-success">
                                  Active
                                </span>
                              ) : (
                                <span className="badge bg-secondary-subtle text-dark">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td>
                              {new Date(
                                category.created_at
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted small">
                    No categories found. Add your first category from the form.
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

export default AddCategory;
