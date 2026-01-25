import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("adminUser");

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
