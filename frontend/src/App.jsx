import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import AdminProtectedRoute from "./pages/auth/AdminProtectedRoute";
import StudentProtectedRoute from "./pages/auth/StudentProtectedRoute";
import IssuedBookDetails from "./pages/admin/IssuedBookDetails";

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AddCategory = lazy(() => import("./pages/admin/AddCategory"));
const ManageCategory = lazy(() => import("./pages/admin/ManageCategory"));
const AddAuthor = lazy(() => import("./pages/admin/AddAuthor"));
const ManageAuthor = lazy(() => import("./pages/admin/ManageAuthor"));
const AddBook = lazy(() => import("./pages/admin/AddBook"));
const ManageBook = lazy(() => import("./pages/admin/ManageBook"));
const AdminChangePassword = lazy(() =>
  import("./pages/admin/AdminChangePassword")
);
const StudentHistory = lazy(() => import("./pages/admin/StudentHistory"));
const IssueBook = lazy(() => import("./pages/admin/IssueBook"));
const ManageIssuedBook = lazy(() => import("./pages/admin/ManageIssuedBook"));
const UserSignup = lazy(() => import("./pages/student/UserSignup"));
const UserLogin = lazy(() => import("./pages/student/UserLogin"));
const StudentDashboard = lazy(() => import("./pages/student/StudentDashboard"));
const StudentBooks = lazy(() => import("./pages/student/StudentBooks"));
const StudentProfile = lazy(() => import("./pages/student/StudentProfile"));
const StudentChangePassword = lazy(() =>
  import("./pages/student/StudentChangePassword")
);
const ManageStudent = lazy(() => import("./pages/admin/ManageStudent"));
const StudentIssuedBook = lazy(() =>
  import("./pages/student/StudentIssuedBook")
);

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={2000} />
      <Header />
      <Suspense fallback={<Loader />}>
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
          <Route
            path="/admin/manage-students"
            element={
              <AdminProtectedRoute>
                <ManageStudent />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/issue-book"
            element={
              <AdminProtectedRoute>
                <IssueBook />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-issue-book"
            element={
              <AdminProtectedRoute>
                <ManageIssuedBook />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/issued-book/:issued_id"
            element={
              <AdminProtectedRoute>
                <IssuedBookDetails />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/students/:studentId/history"
            element={
              <AdminProtectedRoute>
                <StudentHistory />
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
            path="/user/issued-books"
            element={
              <StudentProtectedRoute>
                <StudentIssuedBook />
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
          <Route
            path="/user/change-password"
            element={
              <StudentProtectedRoute>
                <StudentChangePassword />
              </StudentProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
