import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const user = localStorage.getItem("adminUser");

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default AdminProtectedRoute;
