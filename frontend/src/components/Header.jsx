import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("adminUser"));
  const [studentUser, setStudentUser] = useState(
    localStorage.getItem("studentUserInfo")
  );

  function handleAdminLogout() {
    localStorage.removeItem("adminUser");
    setUser(null);
    navigate("/admin/login");
  }
  function handleStudentLogout() {
    localStorage.removeItem("studentUserInfo");
    setUser(null);
    navigate("/user/login");
  }

  useEffect(() => {
    setUser(localStorage.getItem("adminUser"));
    setStudentUser(localStorage.getItem("studentUserInfo"));
  }, [location]);

  function isActive(path) {
    return location.pathname === path ? "active text-primary fw-semibold" : "";
  }
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="#">
          <span
            className="rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "blue",
              color: "white",
              width: "36px",
              height: "36px",
            }}
          >
            <i className="fa-solid fa-book-open-reader"></i>
          </span>
          <span className="fw-bold">Smart Library</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!user && !studentUser && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/")}`} to="/">
                    <i className="fa-solid fa-home me-1"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/user/login")}`}
                    to="/user/login"
                  >
                    <i className="fa-solid fa-user me-1"></i> User Login
                  </Link>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${isActive("/user/signup")}`}
                    to="/user/signup"
                  >
                    <i className="fa-solid fa-user-plus me-1"></i> User SignUp
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/admin/login">
                    <i className="fa-solid fa-shield-halved me-1"></i> Admin
                    Login
                  </Link>
                </li>
              </>
            )}

            {/* Admin */}
            {user && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/admin/dashboard")}`}
                    to="/admin/dashboard"
                  >
                    <i className="fa-solid fa-gauge-high me-1"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa-solid fa-layer-group me-1"></i> Categories
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/admin/add-category">
                        <i className="fa-solid fa-plus me-1"></i> Add Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/admin/manage-category"
                      >
                        <i className="fa-solid fa-list me-1"></i> Manage
                        Category
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa-solid fa-user-pen me-1"></i> Authors
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/admin/add-author">
                        <i className="fa-solid fa-plus me-1"></i> Add Author
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/manage-author">
                        <i className="fa-solid fa-list me-1"></i> Manage Author
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa-solid fa-book me-1"></i> Books
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/admin/add-book">
                        <i className="fa-solid fa-plus me-1"></i> Add Book
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/manage-book">
                        <i className="fa-solid fa-list me-1"></i> Manage Book
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/add-category">
                        <i className="fa-solid fa-arrow-right-arrow-left me-1"></i>{" "}
                        Issued Book
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/admin/dashboard")}`}
                    to="/admin/dashboard"
                  >
                    <i className="fa-solid fa-right-from-bracket me-1"></i>
                    Issue Book
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/admin/dashboard")}`}
                    to="/admin/dashboard"
                  >
                    <i className="fa-solid fa-users me-1"></i>
                    Student
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/admin/change-password")}`}
                    to="/admin/change-password"
                  >
                    <i className="fa-solid fa-key me-1"></i>
                    Change Password
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleAdminLogout}
                    className="btn btn-outline-danger"
                  >
                    <i className="fa-solid fa-right-from-bracket me-1"></i>
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Admin */}
            {studentUser && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/user/dashboard")}`}
                    to="/user/dashboard"
                  >
                    <i className="fa-solid fa-gauge me-1"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/user/books")}`}
                    to="/user/books"
                  >
                    <i className="fa-solid fa-book-open me-1"></i> My Library
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/user/issued-books")}`}
                    to="/user/issued-books"
                  >
                    <i className="fa-solid fa-receipt me-1"></i> Issued Books
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa-solid fa-circle-user me-1"></i> My Account
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/user/profile">
                        <i className="fa-solid fa-id-badge me-1"></i> Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/user/change-password"
                      >
                        <i className="fa-solid fa-key me-1"></i> Change Password
                      </Link>
                    </li>
                    <hr className="dropdown-divider" />
                    <li>
                      <button
                        onClick={handleStudentLogout}
                        className="dropdown-item text-danger"
                      >
                        <i className="fa-solid fa-right-from-bracket me-1"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
