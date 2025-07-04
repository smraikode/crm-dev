import logging

from fastapi import APIRouter, HTTPException

from models.lead import Lead
from services.lead_service import create_lead, check_duplicate_lead, get_all_leads

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/leads", response_model=dict)
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


@router.get("/leads")
async def fetch_all_leads() -> list:
    try:
        return get_all_leads()
    except Exception as exc:
        logger.error(f"Error fetching leads: {exc}")
        raise HTTPException(status_code=500, detail="Failed to fetch leads")


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
