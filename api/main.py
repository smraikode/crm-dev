from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from firebase_admin import auth as firebase_auth
from jose import jwt
from datetime import datetime, timedelta
from firebase_config import *  # Initialize Firebase

app = FastAPI()

# CORS (React dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT settings
SECRET_KEY = "supersecret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


class User(BaseModel):
    email: str
    password: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI backend!"}

@app.get("/api/hello")
def say_hello():
    return {"message": "Hello from FastAPI!"}


# Sign Up
@app.post("/api/signup")
def signup(user: User):
    try:
        firebase_auth.create_user(email=user.email, password=user.password)
        return {"message": "User created successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Login and return JWT token
@app.post("/api/login")
def login(user: User):
    try:
        # Firebase does not support email/password auth via Admin SDK
        # So on frontend you should use Firebase SDK to get ID token and send it to backend
        # Here's a dummy login for dev/testing

        # In production, do:
        # 1. Firebase login on frontend using SDK
        # 2. Send Firebase ID token to backend
        # 3. Verify it here, then issue your JWT

        # Simulate login and return JWT (NOT REAL AUTH)
        access_token = jwt.encode({
            "sub": user.email,
            "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        }, SECRET_KEY, algorithm=ALGORITHM)

        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid login credentials")
