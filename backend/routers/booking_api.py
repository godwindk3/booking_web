from fastapi import APIRouter, status, Depends, HTTPException
from typing import List
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")

user_services = ultraimport("__dir__/../services/user_services.py")
oauth2 = ultraimport("__dir__/../services/oauth2.py")
accommodation_services = ultraimport(
    "__dir__/../services/accommodation_services.py")
room_services = ultraimport("__dir__/../services/room_services.py")
booking_services = ultraimport("__dir__/../services/booking_services.py")
review_services = ultraimport("__dir__/../services/review_services.py")

router = APIRouter(prefix="/booking", tags=["BOOKING"])


@router.get("/", response_model=List[validation_models.BookingOut], status_code=status.HTTP_200_OK)
async def fetch_bookings_of_current_user(current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- API lấy ra thông tin đặt phòng của người dùng hiện tại gồm ID khách sạn, ID phòng, ngày 
checkin/checkout và giá tiền.
- Status code:
    - 200: Thành công.
    - 401: Chưa đăng nhập.
    """
    return booking_services.get_bookings_of_user(current_user_data.id)


@router.post("/", response_model=validation_models.BookingOut, status_code=status.HTTP_201_CREATED)
async def create_booking_by_current_user(booking: validation_models.Booking, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- Hàm nhận userID (ID của người dùng), acommodationID (ID của khách sạn), roomID (ID 
của phòng), checkin_date (ngày checkin), checkout_date (ngày checkout) và total_price 
(tổng giá tiền) dùng cho việc đặt phòng của người dùng hiện tại.
- Status code:
    - 201: Thành công.
    - 403: Không có quyền.
    - 401: Chưa đăng nhập.

    """
    if (current_user_data.role == 0 and current_user_data.id != booking.userID):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"No permission")
    return booking_services.create_booking(booking)


@router.put("/{booking_id}", response_model=validation_models.BookingOut, status_code=status.HTTP_200_OK)
async def update_booking_by_id(booking_id: int, booking: validation_models.Booking, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- Hàm nhận booking_id (ID của đơn đặt phòng), userID (ID của người dùng), 
acommodationID (ID của khách sạn), roomID (ID của phòng), checkin_date (ngày 
checkin), checkout_date (ngày checkout) và total_price (tổng giá tiền) dùng cho việc cập 
nhật thông tin đơn đặt phòng của người dùng hiện tại.
- Status code:
    - 200: Thành công.
    - 403: Không có quyền.
    - 401: Chưa đăng nhập.
    - 400: Thông tin trùng hoặc không hợp lệ về logic.
    - 422: Thông tin không hợp lệ.
    """
    if (current_user_data.role == 0 and current_user_data.id != booking.userID):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"No permission")
    return booking_services.update_booking(booking_id, booking)


@router.delete("/{booking_id}", response_model=validation_models.BookingOut, status_code=status.HTTP_200_OK)
async def delete_booking_by_id(booking_id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- Hàm nhận booking_id (ID của đơn đặt phòng) để xoá đơn đặt phòng.
- Status code:
    - 200: Thành công.
    - 403: Không có quyền.
    - 401: Chưa đăng nhập.
    - 422: Thông tin không hợp lệ.
    """
    booking = booking_services.get_booking_by_id(booking_id)
    if (current_user_data.role == 0 and current_user_data.id != booking.userID):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"No permission")
    return booking_services.delete_booking(booking_id)
