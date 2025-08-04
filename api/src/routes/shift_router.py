from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.shift_service import add_shift, get_all_shifts

router = APIRouter(prefix="/shift", tags=["Shift"])

class ShiftInput(BaseModel):
    name: str
    start_time: str
    end_time: str

@router.post("/add")
def create_shift(payload: ShiftInput):
    try:
        return add_shift(payload.name, payload.start_time, payload.end_time)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/all")
def list_shifts():
    try:
        return get_all_shifts()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
