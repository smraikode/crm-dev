from typing import List

from fastapi import APIRouter, HTTPException

from services.office_service import Office, OfficeCreate, office_service

router = APIRouter(prefix="/offices", tags=["offices"])


@router.post("/", response_model=Office, status_code=201)
def create_office(office: OfficeCreate):
    return office_service.create(office)


@router.get("/", response_model=List[Office])
def get_all_offices():
    return office_service.get_all()


@router.get("/{office_id}", response_model=Office)
def get_office(office_id: str):
    office = office_service.get_by_id(office_id)
    if not office:
        raise HTTPException(status_code=404, detail="Office not found")
    return office


@router.put("/{office_id}", response_model=Office)
def update_office(office_id: str, office: OfficeCreate):
    updated = office_service.update(office_id, office)
    if not updated:
        raise HTTPException(status_code=404, detail="Office not found")
    return updated


@router.delete("/{office_id}", status_code=204)
def delete_office(office_id: str):
    deleted = office_service.delete(office_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Office not found")
