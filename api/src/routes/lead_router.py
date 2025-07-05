import logging

from fastapi import APIRouter, HTTPException

from models.lead import Lead
from services.lead_service import create_lead, check_duplicate_lead, get_all_leads

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/leads", tags=["leads"])


@router.post("/", response_model=dict)
async def create_new_lead(lead: Lead) -> dict:
    try:
        if check_duplicate_lead(email=lead.email, phone=lead.phone):
            raise HTTPException(status_code=400, detail="Lead with this email or phone already exists.")
        create_lead(lead)
        return {"message": "Lead created successfully"}
    except HTTPException:
        raise
    except Exception as exc:
        logger.error(f"Error saving lead: {exc}")
        raise HTTPException(status_code=500, detail="Failed to create lead")


@router.get("/")
async def fetch_all_leads() -> list:
    try:
        return get_all_leads()
    except Exception as exc:
        logger.error(f"Error fetching leads: {exc}")
        raise HTTPException(status_code=500, detail="Failed to fetch leads")

