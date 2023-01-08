from django.urls import path

from .views import *

urlpatterns = [
    path('', post_video_audio),
    path('ytdlp/', post_link_audio),
    path('login/', post_login),
    path('register/', post_register),
    path('download/<str:id>', get_download_link),
    path('share/', get_share_link),
    path('list/', get_audiolist),
    path('refresh/<str:token>', get_refresh_token)
]
