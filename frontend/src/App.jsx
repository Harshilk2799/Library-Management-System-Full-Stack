import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AdminLogin from "./pages/AdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/AdminDashboard";
import AddCategory from "./pages/AddCategory";
import ManageCategory from "./pages/ManageCategory";
import ProtectedRoute from "./pages/ProtectedRoute";
import AddAuthor from "./pages/AddAuthor";
import ManageAuthor from "./pages/ManageAuthor";
import AddBook from "./pages/AddBook";
import ManageBook from "./pages/ManageBook";
import AdminChangePassword from "./pages/AdminChangePassword";

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
            <ProtectedRoute>
              <AddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-category"
          element={
            <ProtectedRoute>
              <ManageCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-author"
          element={
            <ProtectedRoute>
              <AddAuthor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-author"
          element={
            <ProtectedRoute>
              <ManageAuthor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-book"
          element={
            <ProtectedRoute>
              <ManageBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/change-password"
          element={
            <ProtectedRoute>
              <AdminChangePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
