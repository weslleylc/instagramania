from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet, PostViewSet, CommentViewSet

router = routers.DefaultRouter()
router.register(prefix='users', viewset=UserViewSet, basename='users')
router.register(prefix='posts', viewset=PostViewSet,  basename='posts')
router.register(prefix='comments', viewset=CommentViewSet,  basename='comments')

urlpatterns = [
    path('', include(router.urls)),
]
