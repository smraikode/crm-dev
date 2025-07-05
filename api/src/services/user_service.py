import logging

from services.office_service import office_service
from utils.db_client import get_db

logger = logging.getLogger(__name__)

db = get_db()


def update_user_office(user_email: str, office_id: str) -> bool:
    assigned_sites = db.collection("assigned_sites").where("email", "==", user_email).stream()
    assigned_sites = list(assigned_sites)
    if assigned_sites:
        doc_id = assigned_sites[0].id
        db.collection("assigned_sites").document(doc_id).update({"office_id": office_id})
    else:
        db.collection("assigned_sites").add({"email": user_email, "office_id": office_id})
    return True


def get_user_office(user_email: str) -> dict:
    user = db.collection("assigned_sites").where("email", "==", user_email).stream()
    user = list(user)
    if not user:
        return {}
    user_data = user[0].to_dict()
    office_id = user_data.get("office_id")
    if not office_id:
        return {}

    return office_service.get_by_id(office_id)
