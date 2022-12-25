# A working demo for Hackathon

A web app that takes a YouTube URL or a video file from user and converts it to an audio file using YT-DL/FFMPEG.

`some-app` is the React frontend and `lol` is the Django backend.

## To-do:

- [ ] Add more items to to-do list

## To run the app

- React frontend:

```
cd some-app
npm i react-scripts axios
npm run
```

- Django backend:

```
cd lol
pip install django-cors-headers poetry djangorestframework
python3 -m venv env
source env/bin/activate
python manage.py runserver 0.0.0.0:8000
```
