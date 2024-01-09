from fastapi import APIRouter, status, Depends, HTTPException
from typing import List
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
oauth2 = ultraimport("__dir__/../services/oauth2.py")
payment_services = ultraimport("__dir__/../services/payment_services.py")

router = APIRouter(prefix="/payment", tags=["PAYMENT"])


@router.get("/get_payments", response_model=List[validation_models.PaymentOut], status_code=status.HTTP_200_OK)
async def fetch_all_payments():
    """
- API lấy ra tất cả các phương thức giao dịch.
- Trả về 200 là lấy thành công.
    """
    return payment_services.get_all_payments()


@router.get("/get_payments/{payment_id}", response_model=validation_models.PaymentOut, status_code=status.HTTP_200_OK)
async def fetch_payment_by_id(payment_id: int):
    """
- Hàm nhận payment_id (ID của phương thức giao dịch) để lấy ra thông tin của phương thức giao dịch có ID đó.
- Trả về 200 là lấy thành công, 422 là lấy không thành công hoặc lỗi.
    """
    return payment_services.get_payment_by_id(payment_id)


@router.post("/create_payment", response_model=validation_models.PaymentOut, status_code=status.HTTP_201_CREATED)
async def create_payment(payment: validation_models.Payment, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- Hàm nhận payment_method (phương thức thanh toán) để tạo ra một phương thức giao dịch mới.
- Trả về 201 là tạo thành công, 422 là tạo không thành công hoặc lỗi.
- Cần role admin để gọi API.
    """
    
    if (current_user_data.role != 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return payment_services.create_payment(payment)


@router.put("/update_payments/{payment_id}", response_model=validation_models.PaymentOut, status_code=status.HTTP_200_OK)
async def update_payment(payment_id: int, payment: validation_models.Payment, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- Hàm nhận payment_id (ID của giao dịch) và payment_method (phương thức thanh toán) 
để cập nhật phương thức giao dịch đó.
- Trả về 200 là cập nhật thành công, 422 là cập nhật không thành công hoặc lỗi.
- Cần role admin để gọi API.

    """
    
    if (current_user_data.role != 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return payment_services.update_payment(payment_id, payment)


@router.delete("/delete_payment/{payment_id}", response_model=validation_models.PaymentOut, status_code=status.HTTP_200_OK)
async def delete_payment(payment_id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    """
- Hàm nhận payment_id (ID của giao dịch) để xoá giao dịch có ID đó.
- Trả về 200 là xoá thành công, 422 là xoá không thành công hoặc lỗi.
- Cần role admin để gọi API.
    """
    
    if (current_user_data.role != 2):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return payment_services.delete_payment(payment_id)
