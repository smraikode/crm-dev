from fastapi import APIRouter, Header, HTTPException, Request
from jose import JWTError
from pydantic import BaseModel
from typing import Optional
import jwt
from datetime import datetime, timezone
from services.firestore_service import add_location, get_all_user_locations_details
from env import SECRET_KEY, ALGORITHM

from firebase_admin import firestore
db = firestore.client()


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



# @router.get("/mytimeline/user")
# async def get_user_timeline(authorization: Optional[str] = Header(None)):
#     if not authorization or not authorization.startswith("Bearer "):
#         raise HTTPException(status_code=401, detail="Missing or invalid token")

#     token = authorization.split(" ")[1]
#     try:
#         decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         email = decoded.get("email") or decoded.get("sub")
#         if not email:
#             raise HTTPException(status_code=400, detail="Token missing email")
#     except jwt.PyJWTError:
#         raise HTTPException(status_code=401, detail="Invalid token")

#     # 🔍 Firestore query without composite index
#     user_location_ref = db.collection("user_location")

#     try:
#         docs = user_location_ref.where("email", "==", email).stream()
#         all_entries = []
#         for doc in docs:
#             data = doc.to_dict()
#             if "updated_at" in data:
#                 all_entries.append(data)
#     except Exception as e:
#         print("❌ Firestore Query Error:", e)
#         raise HTTPException(status_code=500, detail="Error fetching from Firestore")

#     # 🧠 Sort manually by updated_at descending
#     sorted_entries = sorted(
#         all_entries,
#         key=lambda x: x.get("updated_at"),
#         reverse=True
#     )

#     clock_in_time = None
#     last_update_time = None
#     clock_out_time = None

#     for data in sorted_entries:
#         status = data.get("status")
#         timestamp = data.get("updated_at")
#         if not timestamp:
#             continue

#         ts = timestamp.isoformat()
#         if status == "clockin" and not clock_in_time:
#             clock_in_time = ts
#         elif status == "update" and not last_update_time:
#             last_update_time = ts
#         elif status in ["clockout", "auto-clockout"] and not clock_out_time:
#             clock_out_time = ts

#     if not any([clock_in_time, last_update_time, clock_out_time]):
#         raise HTTPException(status_code=404, detail="Timeline not found")

#     return {
#         "email": email,
#         "clock_in_time": clock_in_time or "N/A",
#         "last_update_time": last_update_time or "N/A",
#         "clock_out_time": clock_out_time or "N/A",
#     }





@router.get("/mytimeline/user")
async def get_user_timeline(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    token = authorization.split(" ")[1]
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = decoded.get("email") or decoded.get("sub")
        if not email:
            raise HTTPException(status_code=400, detail="Token missing email")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_location_ref = db.collection("user_location")
    try:
        docs = user_location_ref.where("email", "==", email).stream()
    except Exception as e:
        print("Firestore query error:", e)
        raise HTTPException(status_code=500, detail="Error fetching from Firestore")

    entries = []
    for doc in docs:
        data = doc.to_dict()
        ts = data.get("updated_at")
        if not ts:
            continue
        entries.append({
            "status": data.get("status"),
            "timestamp": ts.isoformat()
        })

    if not entries:
        raise HTTPException(status_code=404, detail="No timeline found")

    # Sort descending (latest first)
    entries.sort(key=lambda x: x["timestamp"], reverse=True)

    return {
        "email": email,
        "timeline": entries
    }
