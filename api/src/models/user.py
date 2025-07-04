from typing import Optional

from pydantic import BaseModel, EmailStr


class User(BaseModel):
    name: str
    lastName: str
    email: EmailStr
    phone: str
    password: str
    role: Optional[str] = "employee"

    class Config:
        from_attributes = True


class UserSignup(BaseModel):
    name: str
    lastName: str
    email: EmailStr
    phone: str
    password: str
    role: Optional[str] = "employee"  # ✅ Default value


class UserLogin(BaseModel):
    email: EmailStr
    password: str
