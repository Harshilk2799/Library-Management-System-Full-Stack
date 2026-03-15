from django.urls import path
from library.views import *

urlpatterns = [
    path("admin/login/", AdminLoginAPI.as_view(), name="admin-login"),
    path("admin/category/", CategoryAPI.as_view(), name="category"),
    path("admin/author/", AuthorAPI.as_view(), name="author"),
    path("admin/book/", BookAPI.as_view(), name="book"),
    path("admin/change-password/", AdminChangePassword.as_view(), name="change-password"),
    path("user/signup/", StudentRegistrationAPI.as_view(), name="user-signup"),
    path("user/login/", StudentLoginAPI.as_view(), name="user-login"),
    path("user/stats/", StudentStats.as_view(), name="user-stats"),
    path("user/book/list/", BookListAPI.as_view(), name="book-list"),
    path("user/profile/", ProfileAPI.as_view(), name="user-profile"),
    path("user/change-password/", StudentChangePassword.as_view(), name="change-password"),
    path("admin/students/", RegisteredStudentAPI.as_view(), name="students"),
    path("admin/active-inactive-student/<uuid:student_id>/", ActiveInActiveStudentAPI.as_view(), name="active-inactive-student"),
    path("admin/students/search-by-email/", StudentSearchProfileAPI.as_view(), name="admin-student-search-by-email"),
    path("admin/books/search/", BookSearchAPI.as_view(), name="admin-book-search"),
    path("admin/issue-book/", IssueBookAPI.as_view(), name="admin-issue-book"),
    path("admin/manage-issue-book/", ManageIssuedBook.as_view(), name="admin-manage-issue-book"),
    path("admin/issue-book-detail/<uuid:issued_id>/", IssuedBookDetailAPI.as_view(), name="admin-issue-book-detail"),
    path("admin/return-book/<uuid:issued_id>/", ReturnBookAPI.as_view(), name="admin-return-book"),
    path("admin/student-issue-history/<uuid:student_id>/", StudentIssueHistoryAPI.as_view(), name="admin-student-issue-history"),
    path("admin/dashboard-stats/", AdminDashboardStatsAPI.as_view(), name="admin-dashboard-stats")
]