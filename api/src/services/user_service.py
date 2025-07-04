import logging
from typing import List, Optional

from db_client import get_db
from models.user import User
from utils.security import hash_password, verify_password

logger = logging.getLogger(__name__)

db = get_db()


def create_user(user: User) -> None:
    user_ref = db.collection("users").document(user.email)
    user_ref.set({
        "name": user.name,
        "lastName": user.lastName,
        "email": user.email,
        "phone": user.phone,
        "role": "employee",
        "password": hash_password(user.password),
    })


def get_user_by_email(email: str) -> Optional[dict]:
    user_ref = db.collection("users").document(email)
    user = user_ref.get()
    return user.to_dict() if user.exists else None


def verify_user(email: str, password: str) -> Optional[dict]:
    user_data = get_user_by_email(email)
    if user_data and verify_password(password, user_data["password"]):
        return user_data
    return None


def assign_role_to_user(email: str, role: str, subordinates: Optional[List[str]] = None) -> bool:
    user_ref = db.collection("users").document(email)
    user_doc = user_ref.get()
    if not user_doc.exists:
        return False

    update_data = {"role": role}
    if subordinates:
        current_data = user_doc.to_dict()
        existing_subs = current_data.get("subordinates", [])
        all_users_docs = db.collection("users").stream()
        user_lookup = {doc.id: doc.to_dict() for doc in all_users_docs}

        formatted_subs = []
        for sub in subordinates:
            if " - " in sub:
                formatted_subs.append(sub)
            elif sub in user_lookup:
                user_data = user_lookup[sub]
                formatted_subs.append(f"{user_data.get('name')} ({user_data.get('role')}) - {sub}")
            else:
                formatted_subs.append(sub)

        update_data["subordinates"] = list(set(existing_subs + formatted_subs))

    user_ref.update(update_data)
    return True


def remove_subordinate_from_user(user_email: str, subordinate_email: str) -> bool:
    user_ref = db.collection("users").document(user_email)
    user_doc = user_ref.get()
    if not user_doc.exists:
        return False

    user_data = user_doc.to_dict()
    current_subs = user_data.get("subordinates", [])
    updated_subs = [s for s in current_subs if not s.endswith(f"- {subordinate_email}")]

    if len(updated_subs) == len(current_subs):
        return False

    user_ref.update({"subordinates": updated_subs})
    return True


def build_org_tree(email: str) -> dict:
    user_ref = db.collection("users").document(email)
    user_doc = user_ref.get()
    if not user_doc.exists:
        return {}

    user_data = user_doc.to_dict()
    subordinates = user_data.get("subordinates", [])
    subordinate_emails = [s.split(" - ")[-1].strip() for s in subordinates if " - " in s]

    return {
        "name": user_data.get("name"),
        "role": user_data.get("role"),
        "email": email,
        "children": [build_org_tree(sub_email) for sub_email in subordinate_emails]
    }
