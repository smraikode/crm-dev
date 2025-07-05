from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel

from services.user_service import update_user_office, get_user_office
from utils.auth_utils import decode_token

router = APIRouter(prefix="/user", tags=["user"])


class OfficeDetailsRequest(BaseModel):
    user_email: str
    office_id: str


@router.post("/add-office")
def add_office_details(request: Request, office_req: OfficeDetailsRequest):
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Authorization token missing")
    decoded = decode_token(token)
    if not decoded:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    updated = update_user_office(office_req.user_email, office_req.office_id)
    if not updated:
        raise HTTPException(status_code=404, detail="User not found or update failed")
    return {"message": "Office details added successfully"}


@router.get("/get-office")
def get_office_details(request: Request):
    token = request.headers.get("Authorization")
    user_email = decode_token(token).get("email")
    office_id = get_user_office(user_email)
    if not office_id:
        raise HTTPException(status_code=404, detail="No office assigned to user")
    return {"office_details": office_id}
