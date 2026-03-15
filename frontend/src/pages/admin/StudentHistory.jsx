import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_API } from "../../config/api.js";

function StudentHistory() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [issuesBooks, setIssuesBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_API}/admin/student-issue-history/${studentId}/`
        );
        setStudent(res.data.student);
        setIssuesBooks(res.data.books);
      } catch (error) {
        toast.error("Failed to load student/book info.");
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
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
                <i className="fa-solid fa-book text-primary me-2"></i>
                Book Issued History
              </h4>
              <p className="text-muted small">
                {student ? (
                  <span>
                    History of{" "}
                    <strong>{`${student.full_name} - ${student.email} - ${student.mobile}`}</strong>
                  </span>
                ) : (
                  "Loading Student Detail..."
                )}
              </p>
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/admin/manage-students")}
            >
              Back to Student
            </button>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary"></div>
              </div>
            ) : issuesBooks.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="small text-muted">
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Issued Book</th>
                      <th>Issued Date</th>
                      <th>Returned Date</th>
                      <th>Fine</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issuesBooks.map((stu, index) => (
                      <tr key={stu.uid}>
                        <td>{index + 1}</td>
                        <td>{student.full_name}</td>
                        <td>{stu.book_title}</td>
                        <td>{new Date(stu.issued_at).toLocaleDateString()}</td>
                        <td>
                          {stu.is_returned ? (
                            new Date(stu.returned_at).toLocaleDateString()
                          ) : (
                            <span>Not returned yet!</span>
                          )}
                        </td>
                        <td>{stu.fine}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted small">
                No issued books found for this student!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHistory;
