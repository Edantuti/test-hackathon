import random
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import re
from django.conf import settings

cred = credentials.Certificate(f"{settings.BASE_DIR}\\api\\db\\serviceAccountKey.json")

firebase_admin.initialize_app(cred)
db=firestore.client()

#valid email
def valid_email(email):
	pat = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
	if re.match(pat,email):
		return True
	else:
		return False

#identify existing user
def user_exist(email):
	result=db.collection('users').document(email).get()
	if result.exists:
		return True
	else:
		return False

#functions to manipulate database

#add new to user_false 
def user_false(name, email, password):
	if valid_email(email=email):
		if user_exist(email=email)==True:
			print("user already exist!")
			return False
		else:
			ver_id=random.randint(10000000,99999999)
			data_user_false={"email":email, "name":name, "password":password, "ver_id":ver_id}
			db.collection("user_false").document(email).set(data_user_false)
			ver_link=email+"~"+str(ver_id)
			return ver_link
	else:
		print("invalid email address")
		return False

#user_false("eda3", "edantc123@gmail.com", "edan1234")


#add new to users
def users(ver_link):
	
	breaker_index=ver_link.index("~")
	email=ver_link[0:breaker_index]
	ver_id=ver_link[breaker_index+1:len(ver_link)]

	result=db.collection('user_false').document(email).get()
	doc=result.to_dict()
	print(doc['email']+str(doc['ver_id']))
	if doc['email']==email and str(doc['ver_id'])==ver_id:
		data_users={"email":doc['email'], "name":doc['name'], "password":doc['password'] }
		db.collection("users").document(email).set(data_users)
		db.collection("user_false").document(email).delete()
		return True
	else:
		return False

	
#users("edantc123@gmail.com 76343304")

#add creation time
def creation_time(email, song, dtime):
	result=db.collection('creation_time').document(email).get()
	doc=list(result.to_dict().keys())
	if song not in doc:
		db.collection('creation_time').document(email).update({song:dtime})
		print("song creation time uploaded")
		return True
	else:
		print("same name song already exist")
		return False

#creation_time("hellosobik@gmail.com", "guru", "lahore")

