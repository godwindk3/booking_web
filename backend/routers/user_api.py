from fastapi import APIRouter, status, Depends
from typing import List
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")

user_services = ultraimport("__dir__/../services/user_services.py")
oauth2 = ultraimport("__dir__/../services/oauth2.py")
accommodation_services = ultraimport("__dir__/../services/accommodation_services.py")
room_services = ultraimport("__dir__/../services/room_services.py")
booking_services = ultraimport("__dir__/../services/booking_services.py")
review_services = ultraimport("__dir__/../services/review_services.py")

router = APIRouter(prefix="/user")

@router.get("/", response_model=validation_models.UserOut, status_code=status.HTTP_200_OK)
async def fetch_current_user_info(current_user_data: validation_models.TokenData = Depends(oauth2.get_current_user)):
    return user_services.get_user_by_id(current_user_data.id)


@router.put("/", response_model=validation_models.UserOut, status_code=status.HTTP_200_OK)
async def update_current_user_info(user: validation_models.User, current_user_data: validation_models.TokenData = Depends(oauth2.get_current_user)):
    return user_services.update_user(current_user_data.id, user)


@router.delete("/", response_model=validation_models.UserOut, status_code=status.HTTP_200_OK)
async def delete_current_user(current_user_data: validation_models.TokenData = Depends(oauth2.get_current_user)):
    return user_services.delete_user(current_user_data.id)


