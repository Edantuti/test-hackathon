import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pyrebase

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db=firestore.client()



data_users={"email":"", "name":"", "password":"" }

data_user_false={"email":"", "name":"", "password":"", "ver_id":""}

data_timestamp={"time1":"song1", "time2":"song2"}

data_libraries={"lib1":["song1", "song2"], "lib2":["song3", "song4"]}

data_creation_time={"song1":"datetime1", "song2":"datetime2"}


while True:
	print("""

		1) create
		2) read
		3) update
		4) delete

		""")
	usr_inp=input("enter the option no.: ")

	if usr_inp=="1":

		while True:
			print("""
				1) creation_time
				2) libraries
				3) timestamp
				4) user_false
				5) users
				6) back to CRUD
				""")
			usr_inp=input("enter the choice no.: ")
			if usr_inp=="1":
				email=input("enter email: ")
				db.collection("creation_time").document(email).set(data_creation_time)
			elif usr_inp=="2":
				email=input("enter email: ")
				db.collection("libraries").document(email).set(data_libraries)
			elif usr_inp=="3":
				song_name=input("enter song name: ")
				db.collection("timestamp").document(song_name).set(data_timestamp)
			elif usr_inp=="4":
				email=input("enter email: ")
				db.collection("user_false").document(email).set(data_user_false)
			elif usr_inp=="5":
				email=input("enter email: ")
				db.collection("users").document(email).set(data_users)
			elif usr_inp=="6":
				break
			else:
				print("""

					invalid input

					""")
				continue
	elif usr_inp=="2":
		while True:
			print("""
				1) creation_time
				2) libraries
				3) timestamp
				4) user_false
				5) users
				6) back to CRUD
				""")
			usr_inp=input("enter the choice no.: ")

			if usr_inp=="1":
				email=input("enter email: ")
				data=db.collection("creation_time").document(email).get()
				print(data.to_dict())
			elif usr_inp=="2":
				email=input("enter email: ")
				db.collection("libraries").document(email).set(data_libraries)
			elif usr_inp=="3":
				song_name=input("enter song name: ")
				db.collection("timestamp").document(song_name).set(data_timestamp)
			elif usr_inp=="4":
				email=input("enter email: ")
				db.collection("user_false").document(email).set(data_user_false)
			elif usr_inp=="5":
				email=input("enter email: ")
				db.collection("users").document(email).set(data_users)
			elif usr_inp=="6":
				break
			else:
				print("""

						invalid input

						""")
				continue
