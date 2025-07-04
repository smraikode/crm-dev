import logging

from fastapi import APIRouter, HTTPException

from models.property import Property
from services.property_service import (
    create_property,
    get_all_properties,
    update_property,
    delete_property,
)

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/properties")
def add_property(property_details: Property):
    create_property(property_details)
    return {"message": "Property added"}


@router.get("/properties")
def list_properties():
    return get_all_properties()


@router.put("/properties/{property_id}")
def update_existing_property(property_id: str, property_detail: Property):
    success = update_property(property_id, property_detail)
    if not success:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"message": "Property updated"}


@router.delete("/properties/{property_id}")
def delete_existing_property(property_id: str):
    success = delete_property(property_id)
    if not success:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"message": "Property deleted"}
