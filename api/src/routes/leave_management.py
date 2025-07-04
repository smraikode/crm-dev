import logging
from datetime import datetime, timezone

from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from starlette import status

from services.leave_service import extract_email_from_token, parse_dates, submit_leave_request

logger = logging.getLogger(__name__)
router = APIRouter()


class LeaveRequest(BaseModel):
    leave_type: str
    from_date: str  # "YYYY-MM-DD"
    to_date: str
    reason: str = ""
    worker_id: str
    site: str


@router.post("/apply", status_code=status.HTTP_201_CREATED)
async def apply_leave(request: LeaveRequest, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token header")

    token = authorization.replace("Bearer ", "")
    email = extract_email_from_token(token)
    from_date, to_date = parse_dates(request.from_date, request.to_date)

    leave_data = {
        "email": email,
        "leave_type": request.leave_type,
        "from_date": from_date,
        "to_date": to_date,
        "reason": request.reason,
        "worker_id": request.worker_id,
        "site": request.site,
        "status": "pending",
        "created_at": datetime.now(timezone.utc),
    }

    submit_leave_request(leave_data)
    return {
        "message": "Leave request submitted successfully",
        "data": leave_data,
    }
