from fastapi import APIRouter, status
from database import SessionLocal
from typing import List
import validation_models
import user_services, accommodation_services


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


@router.post("/accommodations", response_model=validation_models.Accomodation, status_code=status.HTTP_200_OK)
async def create_accommodation(accommodation:validation_models.Accomodation):
    return accommodation_services.create_accommodation(accommodation)

@router.put("/accommodations/{id}", response_model=validation_models.Accomodation, status_code=status.HTTP_200_OK)
async def update_accommodation(id: int, accommodation :validation_models.Accomodation):
    return accommodation_services.update_accommodation(id, accommodation)

@router.delete("/accommodations/{id}", response_model=validation_models.Accomodation, status_code=status.HTTP_200_OK)
async def delete_accommodation(id: int):
    return accommodation_services.delete_accommodation(id)






