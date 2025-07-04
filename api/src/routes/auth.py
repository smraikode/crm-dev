import logging
from datetime import datetime, timedelta, timezone
from typing import Optional

import jwt
from fastapi import APIRouter, HTTPException, Header

from db_client import get_db
from env import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_HOURS
from models.user import User
from models.user import UserSignup, UserLogin
from services.user_service import create_user, get_user_by_email, verify_user
from utils.auth import decode_token

# Set up logger
logger = logging.getLogger(__name__)

db = get_db()

router = APIRouter()


@router.post("/signup")
async def signup(user: UserSignup):
    logger.info("🚀 /signup endpoint hit")
    try:
        # Check if user already exists by email only
        if get_user_by_email(str(user.email)):
            raise HTTPException(status_code=400, detail="Email already exists")
        user_obj = User(**user.model_dump())
        create_user(user_obj)
        return {"message": "User registered successfully."}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Signup error: {e}")
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
async def login(user: UserLogin):
    logger.info("🚀 /login endpoint hit")
    try:
        user_exists = verify_user(str(user.email), user.password)
        if not user_exists:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        payload = {
            "sub": user.email,
            "role": user_exists["role"],
            "exp": datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS),
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

        return {"token": token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/logout")
async def logout():
    return {"message": "Successfully logged out"}


@router.get("/me")
async def get_authenticated_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401, detail="Authorization header missing or invalid"
        )
    payload = decode_token(authorization)
    return {"email": payload.get("email"), "role": payload.get("role")}
