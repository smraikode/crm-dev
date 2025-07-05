import logging

from fastapi import APIRouter, Query
from firebase_admin import firestore

from services.auth_service import search_users

logger = logging.getLogger(__name__)

db = firestore.client()
router = APIRouter(prefix="/search", tags=["search"])


@router.get("/search-users")
def search(query: str = Query(..., min_length=1)):
    return search_users(query)
