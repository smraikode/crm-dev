from typing import Optional

from pydantic import BaseModel, EmailStr


class Lead(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    phone: str
    source: str
    project: Optional[str] = None
    propertyInterest: Optional[str] = None
    budgetMin: Optional[str] = None
    budgetMax: Optional[str] = None
    notes: Optional[str] = None
    type: Optional[str] = "Buyer"
