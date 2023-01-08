import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pyrebase

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db=firestore.client()

#check if user already exist

"""while True:
	email=input("enter the email: ")
	result=db.collection('users').document(email).get()
	if result.exists:
		print("yes")
	else:
		print("no")"""

#check if email is valid or not



import re
 
# Define a function for
# for validating an Email
def check(s):
	pat = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
	if re.match(pat,s):
		print("Valid Email")
	else:
		print("Invalid Email")

email = "ankitrai326@.com"
check(email)


