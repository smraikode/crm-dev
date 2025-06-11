from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from services.firestore_service import assign_role_to_user
from firebase_admin import firestore

db = firestore.client()
router = APIRouter()

class AssignRoleRequest(BaseModel):
    email: str
    role: str

@router.post("/permissions/assign-role")
def assign_role(request: AssignRoleRequest):
    success = assign_role_to_user(request.email, request.role)
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

            if isinstance(email, str) and query.lower() in email.lower():
                result.append({
                    "id": user.id,
                    "email": email,
                    "name": name,
                })

        return result

    except Exception as e:
        print(f"Error in search-users: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
