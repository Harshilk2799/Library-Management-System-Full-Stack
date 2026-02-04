from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .serializers import *
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAdminUser, AllowAny
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password

class AdminLoginAPI(APIView):
    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get("username")
            password = serializer.validated_data.get("password")

            user = authenticate(request, username=username, password=password)

            if not user: 
                return Response({"success": False, "message": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
            if not user.is_staff:
                return Response({"success": False, "message": "Admin access only"}, status=status.HTTP_403_FORBIDDEN)
            
            return Response(
                {
                    "success": True,
                    "message": "Login successful!",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email
                    }
                }, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CategoryAPI(APIView):
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "message": "Category has been added!", "category": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response({"success": True, "category": serializer.data}, status=status.HTTP_200_OK) 
    
    def patch(self, request):
        category_id = request.data.get("category_id")
        category = get_object_or_404(Category, uid=category_id)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "message": "Category updated successfully!"}, status=status.HTTP_200_OK)
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST  )

    def delete(self, request):
        print("DATA: ", request.data)
        category = get_object_or_404(Category, uid=request.data.get("category_id"))
        category.delete()
        return Response({"success": True, "message": "Delete Successfully!"}, status=status.HTTP_200_OK)


class AuthorAPI(APIView):
    def post(self, request):
        serializer = AuthorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "message": "Author has been added!", "author": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request):
        authors = Author.objects.all()
        serializer = AuthorSerializer(authors, many=True)
        return Response({"success": True, "authors": serializer.data}, status=status.HTTP_200_OK) 
    
    def patch(self, request):
        author_id = request.data.get("author_id")
        author = get_object_or_404(Author, uid=author_id)
        serializer = AuthorSerializer(author, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "message": "Author updated successfully!"}, status=status.HTTP_200_OK)
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        author = get_object_or_404(Author, uid=request.data.get("author_id"))
        author.delete()
        return Response({"success": True, "message": "Delete Successfully!"}, status=status.HTTP_200_OK)

