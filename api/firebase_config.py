import os
print("Current working directory:", os.getcwd())
import firebase_admin
from firebase_admin import credentials, auth

cred = credentials.Certificate("serviceAccountKey.json")  # Download from Firebase Console
firebase_admin.initialize_app(cred)