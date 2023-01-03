from django.urls import path

from .views import *

urlpatterns = [
    path('', VideoData.as_view()),
    path('text/', TextData.as_view())
]
