import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_API } from "../../config/api.js";

function AddAuthor() {
  const [name, setName] = useState("");
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchAuthors() {
    try {
      const res = await axios.get(`${BASE_API}/admin/author/`);
      console.log(res.data);
      setAuthors(res.data.authors);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }
  useEffect(() => {
    fetchAuthors();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_API}/admin/author/`, {
        name: name,
      });
      console.log("RESULT: ", res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        setName("");
        fetchAuthors();
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
              <i className="fa-solid fa-user-pen text-primary me-2"></i>
              Add Author
            </h4>
            <p className="text-muted small">
              Create new book authors and manage their details
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
                      Author Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Harshil Khatri, Harsh Trivedi..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-100"
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-plus me-2"></i>
                        Add Author
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
                <h6 className="fw-semibold mb-3">Existing Authors</h6>

                {authors.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Created</th>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted small">
                    No authors found! Add your first author from the form.
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

export default AddAuthor;
