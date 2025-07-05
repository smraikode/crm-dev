import logging

from fastapi import APIRouter, HTTPException, Request

from services.auth_service import build_organization_tree
from utils.auth_utils import decode_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/org", tags=["organization"])


@router.get("/org-tree")
def get_organization_tree(request: Request):
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Authorization token missing")

    decoded = decode_token(token)
    if not decoded:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user_email = decoded.get("email")
    if not user_email:
        raise HTTPException(status_code=400, detail="Email not found in token")

    tree = build_organization_tree(user_email)
    return tree
