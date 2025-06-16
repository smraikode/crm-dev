# from pydantic import BaseModel, EmailStr

# class User(BaseModel):
#     name: str
#     lastName: str
#     email: EmailStr
#     phone: str
#     password: str
#     role: str

#     class Config:
#         from_attributes = True




from pydantic import BaseModel, EmailStr
from typing import Optional

class User(BaseModel):
    name: str
    lastName: str
    email: EmailStr
    phone: str
    password: str
    role: str
    token: Optional[str] = None  # <- Add this only if needed later

    class Config:
        from_attributes = True