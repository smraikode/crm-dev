from pydantic import BaseModel

class Property(BaseModel):
    name: str
    location: str
    price: float
    type: str
    status: str
    description: str