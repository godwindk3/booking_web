from fastapi import APIRouter, status, Depends, HTTPException
from typing import List
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
accommodation_services = ultraimport(
    "__dir__/../services/accommodation_services.py")
room_services = ultraimport("__dir__/../services/room_services.py")
review_services = ultraimport("__dir__/../services/review_services.py")
manager_services = ultraimport("__dir__/../services/manager_services.py")
oauth2 = ultraimport("__dir__/../services/oauth2.py")
payment_services = ultraimport("__dir__/../services/payment_services.py")

router = APIRouter(prefix="/accommodation", tags=["ACCOMMODATION"])


@router.get("/", response_model=List[validation_models.AccommodationOut], status_code=status.HTTP_200_OK)
async def fetch_all_accommodations():
    return accommodation_services.get_all_accommodations()


@router.get("/{id}", response_model=validation_models.AccommodationOut, status_code=status.HTTP_200_OK)
async def fetch_accommodations_by_id(id: int):
    return accommodation_services.get_accommodation_by_id(id)


@router.get("/{id}/rooms", response_model=List[validation_models.RoomOut], status_code=status.HTTP_200_OK)
async def get_rooms_by_acco_id(id: int):
    return room_services.get_rooms_by_accommodation_id(id)


@router.get("/{id}/get_payment_methods", response_model=List[validation_models.PaymentOut], status_code=status.HTTP_200_OK)
async def fetch_payment_methods_by_acco_id(id: int):
    return payment_services.get_payment_methods_from_acco_id(id)


@router.get("/{id}/reviews", response_model=List[validation_models.ReviewOut], status_code=status.HTTP_200_OK)
async def fetch_reviews_by_accommodation_id(id: int):
    return review_services.get_reviews_in_accommodation(id)

@router.get("/{id}/get_manager", response_model=validation_models.UserOut, status_code=status.HTTP_200_OK)
async def fetch_manager_by_acco_id(id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    manager = accommodation_services.get_manager(id)
    if (current_user_data.role < 1):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"No permission.")

    return manager



@router.post("/", response_model=validation_models.AccommodationOut, status_code=status.HTTP_201_CREATED)
async def create_accommodation(accommodation: validation_models.Accomodation, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 1):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"No permission.")

    acco = accommodation_services.create_accommodation(accommodation)
    if (current_user_data.role != 2):
        manager = validation_models.Manager(
            userID=current_user_data.id, accommodationID=acco.id)
        manager_services.create_manager(manager)
    return acco

@router.post("/{id}/add_payment_method/{payment_id}", response_model=validation_models.AccommodationPaymentOut, status_code=status.HTTP_201_CREATED)
async def add_payment_method(id: int, payment_id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):

    if (current_user_data.role < 1):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No permisison.")
    elif (current_user_data.role == 1):
        manager = manager_services.get_manager_by_user_id(current_user_data.id)
        if (manager.accommodationID != id):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return payment_services.add_payment_method_to_accommodation(payment_id, id)


@router.put("/{id}", response_model=validation_models.AccommodationOut, status_code=status.HTTP_200_OK)
async def update_accommodation(id: int, accommodation: validation_models.Accomodation, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role == 0):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    
    if (current_user_data.role == 1): 
        manager = manager_services.get_manager_by_user_id(current_user_data.id)
        if (manager.accommodationID != id):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
        
    return accommodation_services.update_accommodation(id, accommodation)


@router.delete("/{id}", response_model=validation_models.AccommodationOut, status_code=status.HTTP_200_OK)
async def delete_accommodation(id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 1):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    if (current_user_data.role == 1): 
        manager = manager_services.get_manager_by_user_id(current_user_data.id)
        if (manager.accommodationID != id):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return accommodation_services.delete_accommodation(id)


@router.delete("/{id}/remove_payment/{payment_id}", response_model=validation_models.AccommodationPaymentOut, status_code=status.HTTP_200_OK)
async def remove_payment_method(id: int, payment_id: int):
    return payment_services.remove_payment_method_from_accommodation(id, payment_id)