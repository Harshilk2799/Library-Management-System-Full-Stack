import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "../../config/api.js";

function ManageCategory() {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchCategories() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_API}/admin/category/`);
      console.log(res.data);
      setCategories(res.data.category);
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await axios.patch(`${BASE_API}/admin/category/`, {
        category_id: id,
        name: name,
        is_active: status,
      });
      console.log("RESULT: ", res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        handleCancelEdit();
        fetchCategories();
      }
    } catch (error) {
      console.log("ERROR: ", error);
      const message = error.response.data.message;
      toast.error(message || "Something went wrong!");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(categoryId) {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    const findOutCategoryId = categories.find(
      (category) => category.uid === categoryId
    );

    try {
      const res = await axios.delete(`${BASE_API}/admin/category/`, {
        data: { category_id: findOutCategoryId.uid },
      });
      console.log("RESULT: ", res.data.message);
      if (res.data.success) {
        toast.success(res.data.message);
        setCategories((prev) =>
          prev.filter((category) => category.uid !== findOutCategoryId.uid)
        );
      }
    } catch (error) {
      console.log("ERROR: ", error);
      const message = error.response.data.message;
      toast.error(message || "Something went wrong!");
    }
  }

  function handleEdit(category) {
    setId(category.uid);
    setName(category.name);
    setStatus(category.is_active);
  }

  function handleCancelEdit() {
    setId(null);
    setName("");
    setStatus(true);
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
                Manage Category
              </h4>
              <p className="text-muted small">
                View, edit and delete categories from the library.
              </p>
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/admin/add-category")}
            >
              <i className="fa-solid fa-plus me-1"></i> Add New
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
                  {id ? "Edit Category" : "Select a category to edit"}
                </h6>

                {id ? (
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
                      <label className="form-label small fw-medium">
                        Status
                      </label>
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

                    <div className="d-flex align-items-center gap-3">
                      <button
                        type="submit"
                        disabled={saving}
                        className="btn btn-primary w-50"
                      >
                        {saving ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Updating...
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
                  </form>
                ) : (
                  <p className="text-muted small">
                    Click on the <strong>Edit</strong> button in the table to
                    modify a category.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="col-md-8">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h6 className="fw-semibold mb-3">Categories Listing</h6>
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary"></div>
                  </div>
                ) : categories.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead className="small text-muted">
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Created</th>
                          <th>Updated</th>
                          <th className="text-center">Action</th>
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
                            <td>
                              {new Date(
                                category.updated_at
                              ).toLocaleDateString()}
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEdit(category)}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(category.uid)}
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
                    No categories found. Try adding a new one.
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

export default ManageCategory;
