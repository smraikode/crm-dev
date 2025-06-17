from pydantic import BaseModel, EmailStr

class User(BaseModel):
    name: str
    lastName: str
    email: EmailStr
    phone: str
    password: str
    role: str

    class Config:
        from_attributes = True




