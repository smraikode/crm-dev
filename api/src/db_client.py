import os

import firebase_admin
from firebase_admin import credentials, firestore

firebase_app = None
db = None


def get_db():
    global firebase_app, db
    if not firebase_app:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        cred_path = os.path.join(base_dir, "serviceAccountKey.json")
        cred = credentials.Certificate(cred_path)
        firebase_app = firebase_admin.initialize_app(cred)
        db = firestore.client()
    return db
