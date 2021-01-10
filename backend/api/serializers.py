from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from .models import Post, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class RecursiveSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class CommentSerializer(serializers.ModelSerializer):
    reply_set = RecursiveSerializer(many=True, read_only=True)

    class Meta:
        model = Comment
        fields = ['comment', 'sentiment', 'likes', 'updated_at', 'parent',  'reply_set']


class FullPostSerializer(serializers.ModelSerializer):
    comments_post = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'token', 'link', 'updated_at', 'comments_post']


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'token', 'link', 'updated_at', 'image_path', 'description', 'instagram_user', 'number_positive',
                  'number_negative', 'likes']


