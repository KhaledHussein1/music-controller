from django.urls import path
from .views import index

# Add URLs so Django renders index template 
# React will handle the rest to show the right page
urlpatterns = [
    path('', index),
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index)
]