import logging

from fastapi import APIRouter, HTTPException, Query, Header
from firebase_admin import firestore
from pydantic import BaseModel

from services.user_service import assign_role_to_user, remove_subordinate_from_user
from utils.auth import verify_jwt_token

logger = logging.getLogger(__name__)

db = firestore.client()
router = APIRouter()


class RemoveSubordinateRequest(BaseModel):
    userEmail: str
    subordinateEmail: str


class AssignRoleRequest(BaseModel):
    email: str
    role: str
    subordinates: list[str] = []  # Optional field


@router.post("/permissions/remove-subordinate")
def remove_subordinate(
        request: RemoveSubordinateRequest, authorization: str = Header(..., alias="Authorization"),
):
    user = verify_jwt_token(authorization)
    if not user or user.get("role") not in ["admin", "manager", "lead"]:
        raise HTTPException(status_code=403, detail="Forbidden")

    success = remove_subordinate_from_user(request.userEmail, request.subordinateEmail)
    if not success:
        raise HTTPException(
            status_code=404, detail="Subordinate/User not found or failed to update"
        )

    return {"message": "Subordinate removed successfully"}


@router.post("/permissions/assign-role")
def assign_role(
        request: AssignRoleRequest, authorization: str = Header(..., alias="Authorization")
):
    user = verify_jwt_token(authorization)
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden: Admin access required")

    success = assign_role_to_user(request.email, request.role, request.subordinates)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "Role assigned successfully"}


@router.get("/search/search-users")
def search_users(query: str = Query(..., min_length=1)):
    try:
        users_ref = db.collection("users")
        users = users_ref.stream()

        result = []
        for user in users:
            data = user.to_dict()
            if not data:
                continue

            email = data.get("email", "")
            name = data.get("name", "Unknown")
            role = data.get("role", "Not Assigned")

            if isinstance(email, str) and query.lower() in email.lower():
                result.append(
                    {"id": user.id, "email": email, "name": name, "role": role}
                )

        return result

    except Exception as e:
        logging.error(f"Error in search-users: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/permissions/get-subordinates/{email}")
def get_subordinates(
        email: str, authorization: str = Header(..., alias="Authorization")
):
    user = verify_jwt_token(authorization)
    if not user or user.get("role") not in ["admin", "manager", "lead"]:
        raise HTTPException(status_code=403, detail="Forbidden")

    try:
        user_ref = db.collection("users").document(email)
        user_doc = user_ref.get()

        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")

        user_data = user_doc.to_dict()
        subordinates = user_data.get("subordinates", [])

        return {"subordinates": subordinates}
    except Exception as e:
        logging.error(f"Error getting subordinates: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
