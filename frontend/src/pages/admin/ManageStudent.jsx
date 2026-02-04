import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_API } from "../../config/api.js";
import ConfirmModal from "../../components/ConfirmModal.jsx";

function ManageStudent() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  async function fetchStudents() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_API}/admin/students/`);
      console.log(res.data);
      setStudents(res.data.students);
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchStudents();
  }, []);

  function askConfirmation(student) {
    setSelectedStudent(student);
    setShowConfirm(true);
  }

  async function confirmToggleStatus() {
    if (!selectedStudent) return;

    try {
      const res = await axios.post(
        `${BASE_API}/admin/active-inactive-student/${selectedStudent.uid}/`
      );

      fetchStudents();
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update student status");
    } finally {
      setShowConfirm(false);
      setSelectedStudent(null);
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
                Manage Registered Students
              </h4>
              <p className="text-muted small">
                View all registered student, block/unblock them, and open their
                book issue history.
              </p>
            </div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/admin/issue-books")}
            >
              <i className="fa-solid fa-plus me-1"></i> Issue Books
            </button>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            {isLoading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary"></div>
              </div>
            ) : students.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="small text-muted">
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Mobile No.</th>
                      <th>Reg Date</th>
                      <th>Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student.uid}>
                        <td>{index + 1}</td>
                        <td>{student.full_name}</td>
                        <td>{student.email}</td>
                        <td>{student.mobile}</td>
                        <td>
                          {new Date(student.created_at).toLocaleDateString()}
                        </td>
                        <td>
                          {student.is_active ? (
                            <span className="badge bg-success-subtle text-success">
                              Active
                            </span>
                          ) : (
                            <span className="badge bg-secondary-subtle text-dark">
                              Inactive
                            </span>
                          )}
                        </td>
                        <td className="text-center">
                          <button
                            className={`btn btn-sm ${
                              student.is_active
                                ? "btn-outline-danger"
                                : "btn-outline-success"
                            } me-2`}
                            onClick={() => askConfirmation(student)}
                          >
                            <i
                              className={`fa-solid ${
                                student.is_active
                                  ? "fa-user-lock"
                                  : "fa-user-check"
                              }`}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted small">No registered students found!</p>
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={showConfirm}
        title={
          selectedStudent?.is_active ? "Block Student?" : "Activate Student?"
        }
        message={
          selectedStudent?.is_active
            ? "Are you sure you want to block this student? They will lose access."
            : "Are you sure you want to activate this student?"
        }
        confirmText={selectedStudent?.is_active ? "Block" : "Activate"}
        onConfirm={confirmToggleStatus}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedStudent(null);
        }}
      />
    </div>
  );
}

export default ManageStudent;
