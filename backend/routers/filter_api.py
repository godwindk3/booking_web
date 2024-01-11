from fastapi import APIRouter, status, Depends, HTTPException
from typing import List, Dict
import ultraimport
filter_services = ultraimport("__dir__/../services/filter_services.py")
validation_models = ultraimport("__dir__/../models/validation_models.py")

router = APIRouter(prefix="/filter", tags=["FILTER"])

@router.post("/search/{string_query}", response_model=List[validation_models.AccommodationOut], status_code=status.HTTP_200_OK)
async def search_filter_accommodation(string_query: str):
    return filter_services.search_accommodation_by_name(string_query)


@router.post("/amenity", response_model=List[validation_models.AccommodationOut], status_code=status.HTTP_200_OK)
async def filter_amenities(amenity_ids: List[validation_models.AmenityIDFilter]):
    return filter_amenities.filter_accommodation_by_amenities(amenity_ids)