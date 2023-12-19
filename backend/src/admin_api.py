from fastapi import APIRouter, status
from database import SessionLocal
from typing import List
import validation_models
import user_services
import accommodation_services
import room_services


router = APIRouter(prefix="/admin")


db = SessionLocal()


@router.get("/")
async def test_router():
    return user_services.test()


# Users
@router.get("/users", response_model=List[validation_models.User], status_code=status.HTTP_200_OK)
async def fetch_all_users():
    return user_services.get_all_users()


@router.get("/users/{user_id}", response_model=validation_models.User, status_code=status.HTTP_200_OK)
async def fetch_user_by_id(user_id: int):
    return user_services.get_user_by_id(user_id)


@router.post("/users", response_model=validation_models.User, status_code=status.HTTP_201_CREATED)
async def create_new_user(user: validation_models.User):
    return user_services.create_user(user)


@router.put("/users/{user_id}", response_model=validation_models.User, status_code=status.HTTP_200_OK)
async def update_user_by_id(user_id: int, user: validation_models.User):
    return user_services.update_user(user_id, user)


@router.delete("/users/{user_id}", response_model=validation_models.User, status_code=status.HTTP_200_OK)
async def delete_user_by_id(user_id: int):
    return user_services.delete_user(user_id)


# Accommodations
@router.get("/accommodations", response_model=List[validation_models.Accomodation], status_code=status.HTTP_200_OK)
async def fetch_accommodations():
    return accommodation_services.get_all_accommodations()


@router.get("/accommodations/{id}", response_model=validation_models.Accomodation, status_code=status.HTTP_200_OK)
async def fetch_accommodations_by_id(id: int):
    return accommodation_services.get_accommodation_by_id(id)


@router.get("/accommodations/{id}/rooms", response_model=List[validation_models.Room], status_code=status.HTTP_200_OK)
async def get_rooms_by_acco_id(id: int):
    return room_services.get_rooms_by_accommodation_id(id)


@router.get("/accommodations/{id}/rooms/{room_number}", response_model=validation_models.Room, status_code=status.HTTP_200_OK)
async def get_room_by_room_number(id: int, room_number: int):
    return room_services.get_specific_room_by_acco_and_room_number(id, room_number)


@router.post("/accommodations", response_model=validation_models.Accomodation, status_code=status.HTTP_201_CREATED)
async def create_accommodation(accommodation: validation_models.Accomodation):
    return accommodation_services.create_accommodation(accommodation)


@router.put("/accommodations/{id}", response_model=validation_models.Accomodation, status_code=status.HTTP_200_OK)
async def update_accommodation(id: int, accommodation: validation_models.Accomodation):
    return accommodation_services.update_accommodation(id, accommodation)


@router.delete("/accommodations/{id}", response_model=validation_models.Accomodation, status_code=status.HTTP_200_OK)
async def delete_accommodation(id: int):
    return accommodation_services.delete_accommodation(id)


# Rooms
@router.get("/rooms", response_model=List[validation_models.Room], status_code=status.HTTP_200_OK)
async def fetch_all_rooms():
    return room_services.get_all_rooms()

@router.get("/rooms/{room_id}",response_model=validation_models.Room, status_code=status.HTTP_200_OK)
async def fetch_room_by_id(room_id):
    return room_services.get_room_by_id(room_id)


@router.post("/rooms", response_model=validation_models.Room, status_code=status.HTTP_201_CREATED)
async def create_room(room: validation_models.Room):
    return room_services.create_room(room)


@router.put("/rooms/{room_id}")
async def update_room(room_id: int, room: validation_models.Room):
    return room_services.update_room(room_id, room)


@router.delete("/rooms/{room_id}", response_model=validation_models.Room, status_code=status.HTTP_200_OK)
async def delete_room(room_id: int):
    return room_services.delete_room(room_id)

