from fastapi import APIRouter, HTTPException
from models.property import Property
from services.firestore_service import (
    create_property,
    get_all_properties,
    update_property,
    delete_property,
)

router = APIRouter()

@router.post("/properties")
def add_property(property: Property):
    create_property(property)
    return {"message": "Property added"}

@router.get("/properties")
def list_properties():
    return get_all_properties()

@router.put("/properties/{property_id}")
def update_existing_property(property_id: str, property: Property):
    success = update_property(property_id, property)
    if not success:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"message": "Property updated"}

@router.delete("/properties/{property_id}")
def delete_existing_property(property_id: str):
    success = delete_property(property_id)
    if not success:
        raise HTTPException(status_code=404, detail="Property not found")
    return {"message": "Property deleted"}
