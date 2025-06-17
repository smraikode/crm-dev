from env import ALGORITHM, SECRET_KEY
from routes import auth
from firebase_config import *
from firebase_admin import firestore
from models.user import User
from utils.security import hash_password, verify_password
from firebase_admin.auth import verify_id_token
import jwt

db = firestore.client()


def create_user(user: User):
    user_ref = db.collection("users").document(user.email)
    user_ref.set(
        {
            "name": user.name,
            "lastName": user.lastName,
            "email": user.email,
            "phone": user.phone,
            "role": "employee",
            "password": hash_password(user.password),
        }
    )




def get_user_by_email(email: str):
    user_ref = db.collection("users").document(email)
    user = user_ref.get()
    if user.exists:
        return user.to_dict()
    return None


def verify_user(email: str, password: str):
    user_data = get_user_by_email(email)
    if user_data and verify_password(password, user_data["password"]):
        return user_data
    return None


# def add_location(email: str, longitude: float, latitude: float):
#     try:
#         user_location_ref = db.collection("user_location")
#         user_location_ref.add(
#             {
#                 "email": email,
#                 "longitude": longitude,
#                 "latitude": latitude,
#                 "updated_at": firestore.SERVER_TIMESTAMP,
#             }
#         )
#         return True
#     except Exception as e:
#         return False


def add_location(email: str, longitude: float, latitude: float, status: str):
    try:
        print(f"?? Adding to Firestore -> Email: {email}, Lat: {latitude}, Long: {longitude}, Status: {status}")
        user_location_ref = db.collection("user_location")

        result = user_location_ref.add({
            "email": email,
            "longitude": longitude,
            "latitude": latitude,
            "status": status,
            "updated_at": firestore.SERVER_TIMESTAMP,
        })

        print(f"? Firestore write successful. Document ID: {result[1].id}")
        return True

    except Exception as e:
        print("? Firestore Error:", e)
        return False




def assign_role_to_user(email: str, role: str):
    user_ref = db.collection("users").document(email)
    if not user_ref.get().exists:
        return False

    user_ref.update({"role": role})
    return True


def verify_jwt_token(token: str):
    try:
        cleaned_token = token.strip()
        if cleaned_token.startswith("Bearer "):
            cleaned_token = cleaned_token.split(" ", 1)[1]
        decoded_token = jwt.decode(cleaned_token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token
    except Exception as e:
        print(f"JWT verification failed: {e}")
        return None
