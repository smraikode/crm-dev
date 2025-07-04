import logging

from fastapi import APIRouter, HTTPException, Request

from services.user_service import build_org_tree
from utils.auth import verify_jwt_token

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/org-tree")
def get_organization_tree(request: Request):
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Authorization token missing")

    decoded = verify_jwt_token(token)
    if not decoded:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user_email = decoded.get("sub")
    if not user_email:
        raise HTTPException(status_code=400, detail="Email not found in token")

    tree = build_org_tree(user_email)
    return tree
