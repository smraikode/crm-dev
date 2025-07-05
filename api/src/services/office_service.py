import logging
from typing import List, Optional

from pydantic import BaseModel

from utils.db_client import get_db

logger = logging.getLogger(__name__)

db = get_db()


class Office(BaseModel):
    id: str
    name: str
    address: str
    latitude: float
    longitude: float


class OfficeCreate(BaseModel):
    name: str
    address: str
    latitude: float
    longitude: float


class OfficeService:
    def __init__(self):
        self.collection = db.collection("office")

    def create(self, office_data: OfficeCreate) -> Office:
        doc_ref = self.collection.document()
        office_dict = office_data.model_dump()
        office_dict["id"] = doc_ref.id
        doc_ref.set(office_dict)
        return Office(**office_dict)

    def get_all(self) -> List[Office]:
        docs = self.collection.stream()
        return [Office(**doc.to_dict()) for doc in docs]

    def get_by_id(self, office_id: str) -> Optional[Office]:
        doc = self.collection.document(office_id).get()
        if doc.exists:
            return Office(**doc.to_dict())
        return None

    def update(self, office_id: str, office_data: OfficeCreate) -> Optional[Office]:
        doc_ref = self.collection.document(office_id)
        if doc_ref.get().exists:
            doc_ref.update(office_data.model_dump())
            updated_doc = doc_ref.get()
            return Office(**updated_doc.to_dict())
        return None

    def delete(self, office_id: str) -> bool:
        doc_ref = self.collection.document(office_id)
        if doc_ref.get().exists:
            doc_ref.delete()
            return True
        return False


office_service = OfficeService()
