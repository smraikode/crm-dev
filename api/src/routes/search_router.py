import logging

from fastapi import APIRouter, Query
from firebase_admin import firestore

from services.auth_service import search_users
from utils.db_client import get_db

logger = logging.getLogger(__name__)

db = get_db()
router = APIRouter(prefix="/search", tags=["search"])


@router.get("/search-users")
def search(query: str = Query(..., min_length=1)):
    return search_users(query)
