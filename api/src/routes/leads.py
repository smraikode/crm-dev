from datetime import datetime
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.lead import Lead
from services.firestore_service import create_lead, check_duplicate_lead, get_all_leads

router = APIRouter()

@router.post("/leads", response_model=dict)
async def create_new_lead(lead: Lead):
    try:
        # Check for duplicate by email or phone
        if check_duplicate_lead(email=lead.email, phone=lead.phone):
            raise HTTPException(status_code=400, detail="Lead with this email or phone already exists.")

        create_lead(lead)
        return {"message": "Lead created successfully"}
    except HTTPException:
        raise  # Re-raise known HTTP exceptions
    except Exception as e:
        print("Error saving lead:", e)
        raise HTTPException(status_code=500, detail="Failed to create lead")

@router.get("/leads")
async def fetch_all_leads():
    try:
        leads = get_all_leads()
        return leads
    except Exception as e:
        print("Error fetching leads:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch leads")
    
@router.post("/public-leads", response_model=dict)
async def create_public_lead(lead: Lead):
    try:
        if check_duplicate_lead(email=lead.email, phone=lead.phone):
            raise HTTPException(status_code=400, detail="Lead already exists.")

        lead_data = lead.dict()
        lead_data["sourceType"] = "Public"  # Mark it as a public lead

        create_lead(lead_data)  # Reuse existing logic

        return {"message": "Lead submitted successfully"}
    except Exception as e:
        print("Public lead error:", e)
        raise HTTPException(status_code=500, detail="Failed to submit lead.")
