from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone
from django.conf import settings
from django.http import HttpResponse
import firebase_admin
from firebase_admin import auth
from .mail import send_mail
import os
import json
from uuid import uuid4
import requests
from mimetypes import guess_type
import yt_dlp


cred = firebase_admin.credentials.Certificate(f"{settings.BASE_DIR}/api/db/serviceAccountKey.json")

auth = auth.Client(firebase_admin.initialize_app(cred))

secrets = json.loads(open(f"{settings.BASE_DIR}/config.json", "r").read())

@api_view(["POST"])
def post_video_audio(request):
    audio_dir=f"{settings.BASE_DIR}/media/music/"
    video_dir_temp=f"{settings.BASE_DIR}/media/temp/"
        
    if(not request.FILES['video'].content_type[0:5]=="video"):
        return Response(data={
                            "Error":f"{video_name} is not a video file."
                                },status=HTTP_406_NOT_ACCEPTABLE)
    video_name = request.FILES['video'].name
    handle_file(request.FILES['video'], f"{video_dir_temp}{video_name}")
        
    if(not os.path.exists(audio_dir)):
        os.mkdir(audio_dir)

    audio_name = f"{video_name[0:video_name.rindex('.')]}.flac"        
    os.system(f"ffmpeg -n -i \"{video_dir_temp}{video_name}\" -map 0:a:0 -b:a 320k \"{audio_dir}{audio_name}\"")
    os.remove(video_dir_temp+video_name)
    data={
        "audio_path":audio_dir+audio_name
    }
    return Response(data=data,status=HTTP_206_PARTIAL_CONTENT)

@api_view(["POST"])
def post_link_audio(request):
    url=request.data["url"]
    data=get_info(url)
    file_name = data["title"]
    video_dir_temp=f"{settings.BASE_DIR}/media/temp/"
    audio_dir=f"{settings.BASE_DIR}/media/music/"
    file_path = f"{data['title']}.{data['ext']}"
    audio_path = f"{data['title']}.flac"
    if(os.path.exists(f"{audio_dir}{audio_path}")):
        audio_path=f"{data['title']}_{get_random_string()}.flac"
    data={
        # "thumbnail":data["thumbnail"],
        "audio_path":audio_dir+audio_path
    }

    if(not os.path.exists(video_dir_temp)):
        os.mkdir(video_dir_temp)
    if(not os.path.exists(audio_dir)):
        os.mkdir(audio_dir)

    os.system(f"python3 -m yt_dlp --geo-bypass {url} -o \"{video_dir_temp}{file_name}.%(ext)s\"")

    os.system(f"ffmpeg -n -i \"{video_dir_temp}{file_path}\" -map 0:a:0 -b:a 320k \"{audio_dir}{audio_path}\"")
                
    os.remove(video_dir_temp+file_path)
    print(os.remove(video_dir_temp+file_path))
        
    return Response(data=data, status=HTTP_206_PARTIAL_CONTENT)

@api_view(["GET"])
def get_audiolist(request):
    data={}
    return Response(data=data)

@api_view(["POST"])
def post_login(request):
    email=request.data["email"]
    password=request.data["password"]
    request_link = f"https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key={secrets['auth_key']}"
    headers = {"content-type": "application/json; charset=UTF-8"}
    data = json.dumps({"email": email, "password": password, "returnSecureToken": True})
    request_object = requests.post(request_link, headers=headers, data=data)
    request_object.raise_for_status()
    return Response(data=request_object.json())

@api_view(["POST"])
def post_register(request):
    email=request.data["email"]
    password=request.data["password"]
    name=request.data["name"]
    try:
        auth.create_user(email=email, email_verified=False, password=password, display_name=name)
    except(firebase_admin.exceptions.AlreadyExistsError):
        return Response(data="Already Exists!")
    send_mail(verification_code=auth.generate_email_verification_link(email=email),receiver_email=email, receiver_name=name)
    return Response()

@api_view(["GET"])
def get_refresh_token(request, token):
    request_link = f"https://securetoken.googleapis.com/v1/token?key={secrets['auth_key']}"
    headers = {"content-type": "application/json; charset=UTF-8"}
    data = json.dumps({"grantType": "refresh_token", "refreshToken": token})
    request_object = requests.post(request_link, headers=headers, data=data)
    request_object.raise_for_status()
    request_object_json = request_object.json()
    data={
        "user_id":request_object_json["user_id"],
        "idToken":request_object_json["id_token"],
        "refreshToken":request_object_json["refresh_token"]
    }
    return Response(data=request_object_json)

@api_view(["POST"])
def get_download_link(request, id):
    format=request.data["format"]
    file_name="kekk"
    file_path=f"{settings.BASE_DIR}/media/music/"
    if format=="":
        format="m4a"
    file_download=f"{file_path}{file_name}.{format}"
    os.system(f"ffmpeg -n -i \"{file_path}{file_name}.m4a\" -map 0:a:0 -b:a 320k \"{file_download}\"")
    f = open(file_download, 'r', errors="ignore")
    response = HttpResponse(f, content_type=guess_type(file_download))
    response["Content-Disposition"] = f"attachment; filename={file_name}+{format}"
    f.close()
    os.remove(file_download)
    return response

@api_view(["POST", "GET"])
def get_share_link(request):
    return Response(data="share")


def handle_file(f, dir):
    with open(dir, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

def get_info(url):
    with yt_dlp.YoutubeDL() as ydl:
        return ydl.extract_info(url, download=False)

def get_random_string():
    return uuid4().time
