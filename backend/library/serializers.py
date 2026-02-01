from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *

class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["uid","name", "is_active", "created_at", "updated_at"]

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ["uid", "name", "created_at", "updated_at"]

class BookSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.name", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    class Meta:
        model = Book
        fields = ["uid", "title", "category", "author_name", "category_name", "author", "isbn", "price", "cover_image",
                  "is_issued", "quantity"]
        
class StudentSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    class Meta:
        model = Student
        fields = ["uid", "full_name", "email", "mobile", "password", "confirm_password", "is_active"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate_email(self, value):
        if Student.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value
    
    def create(self, validated_data):
        validated_data.pop("confirm_password")
        print("validated data:",validated_data)
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)
    
    def validate(self, data):
        print(data)
        if data.get("password") != data.get("confirm_password"):
            raise serializers.ValidationError("Password and Confirm Password doesn't match!!")
        return data
    
class StudentLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255, write_only=True)