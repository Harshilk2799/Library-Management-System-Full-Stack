import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AdminLogin from "./pages/admin/AdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCategory from "./pages/admin/AddCategory";
import ManageCategory from "./pages/admin/ManageCategory";
import AdminProtectedRoute from "./pages/auth/AdminProtectedRoute";
import AddAuthor from "./pages/admin/AddAuthor";
import ManageAuthor from "./pages/admin/ManageAuthor";
import AddBook from "./pages/admin/AddBook";
import ManageBook from "./pages/admin/ManageBook";
import AdminChangePassword from "./pages/admin/AdminChangePassword";
import UserSignup from "./pages/student/UserSignup";
import UserLogin from "./pages/student/UserLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProtectedRoute from "./pages/auth/StudentProtectedRoute";
import StudentBooks from "./pages/student/StudentBooks";
import StudentProfile from "./pages/student/StudentProfile";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={2000} />
      <Header />
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin/add-category"
          element={
            <AdminProtectedRoute>
              <AddCategory />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-category"
          element={
            <AdminProtectedRoute>
              <ManageCategory />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/add-author"
          element={
            <AdminProtectedRoute>
              <AddAuthor />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-author"
          element={
            <AdminProtectedRoute>
              <ManageAuthor />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/add-book"
          element={
            <AdminProtectedRoute>
              <AddBook />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-book"
          element={
            <AdminProtectedRoute>
              <ManageBook />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/change-password"
          element={
            <AdminProtectedRoute>
              <AdminChangePassword />
            </AdminProtectedRoute>
          }
        />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route
          path="/user/dashboard"
          element={
            <StudentProtectedRoute>
              <StudentDashboard />
            </StudentProtectedRoute>
          }
        />
        <Route
          path="/user/books"
          element={
            <StudentProtectedRoute>
              <StudentBooks />
            </StudentProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <StudentProtectedRoute>
              <StudentProfile />
            </StudentProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
