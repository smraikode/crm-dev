from firebase_config import *
from firebase_admin import firestore
from models.user import User
from utils.security import hash_password, verify_password

db = firestore.client()

def create_user(user: User):
    user_ref = db.collection('users').document(user.email)
    user_ref.set({
        'full_name': user.full_name,
        'email': user.email,
        'password': hash_password(user.password)
    })

def get_user_by_email(email: str):
    user_ref = db.collection('users').document(email)
    user = user_ref.get()
    if user.exists:
        return user.to_dict()
    return None

def verify_user(email: str, password: str):
    user_data = get_user_by_email(email)
    if user_data and verify_password(password, user_data['password']):
        return True
    return False