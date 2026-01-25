from django.contrib import admin
from library.models import *

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["uid", "name", "is_active", "created_at", "updated_at"]

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ["name"]

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ["full_name", "email", "mobile", "password", "is_active"]

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ["title", "category__name", "author__name", "isbn", "price", "cover_image", "is_issued", "quantity"]

@admin.register(IssuedBook)
class IssuedBookAdmin(admin.ModelAdmin):
    list_display = ["book__title", "issued_at", "is_returned", "fine", "remark"]