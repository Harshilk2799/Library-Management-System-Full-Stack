import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "../config/api.js";

function ManageAuthor() {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchAuthors() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_API}/admin/author/`);
      console.log(res.data);
      setAuthors(res.data.authors);
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchAuthors();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await axios.patch(`${BASE_API}/admin/author/`, {
        author_id: id,
        name: name,
      });
      console.log("RESULT: ", res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        handleCancelEdit();
        fetchAuthors();
      }
    } catch (error) {
      console.log("ERROR: ", error);
      const message = error.response.data.message;
      toast.error(message || "Something went wrong!");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(authorId) {
    if (!window.confirm("Are you sure you want to delete this author?")) return;

    const findOutAuthorId = authors.find((author) => author.uid === authorId);
    console.log(findOutAuthorId);

    try {
      const res = await axios.delete(`${BASE_API}/admin/author/`, {
        data: { author_id: findOutAuthorId.uid },
      });
      console.log("RESULT: ", res.data.message);
      if (res.data.success) {
        toast.success(res.data.message);
        setAuthors((prev) =>
          prev.filter((author) => author.uid !== findOutAuthorId.uid)
        );
      }
    } catch (error) {
      console.log("ERROR: ", error);
      const message = error.response.data.message;
      toast.error(message || "Something went wrong!");
    }
  }

  function handleEdit(author) {
    setId(author.uid);
    setName(author.name);
  }

  function handleCancelEdit() {
    setId(null);
    setName("");
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
                Manage Author
              </h4>
              <p className="text-muted small">
                View, edit and delete authors from the library system.
              </p>
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/admin/add-author")}
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
                  {id ? "Edit Author" : "Select a author to edit"}
                </h6>

                {id ? (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                      <label
                        htmlFor="name"
                        className="form-label small fw-medium"
                      >
                        Author Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Harshil Khatri"
                        required
                      />
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
                <h6 className="fw-semibold mb-3">Authors Listing</h6>
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary"></div>
                  </div>
                ) : authors.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead className="small text-muted">
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Created</th>
                          <th>Updated</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {authors.map((author, index) => (
                          <tr key={author.uid}>
                            <td>{index + 1}</td>
                            <td>{author.name}</td>
                            <td>
                              {new Date(author.created_at).toLocaleDateString()}
                            </td>
                            <td>
                              {new Date(author.updated_at).toLocaleDateString()}
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEdit(author)}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(author.uid)}
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
                    No authors found. Try adding a new one.
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

export default ManageAuthor;
