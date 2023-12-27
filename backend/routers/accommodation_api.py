from fastapi import APIRouter, status, Depends, HTTPException
from typing import List
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
accommodation_services = ultraimport(
    "__dir__/../services/accommodation_services.py")
room_services = ultraimport("__dir__/../services/room_services.py")
review_services = ultraimport("__dir__/../services/review_services.py")
manager_services = ultraimport("__dir__/../services/manager_services.py")
oauth2 = ultraimport("__dir__/../services/oauth2.py")

router = APIRouter(prefix="/accommodation", tags=["ACCOMMODATION"])


@router.get("/", response_model=List[validation_models.AccommodationOut], status_code=status.HTTP_200_OK)
async def fetch_all_accommodations():
    return accommodation_services.get_all_accommodations()


@router.get("/{id}", response_model=validation_models.AccommodationOut, status_code=status.HTTP_200_OK)
async def fetch_accommodations_by_id(id: int):
    return accommodation_services.get_accommodation_by_id(id)


@router.get("/{id}/rooms", response_model=List[validation_models.RoomOut], status_code=status.HTTP_200_OK)
async def get_rooms_by_acco_id(id: int):
    return room_services.get_rooms_by_accommodation_id(id)


@router.get("/{id}/rooms/{room_number}", response_model=validation_models.RoomOut, status_code=status.HTTP_200_OK)
async def get_room_by_room_number(id: int, room_number: int):
    return room_services.get_specific_room_by_acco_and_room_number(id, room_number)


@router.get("/{id}/reviews", response_model=List[validation_models.ReviewOut], status_code=status.HTTP_200_OK)
async def fetch_reviews_by_accommodation_id(id: int):
    return review_services.get_reviews_in_accommodation(id)


@router.post("/", response_model=validation_models.AccommodationOut, status_code=status.HTTP_201_CREATED)
async def create_accommodation(accommodation: validation_models.Accomodation, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 1):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"No permission.")

    acco = accommodation_services.create_accommodation(accommodation)
    if (current_user_data.role != 2):
        manager = validation_models.Manager(
            userID=current_user_data.id, accommodationID=acco.id)
        manager_services.create_manager(manager)
    return acco


@router.put("/{id}", response_model=validation_models.AccommodationOut, status_code=status.HTTP_200_OK)
async def update_accommodation(id: int, accommodation: validation_models.Accomodation, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role == 0):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    
    if (current_user_data.role == 1): 
        manager = manager_services.get_manager_by_user_id(current_user_data.id)
        if (manager.accommodationID != id):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
        
    return accommodation_services.update_accommodation(id, accommodation)


@router.delete("/{id}", response_model=validation_models.AccommodationOut, status_code=status.HTTP_200_OK)
async def delete_accommodation(id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 1):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    if (current_user_data.role == 1): 
        manager = manager_services.get_manager_by_user_id(current_user_data.id)
        if (manager.accommodationID != id):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return accommodation_services.delete_accommodation(id)
