from rest_framework import serializers
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