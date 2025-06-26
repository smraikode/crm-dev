from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from datetime import datetime, timezone
from firebase_admin import firestore
import jwt
from env import SECRET_KEY, ALGORITHM

db = firestore.client()
router = APIRouter()

class LeaveRequest(BaseModel):
    leave_type: str
    from_date: str  # Expected format: "YYYY-MM-DD"
    to_date: str
    reason: str = ""
    worker_id: str
    site: str

@router.post("/apply-leave")
async def apply_leave(request: LeaveRequest, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token header")

    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        email = payload.get("sub")  # ✅ Use 'sub' from token

        if not email:
            raise HTTPException(status_code=401, detail="Invalid token payload")

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    try:
        from_date = datetime.strptime(request.from_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        to_date = datetime.strptime(request.to_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Expected YYYY-MM-DD.")

    data = {
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

    db.collection("leave_requests").add(data)

    return {"message": "Leave request submitted successfully", "data": data}
