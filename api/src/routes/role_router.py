import logging

from fastapi import HTTPException, APIRouter
from pydantic import BaseModel

from services.auth_service import assign_role_to_user, get_user_subordinates, remove_user_subordinate
from utils.db_client import get_db

logger = logging.getLogger(__name__)

db = get_db()
router = APIRouter(prefix="/roles", tags=["roles"])


class RemoveSubordinateRequest(BaseModel):
    userEmail: str
    subordinateEmail: str


class AssignRoleRequest(BaseModel):
    email: str
    role: str
    subordinates: list[str] = []  # Optional field


@router.post("/remove-subordinate")
def remove_subordinate(request: RemoveSubordinateRequest):
    success = remove_user_subordinate(request.userEmail, request.subordinateEmail)
    if not success:
        raise HTTPException(status_code=404, detail="Subordinate/User not found or failed to update")

    return {"message": "Subordinate removed successfully"}


@router.post("/assign-role")
def assign_role(request: AssignRoleRequest):
    success = assign_role_to_user(request.email, request.role, request.subordinates)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "Role assigned successfully"}


@router.get("/get-subordinates/{email}")
def get_subordinates(email: str):
    subordinates = get_user_subordinates(email)
    return {"subordinates": subordinates}
