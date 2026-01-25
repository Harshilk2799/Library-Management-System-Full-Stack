import uuid
from django.db import models

class BaseModel(models.Model):
    uid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, max_length=36)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(BaseModel):
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    
class Author(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class Student(BaseModel):
    student_id = models.CharField(max_length=255, unique=True)
    full_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    mobile = models.CharField(max_length=15)
    password = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.student_id} - {self.full_name}"
    
class Book(BaseModel):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    author = models.ForeignKey(Author, on_delete=models.PROTECT)
    isbn = models.CharField(max_length=255, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    cover_image = models.ImageField(upload_to="Book_Covers/", null=True, blank=True)
    is_issued = models.BooleanField(default=False)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.title} - {self.isbn}"
    
class IssuedBook(BaseModel):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    issued_at = models.DateTimeField(auto_now_add=True)
    returned_at = models.DateTimeField(null=True, blank=True)
    is_returned = models.BooleanField(default=False)
    fine = models.PositiveIntegerField(default=0)
    remark = models.TextField()

    def __str__(self):
        return f"{self.book.title} - {self.student.student_id}"