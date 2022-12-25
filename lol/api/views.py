from django.utils import timezone

from rest_framework.response import Response
from rest_framework.status import HTTP_206_PARTIAL_CONTENT
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

from .models import Videos
from .serializers import VideoSerializers

class VideoData(APIView):

    def get(self, request):
        video=Videos.objects.all()
        serializer = VideoSerializers(video, many=True)
        return Response(serializer.data)


    def post(self, request):
        print(request)
        Videos.objects.create(name="test", video=request.FILES["video"], created_at=timezone.now())
        return Response(status=HTTP_206_PARTIAL_CONTENT)
