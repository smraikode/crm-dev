import logging

from fastapi import APIRouter, HTTPException

from models.lead import Lead
from services.lead_service import create_lead, check_duplicate_lead

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/public", tags=["leads"])


@router.post("/public-leads", response_model=dict)
async def create_public_lead(lead: Lead) -> dict:
    try:
        if check_duplicate_lead(email=lead.email, phone=lead.phone):
            raise HTTPException(status_code=400, detail="Lead already exists.")
        lead_data = lead.model_dump()
        lead_data["sourceType"] = "Public"
        create_lead(lead_data)
        return {"message": "Lead submitted successfully"}
    except Exception as exc:
        logger.error(f"Public lead error: {exc}")
        raise HTTPException(status_code=500, detail="Failed to submit lead.")
