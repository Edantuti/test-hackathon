from django.utils import timezone
from rest_framework.response import Response
from rest_framework.status import HTTP_206_PARTIAL_CONTENT
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.
from django.conf import settings

import os


from .models import Videos
from .serializers import VideoSerializers



class VideoData(APIView):

    def get(self, request):
        video=Videos.objects.all()
        serializer = VideoSerializers(video, many=True)
        return Response(serializer.data)


    def post(self, request):
        if(request.FILES['video'].content_type[0:5]=="video"):
            Videos.objects.create(name=request.FILES['video'].name, video=request.FILES['video'], created_at=timezone.now())
        # print(f"{settings.BASE_DIR}/media/video/{request.FILES['video'].name}")
        audio_dir=f"{settings.BASE_DIR}/media/music"
        video_dir=f"{settings.BASE_DIR}/media/video"
        if(not os.path.exists(audio_dir)):
            os.mkdir(audio_dir)
        video_file = Videos.objects.values_list('video', flat=True).latest('id')
        # video_file = video_obj[0].video
        print(type(video_file))
        audio_path = f"{video_file[video_file.index('/'):video_file.rindex('.')]}.m4a"
        video_path = f"{video_file[video_file.index('/'):len(video_file)]}"
        # print(f"{audio_dir}{audio_path}")
        # print(f"{video_dir}{video_path}")
        # print(video_file.name.rindex(".")
        os.system(f"ffmpeg -n -i {video_dir}{video_path} -map 0:a:0 -b:a 320k {audio_dir}{audio_path}")
        os.system(f"rm -r {video_dir}{video_path}")
        # video_file.delete()
        # video_obj.delete()
        data={
            "audio_path":audio_path
        }
        return Response(status=HTTP_206_PARTIAL_CONTENT)

class TextData(APIView):
    def post(self, request):
        print(request.data)
        return Response(data=request.data)
