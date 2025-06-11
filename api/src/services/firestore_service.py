from firebase_config import *
from firebase_admin import firestore
from models.user import User
from utils.security import hash_password, verify_password

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


def add_location(email: str, longitude: float, latitude: float):
    try:
        user_location_ref = db.collection("user_location")
        user_location_ref.add(
            {
                "email": email,
                "longitude": longitude,
                "latitude": latitude,
                "updated_at": firestore.SERVER_TIMESTAMP,
            }
        )
        return True
    except Exception as e:
        return False

def assign_role_to_user(email: str, role: str):
    user_ref = db.collection("users").document(email)
    if not user_ref.get().exists:
        return False

    user_ref.update({"role": role})
    return True
