import { Navigate } from "react-router-dom";

function StudentProtectedRoute({ children }) {
  const user = localStorage.getItem("studentUserInfo");

  if (!user) {
    return <Navigate to="/user/login" replace />;
  }
  return children;
}

export default StudentProtectedRoute;
