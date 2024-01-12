from fastapi import APIRouter, status, Depends, HTTPException
from typing import List, Dict
import ultraimport
filter_services = ultraimport("__dir__/../services/filter_services.py")
validation_models = ultraimport("__dir__/../models/validation_models.py")

router = APIRouter(prefix="/filter", tags=["FILTER"])

@router.post("/search/{string_query}", response_model=List[validation_models.AccommodationOut], status_code=status.HTTP_200_OK)
async def search_filter_accommodation(string_query: str):
    """
- API nhận vào một chuỗi và trả về các khách sạn có tên chứa chuỗi đó.
- Status code: 
    - 200: Thành công.
    - 422: Truyền dữ liệu sai.
    """
    return filter_services.search_accommodation_by_name(string_query)


@router.post("/amenity", response_model=List[validation_models.AccommodationOut], status_code=status.HTTP_200_OK)
async def filter_amenities(amenity_ids: List[validation_models.AmenityIDFilter]):
    """
- API nhận vào 1 list các tiện ích khách sạn và trả lại các khách sạn có những tiện ích đó.
- Status code: 
    - 200: Thành công
    - 422: Truyền dữ liệu sai.
    """
    return filter_services.filter_accommodation_by_amenities(amenity_ids)

@router.post("/price", response_model=List[validation_models.AccommodationOut], status_code=status.HTTP_200_OK)
async def filter_prices(price_range: validation_models.PriceRangeFilter):
    """
- API filter khách sạn theo giá min và max.
- Status code: 
    - 200: Thành công
    - 422: Truyền dữ liệu sai.
    """
    return filter_services.filter_accommodation_by_price(price_range)

@router.post("/location/{location_str}", response_model=List[validation_models.AccommodationOut], status_code=status.HTTP_200_OK)
async def filter_location(location_str: str):
    """
- API filter khách sạn theo địa điểm.
- Status code:
    - 200: Thành công.
    - 422: Truyền dữ liệu sai.
    """
    return filter_services.filter_accommodations_by_location(location_str)