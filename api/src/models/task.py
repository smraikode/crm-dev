from datetime import datetime
from pydantic import BaseModel, EmailStr

class Task(BaseModel):
    title: str
    description: str
    assigned_to: EmailStr
    lead_email: EmailStr
    priority: str  # "Low", "Medium", "High"
    due_date: datetime