from fastapi import APIRouter, status, Depends, HTTPException
from typing import List
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
accommodation_services = ultraimport(
    "__dir__/../services/accommodation_services.py")
room_services = ultraimport("__dir__/../services/room_services.py")
oauth2 = ultraimport("__dir__/../services/oauth2.py")
manager_services = ultraimport("__dir__/../services/manager_services.py")

router = APIRouter(prefix="/room", tags=["ROOM"])


@router.get("/", response_model=List[validation_models.RoomOut], status_code=status.HTTP_200_OK)
async def fetch_all_rooms(current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return room_services.get_all_rooms()


@router.get("/{room_id}/unavailable_dates", response_model=List[validation_models.CheckInOutDates], status_code=status.HTTP_200_OK)
async def fetch_unavailable_dates(room_id: int):
    return room_services.get_exist_dates(room_id)


@router.post("/", response_model=validation_models.RoomOut, status_code=status.HTTP_201_CREATED)
async def create_room(room: validation_models.Room, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 1):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permisison.")
    elif (current_user_data.role == 1):
        manager = manager_services.get_manager_by_user_id(current_user_data.id)
        if (manager.accommodationID != room.accommodationID):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="No permisison.")
    return room_services.create_room(room)


@router.put("/{room_id}", response_model=validation_models.Room, status_code=status.HTTP_200_OK)
async def update_room(room_id: int, room: validation_models.Room, current_user_data: validation_models.Room = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 1):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permisison.")
    elif (current_user_data.role == 1):
        manager = manager_services.get_manager_by_user_id(current_user_data.id)
        if (manager.accommodationID != room.accommodationID):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="No permisison.")
    return room_services.update_room(room_id, room)


@router.delete("/{room_id}", response_model=validation_models.RoomOut, status_code=status.HTTP_200_OK)
async def delete_room(room_id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 1):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permisison.")
    elif (current_user_data.role == 1):
        room = room_services.get_room_by_id(room_id)
        manager = manager_services.get_manager_by_user_id(current_user_data.id)
        if (manager.accommodationID != room.accommodationID):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="No permisison.")

    return room_services.delete_room(room_id)
