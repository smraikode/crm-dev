import logging
from datetime import datetime
from typing import Union, List

from pydantic import BaseModel, EmailStr

from db_client import get_db
from models.lead import Lead

logger = logging.getLogger(__name__)

db = get_db()


def create_lead(lead: Union[Lead, dict]) -> None:
    leads_ref = db.collection("leads")
    lead_data = lead.model_dump() if isinstance(lead, BaseModel) else lead
    lead_data.setdefault("status", "New")
    lead_data["createdAt"] = datetime.now().isoformat()
    leads_ref.add(lead_data)


def check_duplicate_lead(email: EmailStr, phone: str) -> bool:
    query = db.collection("leads")
    if email:
        query = query.where(filter=("email", "==", email))
    if phone:
        query = query.where(filter=("phone", "==", phone))
    return any(query.stream())


def get_all_leads() -> List[dict]:
    docs = db.collection("leads").stream()
    return [
        {**doc.to_dict(), "id": doc.id, "status": doc.to_dict().get("status", "New")}
        for doc in docs
    ]
