from env import ALGORITHM, SECRET_KEY
from routes import auth
from firebase_config import *
from firebase_admin import firestore
from models.user import User
from utils.security import hash_password, verify_password
from firebase_admin.auth import verify_id_token
import jwt
from datetime import datetime


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
    


    from firebase_admin import firestore

# def get_all_user_locations_details():
#     db = firestore.client()
#     docs = db.collection("user_location").stream()
#     result = []
#     for doc in docs:
#         data = doc.to_dict()
#         # data["id"] = doc.id  # Exclude if you don't want the Firestore doc ID
#         result.append(data)
#     return result

def get_all_user_locations_details():
    db = firestore.client()
    docs = db.collection("user_location").stream()
    result = []

    for doc in docs:
        data = doc.to_dict()
        
        # Convert Firestore timestamp to Python datetime object for proper sorting
        if "updated_at" in data and hasattr(data["updated_at"], "isoformat"):
            data["updated_at"] = data["updated_at"].isoformat()
        
        result.append(data)

    # Sort result by 'updated_at' in descending order (latest first)
    result.sort(key=lambda x: x.get("updated_at", ""), reverse=True)

    return result

