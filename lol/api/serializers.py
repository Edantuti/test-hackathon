from rest_framework import serializers
from .models import Videos

class VideoSerializers(serializers.ModelSerializer):
    class Meta:
        model=Videos
        fields='__all__'