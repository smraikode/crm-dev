from pydantic import BaseModel

class Shift(BaseModel):
    id: int
    name: str
    start_time: str
    end_time: str
