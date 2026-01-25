from django.urls import path
from library.views import *

urlpatterns = [
    path("admin/login/", AdminLoginAPI.as_view(), name="admin-login"),
    path("admin/category/", CategoryAPI.as_view(), name="category"),
    path("admin/author/", AuthorAPI.as_view(), name="author"),
    path("admin/book/", BookAPI.as_view(), name="book"),
    path("admin/change-password/", AdminChangePassword.as_view(), name="change-password")
]