class BookAPI(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    def get(self, request):
        books = Book.objects.select_related("category", "author").all()
        serializer = BookSerializer(books, many=True)
        return Response({"success": True, "books": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        try:
            category_id = request.data.get("category")
            if not category_id:
                return Response({"success": False, "message": "category is required"}, status=status.HTTP_400_BAD_REQUEST)
            category = get_object_or_404(Category, uid=category_id)

            author_id = request.data.get("author")
            if not author_id:
                return Response({"success": False, "message": "author is required"}, status=status.HTTP_400_BAD_REQUEST)
            author = get_object_or_404(Author, uid=author_id)

            # Check if ISBN already exists
            isbn = request.data.get("isbn")
            if isbn and Book.objects.filter(isbn=isbn).exists():
                return Response({"success": False, "message": "Book with this ISBN already exists, please use a different ISBN."}, status=status.HTTP_400_BAD_REQUEST)

            serializer = BookSerializer(data=request.data)
            if serializer.is_valid():
                book = serializer.save(category=category, author=author)
                return Response({"success": True, "data": BookSerializer(book).data, "message": "Book has been added successfully!"}, status=status.HTTP_201_CREATED)
            return Response({"success": False, "message": "Validation failed", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"success": False, "message": "An error occurred while creating the book", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def patch(self, request):
        print(request.data)
        book_id = request.data.get("book_id")
        if not book_id:
            return Response({"success": False, "message": "book_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        book = get_object_or_404(Book, uid=book_id)

        try:
           
            category_id = request.data.get("category")
            if not category_id:
                return Response({"success": False, "message": "category is required"}, status=status.HTTP_400_BAD_REQUEST)
            category = get_object_or_404(Category, uid=category_id)

            author_id = request.data.get("author")
            if not author_id:
                return Response({"success": False, "message": "author is required"}, status=status.HTTP_400_BAD_REQUEST)
            author = get_object_or_404(Author, uid=author_id)

            # Check if ISBN already exists
            isbn = request.data.get("isbn")
            if isbn and Book.objects.filter(isbn=isbn).exclude(uid=book.uid).exists():
                return Response({"success": False, "message": "Book with this ISBN already exists, please use a different ISBN."}, status=status.HTTP_400_BAD_REQUEST)

            serializer = BookSerializer(book, data=request.data, partial=True)
            if serializer.is_valid():
                book = serializer.save(category=category, author=author)
                return Response({"success": True, "data": BookSerializer(book).data, "message": "Book has been updated successfully!"}, status=status.HTTP_201_CREATED)
            return Response({"success": False, "message": "Validation failed", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"success": False, "message": "An error occurred while updating the book", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def delete(self, request):
        book = get_object_or_404(Book, uid=request.data.get("book_id"))
        book.delete()
        return Response({"success": True, "message": "Delete Successfully!"}, status=status.HTTP_200_OK)
  
class AdminChangePassword(APIView):
    def post(self, request):
        username = request.data.get("username")
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if new_password != confirm_password:
            return Response({"success": False, "message": "New password and confirm password do not match."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(username=username, is_staff=True)
        except User.DoesNotExist:
            return Response({"success": False, "message": "Admin user does not exist."}, status=status.HTTP_404_NOT_FOUND)

        if not user.check_password(current_password):
            return Response({"success": False, "message": "Current password is incorrect."}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            validate_password(new_password, user)
        except ValidationError as e:
            return Response({"success": False, "errors": e.messages}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save(update_fields=["password"])

        return Response({"success": True, "message": "Password changed successfully."}, status=status.HTTP_200_OK)
    
class StudentRegistrationAPI(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "message": "Student registered successfully", "student": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "message": "Registration failed", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    
class StudentLoginAPI(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = StudentLoginSerializer(data=request.data)
        if serializer.is_valid():

            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")
            
            try:
                student = Student.objects.get(email=email, is_active=True)
                if check_password(password, student.password):
                    return Response({"success": True, "message": "Login Successful!", "student_id": student.uid, "student_name": student.full_name}, status=status.HTTP_200_OK)
                else:
                    return Response({"errors":{"non_field_errors":["Email or Password is not valid!!!"]}}, status=status.HTTP_401_UNAUTHORIZED)
            except Student.DoesNotExist:
                return Response({"success": False, "errors":{"non_field_errors":["Email or Password is not valid!!!"]}})
        return Response({"success": False, "message": "Login failed", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class StudentStats(APIView):
    def get(self, request):
        student_id = request.query_params.get("student_id")
        try:
            student = Student.objects.get(uid=student_id)
        except Student.DoesNotExist:
            return Response({"success": False, "message": "Student not found!"}, status=status.HTTP_404_NOT_FOUND)

        total_books = Book.objects.count()
        total_issued = IssuedBook.objects.filter(student=student).count()
        not_returned = IssuedBook.objects.filter(student=student, is_returned=False).count()

        stats = {
            "total_books": total_books,
            "total_issued": total_issued,
            "not_returned": not_returned
        }
        return Response({"success": True, "stats": stats}, status=status.HTTP_200_OK)
    
class BookListAPI(APIView):
    def get(self, request):
        books = Book.objects.select_related("category", "author").prefetch_related("issued_records").order_by("title")
        serializer = BookListSerializer(books, many=True)
        return Response({"success": True, "books": serializer.data}, status=status.HTTP_200_OK)

class ProfileAPI(APIView):
    def get_object(self, student_id):
        return get_object_or_404(Student, uid=student_id)
    
    def get(self, request):
        student_id = request.query_params.get("student_id")
        
        if not student_id:
            return Response({"success": False, "message": "student_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        student = self.get_object(student_id)
        serializer = StudentProfileSerializer(student)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request):
        student_id = request.query_params.get("student_id")
        if not student_id:
            return Response({"success": False, "message": "student_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        student = self.get_object(student_id)
        serializer = StudentProfileSerializer(student, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"success": True, "message": "Student profile updated successfully!"}, status=status.HTTP_200_OK)
    

class StudentChangePassword(APIView):
    def get_object(self, student_id):
        return get_object_or_404(Student, uid=student_id)
    
    def post(self, request):
        student_id = request.data.get("student_id")
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")
        
        if not student_id:
            return Response({"success": False, "message": "student_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        if not all([old_password, new_password, confirm_password]):
            return Response({"success": False, "message": "All password fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"success": False, "message": "New Password and confirm password do not match!"}, status=status.HTTP_400_BAD_REQUEST)
        
        if len(new_password) < 8:
            return Response({"success": False, "message": "Password must be at least 8 characters long"}, status=status.HTTP_400_BAD_REQUEST)
        
        student = self.get_object(student_id)

        if not check_password(old_password, student.password):
            return Response({"success": False, "message": "Old password is incorrect!"}, status=status.HTTP_401_UNAUTHORIZED)
        
        student.password = make_password(new_password)
        student.save(update_fields=["password"])
        return Response({"success": True, "message": "Password changed successfully!"}, status=status.HTTP_200_OK)


class RegisteredStudentAPI(APIView):
    def get(self, request):
        students = Student.objects.all()
        serializer = StudentListSerializer(students, many=True)
        return Response({"success": True, "students": serializer.data}, status=status.HTTP_200_OK)

class ActiveInActiveStudentAPI(APIView):
    def post(self, request, student_id):
        student = get_object_or_404(Student, uid=student_id)
        student.is_active = not student.is_active
        student.save()

        message = "Student has been activated!" if student.is_active else "Student has been blocked!"
        return Response({"success": True, "message": message, "student": StudentListSerializer(student).data}, status=status.HTTP_200_OK)