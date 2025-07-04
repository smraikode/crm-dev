import logging
from datetime import datetime
from typing import List

from db_client import get_db
from models.property import Property

logger = logging.getLogger(__name__)

db = get_db()


def create_property(property_detail: Property) -> None:
    data = property_detail.model_dump()
    data["createdAt"] = datetime.now().isoformat()
    db.collection("properties").add(data)


def get_all_properties() -> List[dict]:
    docs = db.collection("properties").stream()
    return [dict(doc.to_dict(), id=doc.id) for doc in docs]


def update_property(property_id: str, property_detail: Property) -> bool:
    ref = db.collection("properties").document(property_id)
    if not ref.get().exists:
        return False
    ref.update(property_detail.model_dump())
    return True


def delete_property(property_id: str) -> bool:
    ref = db.collection("properties").document(property_id)
    if not ref.get().exists:
        return False
    ref.delete()
    return True
