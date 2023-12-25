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

router = APIRouter(prefix="/booking")

@router.get("/", response_model=List[validation_models.BookingOut], status_code=status.HTTP_200_OK)
async def fetch_bookings_of_current_user(current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    return booking_services.get_bookings_of_user(current_user_data.id)

@router.post("/", response_model=validation_models.BookingOut, status_code=status.HTTP_201_CREATED)
async def create_booking_by_current_user(booking: validation_models.Booking, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    return booking_services.create_booking(booking)

@router.put("/", response_model=validation_models.BookingOut, status_code=status.HTTP_200_OK)
async def update_booking_by_id(booking_id: int, booking: validation_models.Booking, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    return booking_services.update_booking(booking_id, booking)

@router.delete("/", response_model=validation_models.BookingOut, status_code=status.HTTP_200_OK)
async def delete_booking_by_id(booking_id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    return booking_services.delete_booking(booking_id)