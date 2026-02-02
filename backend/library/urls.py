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
    path("user/profile/", ProfileAPI.as_view(), name="user-profile")
]