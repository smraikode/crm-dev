import logging
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Header, HTTPException, Query
from pydantic import BaseModel

from services.attendance_service import (
    add_attendance_location,
    get_all_attendance_details,
    get_attendance_timeline,
    get_attendance_history,
)
from utils.auth_utils import decode_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/attendance", tags=["attendance"])


class LocationPayload(BaseModel):
    longitude: float
    latitude: float
    status: str


@router.post("/mark")
async def mark_attendance(payload: LocationPayload, authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid or missing token")

    user = decode_token(authorization)

    if not add_attendance_location(user["email"], payload.longitude, payload.latitude, payload.status):
        raise HTTPException(status_code=500, detail="Failed to save address")

    return {
        "currenttime": datetime.now().isoformat(),
        "longitude": payload.longitude,
        "latitude": payload.latitude,
        "status": payload.status,
        "email": user["email"],
        "role": user["role"],
        "message": "Location Added successfully",
    }


@router.get("/team")
async def team_attendance(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")

    decode_token(authorization)
    return {"data": get_all_attendance_details()}


@router.get("/location-check")
async def attendance_location_check(
        authorization: Optional[str] = Header(None),
        date: Optional[str] = Query(None)
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")

    token = authorization.split(" ")[1]
    user = decode_token(token)

    target_date = datetime.now().date()
    if date:
        try:
            target_date = datetime.strptime(date, "%Y-%m-%d").date()
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date format")

    timeline = get_attendance_timeline(user["email"], target_date)
    return {"email": user["email"], "timeline": timeline}


@router.get("/history")
async def attendance_history(
        date: Optional[str] = Query(None),
        authorization: Optional[str] = Header(None),
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid or missing token")

    token = authorization.split(" ")[1]
    user = decode_token(token)

    records = get_attendance_history(user["email"], date)

    return {
        "email": user["email"],
        "count": len(records),
        "date": date or "all",
        "timeline": records,
    }
