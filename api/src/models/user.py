
from typing import Optional

from pydantic import BaseModel, EmailStr


class User(BaseModel):
    name: str
    lastName: str
    email: EmailStr
    phone: str
    password: str
    role: Optional[str] = "employee"  # 👈 default value

    class Config:
        from_attributes = True

