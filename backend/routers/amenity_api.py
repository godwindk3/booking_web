from fastapi import APIRouter, status, Depends, HTTPException
from typing import List
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
accommodation_services = ultraimport(
    "__dir__/../services/accommodation_services.py")
room_services = ultraimport("__dir__/../services/room_services.py")
oauth2 = ultraimport("__dir__/../services/oauth2.py")
manager_services = ultraimport("__dir__/../services/manager_services.py")
acco_ammenity_services = ultraimport(
    "__dir__/../services/acco_ammenity_services.py")
room_ammenity_services = ultraimport(
    "__dir__/../services/room_ammenity_services.py")

router = APIRouter(prefix="/amenity", tags=["AMENITY"])


@router.get("/get_room_amenities", response_model=List[validation_models.RoomAmenityOut], status_code=status.HTTP_200_OK)
async def fetch_all_room_amenities():
    return room_ammenity_services.get_all_room_ammenities()


@router.get("/get_accommodation_amenities", response_model=List[validation_models.AccommodationAmenityOut], status_code=status.HTTP_200_OK)
async def fetch_all_accommodation_amenities():
    return acco_ammenity_services.get_all_acco_ammenities()


@router.get("/get_room_amenities/{amenity_id}", response_model=validation_models.RoomAmenityOut, status_code=status.HTTP_200_OK)
async def fetch_room_amenity_by_id(amenity_id: int):
    return room_ammenity_services.get_room_ammenity_by_id(amenity_id)


@router.get("/get_accommodation_amenities/{amenity_id}", response_model=validation_models.AccommodationAmenityOut, status_code=status.HTTP_200_OK)
async def fetch_accommodation_amenity_by_id(amenity_id: int):
    return acco_ammenity_services.get_acco_ammenity_by_id(amenity_id)


@router.post("/room", response_model=validation_models.RoomAmenityOut, status_code=status.HTTP_201_CREATED)
async def create_new_room_amenity(room_amenity: validation_models.RoomAmenity, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return room_ammenity_services.create_room_ammenity(room_amenity)


@router.post("/accommodation", response_model=validation_models.AccommodationAmenityOut, status_code=status.HTTP_201_CREATED)
async def create_new_accommodation_amenity(accommodation_amenity: validation_models.AccommodationAmenity, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")

    return acco_ammenity_services.create_acco_ammenity(accommodation_amenity)


@router.post("/room/attach", response_model=validation_models.RoomAmenityRef, status_code=status.HTTP_201_CREATED)
async def attach_new_amenity_to_room(amenity_ref: validation_models.RoomAmenityRef, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role == 0):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    elif (current_user_data.role == 1):
        acco_id = manager_services.get_manager_by_user_id(
            current_user_data.id).accommodationID
        room = room_services.get_room_by_id(amenity_ref.roomID)
        if (room.accommodationID != acco_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return room_ammenity_services.add_ammenity_to_room(amenity_ref)


@router.post("/accommodation/attach", response_model=validation_models.AccommodationAmenityRef, status_code=status.HTTP_201_CREATED)
async def attach_new_amenity_to_accommodation(amenity_ref: validation_models.AccommodationAmenityRef, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role == 0):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    elif (current_user_data.role == 1):
        acco_id = manager_services.get_manager_by_user_id(
            current_user_data.id).accommodationID
        if (amenity_ref.accommodationID != acco_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")

    return acco_ammenity_services.add_amenity_to_accommodation(amenity_ref)


@router.delete("/room/detach/{room_id}/{amenity_id}", response_model=validation_models.RoomAmenityRef, status_code=status.HTTP_200_OK)
async def detach_amenity_from_room(room_id: int, amenity_id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role == 0):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    elif (current_user_data.role == 1):
        acco_id = manager_services.get_manager_by_user_id(
            current_user_data.id).accommodationID
        room = room_services.get_room_by_id(room_id)

        if (room.accommodationID != acco_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")

    return room_ammenity_services.delete_ammenity_from_room(amenity_id, room_id)


@router.delete("/accommodation/detach/{accommodation_id}/{amenity_id}", response_model=validation_models.AccommodationAmenityRef, status_code=status.HTTP_200_OK)
async def detach_amenity_from_accommodation(accommodation_id: int, amenity_id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role == 0):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    elif (current_user_data.role == 1):
        acco_id = manager_services.get_manager_by_user_id(
            current_user_data.id).accommodationID
        if (accommodation_id != acco_id):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")

    return acco_ammenity_services.delete_amenity_from_accommodation(amenity_id, accommodation_id)


@router.put("/room/{amenity_id}", response_model=validation_models.RoomAmenityOut, status_code=status.HTTP_200_OK)
async def update_room_amenity(amenity_id: int, amenity: validation_models.RoomAmenity, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return room_ammenity_services.update_room_ammenity(amenity_id, amenity)


@router.put("/accommodation/{amenity_id}", response_model=validation_models.AccommodationAmenityOut, status_code=status.HTTP_200_OK)
async def update_accommodation_amenity(amenity_id: int, amenity: validation_models.AccommodationAmenity, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return acco_ammenity_services.update_acco_ammenity(amenity_id, amenity)


@router.delete("/room/{amenity_id}", response_model=validation_models.RoomAmenityOut, status_code=status.HTTP_200_OK)
async def delete_room_amenity(amenity_id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")

    return room_ammenity_services.delete_room_ammenity(amenity_id)


@router.delete("/accommodation/{amenity_id}", response_model=validation_models.AccommodationAmenityOut, status_code=status.HTTP_200_OK)
async def delete_accommodation_amenity(amenity_id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return acco_ammenity_services.delete_acco_ammenity(amenity_id)
