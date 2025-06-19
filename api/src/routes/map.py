from fastapi import APIRouter, Header, HTTPException, Request
from jose import JWTError
from pydantic import BaseModel
from typing import Optional
import jwt
from datetime import datetime, timezone
from services.firestore_service import add_location, get_all_user_locations_details
from env import SECRET_KEY, ALGORITHM


router = APIRouter()



class LocationPayload(BaseModel):
    longitude: float
    latitude: float
    status: str   # Add this field





@router.post("/mytimeline/current-location")
async def current_location(
    payload: LocationPayload, authorization: Optional[str] = Header(None)
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    token = authorization.split(" ")[1]
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = decoded.get("email") or decoded.get("sub")
        role = decoded.get("role")
        if not email or not role:
            raise HTTPException(status_code=400, detail="Token missing email or role")

        success = add_location(email, payload.longitude, payload.latitude, payload.status)  # pass status
        if not success:
            raise HTTPException(status_code=500, detail="Failed to save location")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {
        "currenttime": datetime.now(timezone.utc).isoformat(),
        "longitude": payload.longitude,
        "latitude": payload.latitude,
        "status": payload.status,
        "email": email,
        "role": role,
        "message": "Location Added successfully",
    }




# @router.get("/team/attendance")
# async def get_team_attendance(authorization: Optional[str] = Header(None)):
#     if not authorization or not authorization.startswith("Bearer "):
#         raise HTTPException(status_code=401, detail="Invalid or missing token")
    
#     token = authorization.split(" ")[1]
#     try:
#         decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        

#         locations = get_all_user_locations_details()
#         return {
#             "data": locations,
#         }
#     except jwt.PyJWTError:
#         raise HTTPException(status_code=401, detail="Invalid token")



@router.get("/team/attendance")
async def get_team_attendance(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")

    token = authorization.replace("Bearer ", "").strip()
    
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        locations = get_all_user_locations_details()
        return {"data": locations}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
