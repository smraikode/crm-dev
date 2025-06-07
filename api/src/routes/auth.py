from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.firestore_service import create_user, verify_user
from datetime import datetime, timedelta
import jwt

router = APIRouter()

class UserSignup(BaseModel):
    full_name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/signup")
async def signup(user: UserSignup):
    try:
        create_user(user)
        return {"message": "User created successfully."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login")
async def login(user: UserLogin):
    try:
        user_exists = verify_user(user.email, user.password)
        if not user_exists:
            raise HTTPException(status_code=404, detail="User not found")
        # Create JWT token
        SECRET_KEY = "ABCD" 
        ALGORITHM = "HS256"
        ACCESS_TOKEN_EXPIRE_HOURS = 2

        payload = {
            "sub": user.email,
            "exp": datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
        }
        jwt_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": jwt_token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))