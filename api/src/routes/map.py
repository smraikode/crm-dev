from fastapi import APIRouter, Header, HTTPException, Request
from jose import JWTError
from pydantic import BaseModel
from typing import Optional
import jwt
from datetime import datetime, timezone,timedelta
from services.firestore_service import add_location, get_all_user_locations_details
from env import SECRET_KEY, ALGORITHM
from fastapi import Query


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




@router.get("/mytimeline/user")
async def get_user_timeline(
    authorization: Optional[str] = Header(None),
    date: Optional[str] = Query(None)  # ✅ fix: imported Query
):
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

    from google.cloud import firestore
    user_location_ref = db.collection("user_location")
    query = user_location_ref.where("email", "==", email)

    if date:
        try:
            target_date = datetime.strptime(date, "%Y-%m-%d").date()
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date format")
    else:
        target_date = datetime.utcnow().date()

    try:
        docs = query.stream()
    except Exception as e:
        print("Firestore Error:", e)
        raise HTTPException(status_code=500, detail="Error fetching Firestore data")

    timeline = []
    for doc in docs:
        data = doc.to_dict()
        ts = data.get("updated_at")
        if not ts:
            continue
        ts_date = ts.date()
        if ts_date == target_date:
            timeline.append({
                "status": data.get("status"),
                "timestamp": ts.isoformat()
            })

    return {
        "email": email,
        "timeline": timeline  # can be empty list
    }


@router.get("/attendance/history")
async def get_attendance_history(
    date: Optional[str] = Query(None, description="Optional date in format YYYY-MM-DD"),
    authorization: Optional[str] = Header(None)
):
    # ✅ Validate token
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    token = authorization.split(" ")[1]

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = decoded.get("email") or decoded.get("sub")
        if not email:
            raise HTTPException(status_code=400, detail="Token missing email")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    try:
        db_ref = firestore.client().collection("user_location")
        query = db_ref.where("email", "==", email)

        if date:
            try:
                date_obj = datetime.strptime(date, "%Y-%m-%d")  # Expecting ISO date from frontend
            except ValueError:
                raise HTTPException(status_code=400, detail="Date format should be YYYY-MM-DD")

            # Define full day range in UTC
            start = datetime(date_obj.year, date_obj.month, date_obj.day, 0, 0, 0, tzinfo=timezone.utc)
            end = start + timedelta(days=1)

            query = query.where("updated_at", ">=", start).where("updated_at", "<", end)

        query = query.order_by("updated_at", direction=firestore.Query.DESCENDING)

        docs = query.stream()
        records = []

        for doc in docs:
            data = doc.to_dict()
            timestamp = data.get("updated_at")
            records.append({
                "timestamp": timestamp.isoformat() if timestamp else None,
                "status": data.get("status"),
                "longitude": data.get("longitude"),
                "latitude": data.get("latitude"),
            })

        return {
            "email": email,
            "count": len(records),
            "date": date or "all",
            "timeline": records
        }

    except Exception as e:
        print("🔥 Error:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch attendance records")
