from fastapi import APIRouter, status, Depends, HTTPException
from typing import List
import ultraimport
oauth2 = ultraimport("__dir__/../services/oauth2.py")
validation_models = ultraimport("__dir__/../models/validation_models.py")
review_services = ultraimport("__dir__/../services/review_services.py")

router = APIRouter(prefix="/review", tags=["REVIEW"])


@router.get("/get_all", response_model=List[validation_models.ReviewOut], status_code=status.HTTP_200_OK)
async def fetch_all_reviews(current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- API lấy ra tất cả Reviews.
- Trả về 200 là lấy thành công.
- Cần role admin để gọi API.

    """
    
    if (current_user_data.role < 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return review_services.get_all_reviews()


@router.get("/get_by_id/{review_id}", response_model=validation_models.ReviewOut, status_code=status.HTTP_200_OK)
async def fetch_review_by_id(review_id: int):
    """
- Hàm nhận review_id (ID của review) để lấy ra review có ID đó.
- Trả về 200 là lấy thành công, 422 là lấy không thành công hoặc lỗi.

    """
    return review_services.get_review_by_id(review_id)


@router.get("/get_user_reviews/{user_id}", response_model=List[validation_models.ReviewOut], status_code=status.HTTP_200_OK)
async def fetch_reviews_by_user_id(user_id: int):
    """
- Hàm nhận user_id (ID của người dùng) để lấy ra tất cả review của người dùng có ID đó.
- Trả về 200 là lấy thành công, 422 là lấy không thành công hoặc lỗi.
    """
    return review_services.get_reviews_of_user(user_id)


@router.get("/get_reviews_of_accommodation/{accommodation_id}", response_model=List[validation_models.ReviewOut], status_code=status.HTTP_200_OK)
async def fetch_reviews_of_accommodation(accommodation_id: int):
    """
- Hàm nhận accommodation_id (ID của khách sạn) để lấy ra review về khách sạn có ID đó.
- Trả về 200 là lấy thành công, 422 là lấy không thành công hoặc lỗi.
    """
    return review_services.get_reviews_of_accommodation(accommodation_id)


@router.post("/create", response_model=validation_models.ReviewOut, status_code=status.HTTP_201_CREATED)
async def create_review(review: validation_models.Review):
    """
- Hàm nhận userID (ID của người dùng), bookingID (ID của đơn đặt phòng), rating (điểm 
người dùng chấm) và comment (bình luận của người dùng) để tạo một review cho đơn 
đặt phòng của người dùng.
- Trả về 201 là tạo thành công, 422 là tạo không thành công hoặc lỗi.

    """
    return review_services.create_review(review)


@router.put("/edit/{review_id}", response_model=validation_models.ReviewOut, status_code=status.HTTP_200_OK)
async def update_review(review_id: int, review: validation_models.Review, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- Hàm nhận review_id (ID của review), userID (ID của người dùng), bookingID (ID của đơn 
đặt phòng), rating (điểm người dùng chấm) và comment (bình luận của người dùng) để
cập nhật một review cho đơn đặt phòng của người dùng
- Trả về 200 là cập nhật thành công, 422 là cập nhật không thành công hoặc lỗi
- Cần phải là chủ sở hữu của review, hoặc admin mới được gọi API.
    """

    rev = review_services.get_review_by_id(review_id)
    if (current_user_data.id != rev.userID):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")

    return review_services.update_review(review_id, review)


@router.delete("/delete/{review_id}", response_model=validation_models.ReviewOut, status_code=status.HTTP_200_OK)
async def delete_review(review_id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- Hàm nhận review_id (ID của review) để xoá đi review có ID đó
- Trả về 200 là xoá thành công, 422 là xoá không thành công hoặc lỗi
- Cần phải là chủ sở hữu của review, hoặc admin mới được gọi API.
    """
    rev = review_services.get_review_by_id(review_id)
    if (current_user_data.id != rev.userID):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return review_services.delete_review(review_id)
