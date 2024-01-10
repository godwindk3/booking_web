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
    """
- API lấy ra thông tin tất cả các phòng.
- Trả về 200 là lấy thông tin thành công.
- Cần role admin để gọi API.
    """
    if (current_user_data.role < 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return room_services.get_all_rooms()


@router.get("/{room_id}/unavailable_dates", response_model=List[validation_models.CheckInOutDates], status_code=status.HTTP_200_OK)
async def fetch_unavailable_dates(room_id: int):
    """
- Hàm nhận room_id (ID của phòng) để lấy ra các ngày đã có khách đặt trước phòng có ID 
đó.
- Status code:
    - 200: Thành công.
    - 422: Truyền thông tin không hợp lệ.
    - 404: Phòng với ID đó không tồn tại.

    """

    return room_services.get_exist_dates(room_id)


@router.post("/", response_model=validation_models.RoomOut, status_code=status.HTTP_201_CREATED)
async def create_room(room: validation_models.Room, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- Hàm nhận accommodationID (ID của khách sạn), room_name (tên phòng), capacity (sức 
chứa), price (giá tiền / đêm), status (tình trạng của phòng), tier (hạng phòng) và info 
(thông tin phòng) để tạo một phòng mới của khách sạn có ID đó.
- Cần role admin hoặc manager quản lý khách sạn chứa phòng đó mới được gọi API.
- Status code:
    - 201: Thành công.
    - 400: Truyền thông tin sai logic.
    - 422: Truyền thông tin ko hợp lệ.
    - 401: Chưa đăng nhập
    - 403: Không có quyền.
    """
    
    if (current_user_data.role < 1):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permisison.")
    elif (current_user_data.role == 1):
        manager = manager_services.get_manager_by_user_id(current_user_data.id)
        if (manager.accommodationID != room.accommodationID):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return room_services.create_room(room)


@router.put("/{room_id}", response_model=validation_models.Room, status_code=status.HTTP_200_OK)
async def update_room(room_id: int, room: validation_models.Room, current_user_data: validation_models.Room = Depends(oauth2.get_current_user)):
    """
- Hàm nhận room_id (ID của phòng), accommodationID (ID của khách sạn), room_name 
(tên phòng), capacity (sức chứa), price (giá tiền / đêm), status (tình trạng của phòng), 
tier (hạng phòng) và info (thông tin phòng) để cập nhật thông tin một phòng có ID đó.
- Cần role admin hoặc manager quản lý khách sạn chứa phòng đó mới được gọi API.
- Status code:
    - 200: Thành công.
    - 401: Chưa đăng nhập.
    - 403: Không có quyền.
    - 404: Phòng với ID đó không tồn tại.
    - 422: Truyền dữ liệu không hợp lệ.
    """
    
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
    """
- Hàm nhận room_id (ID của phòng) để xoá phòng có ID đó.
- Trả về 200 là xoá thành công, 422 là xoá không thành công hoặc lỗi.
- Status code:
    - 200: Thành công.
    - 401: Chưa đăng nhập.
    - 403: Không có quyền.
    - 404: Phòng với ID đó không tồn tại.
    - 422: Truyền dữ liệu không hợp lệ.
    """
    
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
