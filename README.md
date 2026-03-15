# 📚 Smart Library Management System

A **full-featured Library Management System** built using **Python and Django**.  
The application digitizes library operations by providing separate **Admin** and **Student** panels.

Admins can manage books, authors, categories, and issuing operations, while students can browse books, track issued books, and manage their profiles.

---

# 🚀 Project Overview

The **Smart Library Management System** simplifies traditional library workflows by allowing:

- Digital book catalog management
- Student account management
- Book issuing and return tracking
- Inventory monitoring
- Role-based access (Admin & Student)

This project demonstrates a **complete CRUD-based web application with authentication and dashboard analytics**.

---

# 🧩 System Architecture

```
Library Management System
│
├── Student Panel
│   ├── Signup / Login
│   ├── Dashboard
│   ├── Browse Books
│   ├── Issued Books
│   ├── Profile Management
│   └── Change Password
│
└── Admin Panel
    ├── Admin Login
    ├── Dashboard
    ├── Category Management
    ├── Author Management
    ├── Book Management
    ├── Issue Book
    ├── Manage Issued Books
    └── Change Password
```

---

# 🎓 Student Panel Features

## 1️⃣ Student Registration

Students can create an account using:

- Full Name
- Email
- Mobile Number
- Password
- Confirm Password

Includes validation for secure account creation.

## ![Student Sign Up](Images/StudentPanelImages/StudentSignUp.png)

## 2️⃣ Student Login

Students log in using:

- Email
- Password

After successful login, they are redirected to the **Student Dashboard**.
![Student Login](Images/StudentPanelImages/StudentLogin.png)

---

## 3️⃣ Student Dashboard

Provides a quick overview of student activity.

Displayed statistics:

- 📚 Total Books available
- ⏳ Pending Returns
- 📖 Total Books Issued

Quick navigation:

- View books
- View issue history

![Student Login](Images/StudentPanelImages/StudentDashboard.png)

---

## 4️⃣ Browse Books (Library Catalog)

Students can explore all books available in the library.

Each book card displays:

- Book Cover
- Book Title
- Author
- Category
- ISBN Number
- Price
- Available Quantity

### 🔎 Search Feature

Students can search books using:

- Book Title
- ISBN

![Student Login](Images/StudentPanelImages/AvailableBooks.png)

---

## 5️⃣ Issued Books

Students can track books issued to them.

Displayed information:

- Book Title
- ISBN
- Issue Date
- Return Date
- Fine Amount
- Return Status

Summary cards:

- Total issued books
- Not returned books
- Total fine

![My Issued Books](Images/StudentPanelImages/MyIssuedBook.png)

---

## 6️⃣ Profile Management

Students can update their profile information.

Editable:

- Full Name
- Mobile Number

Read-only:

- Email
  ![Student Profile](Images/StudentPanelImages/StudentProfile.png)

---

## 7️⃣ Change Password

Students can update their password securely.

Fields:

- Old Password
- New Password
- Confirm Password

Features:

- Password validation
- Show / Hide password toggle

![Student Change Password](Images/StudentPanelImages/StudentChangePassword.png)

---

# 🛠 Admin Panel Features

## 🔐 Admin Authentication

Admins log in using secure credentials created via **Django superuser**.

Fields:

- Username
- Password

![Admin Login](Images/AdminPanelImages/AdminLogin.png)

---

## 📊 Admin Dashboard

Provides an overview of library statistics.

Displayed metrics:

- 👨‍🎓 Total Students

  - Active
  - Inactive

- 📚 Total Books

  - Available
  - Out of Stock

- 🔄 Issued Records

  - Issued books
  - Returned books

- 🏷 Categories
- ✍ Authors

![Admin Dashboard](Images/AdminPanelImages/AdminDashboard.png)

---

## 📂 Category Management

Admins can:

- Add categories
- Edit categories
- Delete categories
- Activate / deactivate categories

Example categories:

- Python
- Django
- Machine Learning

![Add Category](Images/AdminPanelImages/AddCategory.png)

![Manage Category](Images/AdminPanelImages/ManageCategory.png)

---

## ✍ Author Management

Admins can manage book authors.

Features:

- Add author
- Update author
- Delete author
- View author list

![Add Author](Images/AdminPanelImages/AddAuthor.png)

![Manage Author](Images/AdminPanelImages/ManageAuthor.png)

---

## 📚 Book Management

Admins manage the library inventory.

Book fields include:

- Book Name
- Category
- Author
- ISBN Number
- Price
- Quantity
- Book Cover Image

Operations:

- Add book
- Edit book
- Delete book
- View books list

![Add Book](Images/AdminPanelImages/AddBook.png)

![Add Book](Images/AdminPanelImages/ManageBooks.png)

---

## 📤 Issue Book

Admins can issue books to students.

Search options:

- Student Email
- Book ISBN
- Book Title

Additional features:

- Issue remarks
- Book availability check
- Automatic quantity update

![Issue New Book](Images/AdminPanelImages/IssueNewBook.png)

---

## 📋 Manage Issued Books

Admins can track issued books.

Displayed fields:

- Student Name
- Book Title
- ISBN
- Issue Date
- Return Status

Admins can:

- View details
- Process book return

![Manage Issued Books](Images/AdminPanelImages/ManageIssueBook.png)

---

## 📖 Issued Book Details

Shows detailed issuing information:

- Student details
- Book details
- Issue date
- Return date
- Fine amount
- Return status

![Issued Book Details](Images/AdminPanelImages/IssuedBookDetails.png)

---

## 🔑 Admin Change Password

Admins can securely update their password.

Fields:

- Current password
- New password
- Confirm password

## ![Admin Change Password](Images/AdminPanelImages/AdminChangePassword.png)

# ⚙️ Key Functionalities

✔ User authentication  
✔ Role-based access control  
✔ Book inventory management  
✔ Category & author management  
✔ Book issuing system  
✔ Issued book tracking  
✔ Book return management  
✔ Student profile management  
✔ Password management

---

# 🛠 Technology Stack

### Backend

- Python
- Django
- Django REST Framework

### Frontend

- HTML
- CSS
- JavaScript
- React
- React Router
- Axios

---
