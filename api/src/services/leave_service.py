import logging
from datetime import datetime, timezone

import jwt
from fastapi import HTTPException

from db_client import get_db
from env import SECRET_KEY, ALGORITHM

logger = logging.getLogger(__name__)

db = get_db()


def parse_dates(from_date_str: str, to_date_str: str):
    try:
        from_date = datetime.strptime(from_date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        to_date = datetime.strptime(to_date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        return from_date, to_date
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Expected YYYY-MM-DD.")


def extract_email_from_token(token: str) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        return email
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


def submit_leave_request(data: dict):
    db.collection("leave_requests").add(data)
