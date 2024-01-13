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
manager_services = ultraimport("__dir__/../services/manager_services.py")

router = APIRouter(prefix="/user", tags=["USER"])


@router.get("/", response_model=validation_models.UserOut, status_code=status.HTTP_200_OK)
async def fetch_current_user_info(current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- API lấy ra thông tin của người dùng hiện tại.
- Status code:
    - 200: Thành công.
    - 401: Chưa đăng nhập.

    """
    if (current_user_data is None):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Unauthorized.")
    return user_services.get_user_by_id(current_user_data.id)

@router.get("/{user_id}", response_model=validation_models.UserOut, status_code=status.HTTP_200_OK)
async def fetch_user_by_id(user_id: int):
    return user_services.get_user_by_id(user_id)


@router.get("/get_managed_accommodation", response_model=List[validation_models.AccommodationOut], status_code=status.HTTP_200_OK)
async def fetch_manager_accommodation(current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- API lấy ra thông tin của khách sạn mà người dùng hiện tại quản lý.
- Status code:
    - 200: Thành công.
    - 401: Chưa đăng nhập.
    """
    if (current_user_data.role < 1):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")

    return manager_services.get_accommodation_by_userID(current_user_data.id)


@router.put("/", response_model=validation_models.UserOut, status_code=status.HTTP_200_OK)
async def update_current_user_info(user: validation_models.User, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- Hàm nhận name (tên người dùng), email (tài khoản email), password (mật khẩu), role 
(nhận các giá trị 0, 1 hoặc 2) dùng để cập nhật thông tin tài khoản. Role 0 dành cho tài 
khoản người dùng bình thường, role 1 dành cho tài khoản của quản lý khách sạn, role 2 
dành cho tài khoản của admin.
- Status code:
    - 200: Thành công.
    - 422: Dữ liệu truyền vào không hợp lệ.
    - 401: Chưa đăng nhập.

    """
    if (user.role == 2 and current_user_data.role < 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"No permission.")
    return user_services.update_user(current_user_data.id, user)


@router.delete("/", response_model=validation_models.UserOut, status_code=status.HTTP_200_OK)
async def delete_current_user(current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- API dùng để xoá tài khoản người dùng hiện tại.
- Status code:
    - 200: Thành công.
    - 401: Chưa đăng nhập.
    """
    return user_services.delete_user(current_user_data.id)
