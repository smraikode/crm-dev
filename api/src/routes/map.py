from fastapi import APIRouter, Header, HTTPException, Request
from pydantic import BaseModel
from typing import Optional
import jwt
from datetime import datetime, timezone
from services.firestore_service import add_location
from env import SECRET_KEY, ALGORITHM


router = APIRouter()


class LocationPayload(BaseModel):
    longitude: float
    latitude: float


@router.post("/mytimeline/current-location")
async def current_location(
    payload: LocationPayload, authorization: Optional[str] = Header(None)
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    token = authorization.split(" ")[1]
    try:
        decoded = jwt.decode(token, SECRET_KEY, ALGORITHM)
        email = decoded.get("email") or decoded.get("sub")
        role = decoded.get("role")
        if not email or not role:
            raise HTTPException(status_code=400, detail="Token missing email or role")
        success = add_location(email, payload.longitude, payload.latitude)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to save location")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    return {
        "currenttime": datetime.now(timezone.utc).isoformat(),
        "longitude": payload.longitude,
        "latitude": payload.latitude,
        "email": email,
        "role": role,
        "message": "Location Added successfully",
    }
