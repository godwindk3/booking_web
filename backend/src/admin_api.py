from fastapi import APIRouter, status
from database import SessionLocal
from typing import List
import validation_models
import user_services

router = APIRouter(prefix="/admin")


db = SessionLocal()


@router.get("/")
async def test_router():
    return user_services.test()


# API to manage Users
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



