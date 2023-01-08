import pyrebase

config={
	"apiKey": "AIzaSyAo1aYv2vzHvSmgH060fLX_u6OConIe3wA",
  "authDomain": "test-1-d67d7.firebaseapp.com",
  "projectId": "test-1-d67d7",
  "storageBucket": "test-1-d67d7.appspot.com",
  "messagingSenderId": "258638014542",
  "appId": "1:258638014542:web:9d1f57f71cf5804cf0bb1f",
  "measurementId": "G-CYP8F4EZJL",
  "databaseURL":"gs://test-1-d67d7.appspot.com/"
}

firebase=pyrebase.initialize_app(config)
storage=firebase.storage()

path_on_cloud="audio_files/hellosobik@gmail.com/song.mp3"
path_on_machine="song.mp3"

storage.child(path_on_cloud).put(path_on_machine)
#storage.child(path_on_cloud).download(path="//", filename="song.mp3")