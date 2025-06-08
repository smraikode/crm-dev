from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from models.user import User
from services.firestore_service import create_user, get_user_by_email, verify_user
from datetime import datetime, timedelta, timezone
import jwt
from env import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_HOURS

router = APIRouter()


class UserSignup(BaseModel):
    name: str
    lastName: str
    email: EmailStr
    phone: str
    username: str
    password: str
    role: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


@router.post("/signup")
async def signup(user: UserSignup):
    try:
        # Check if user already exists by email only
        if get_user_by_email(user.email):
            raise HTTPException(status_code=400, detail="Email already exists")
        user_obj = User(**user.dict())
        create_user(user_obj)
        return {"message": "User registered successfully."}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
async def login(user: UserLogin):
    try:
        user_exists = verify_user(user.email, user.password)
        if not user_exists:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        payload = {
            "sub": user.email,
            "role": user_exists["role"],
            "exp": datetime.now(timezone.utc)
            + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS),
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

        return {"token": token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")
