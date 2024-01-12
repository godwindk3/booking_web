from fastapi import APIRouter, status, Depends, HTTPException
from typing import List
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")

user_services = ultraimport("__dir__/../services/user_services.py")
accommodation_services = ultraimport(
    "__dir__/../services/accommodation_services.py")
room_services = ultraimport("__dir__/../services/room_services.py")
booking_services = ultraimport("__dir__/../services/booking_services.py")
review_services = ultraimport("__dir__/../services/review_services.py")
acco_ammenity_services = ultraimport(
    "__dir__/../services/acco_ammenity_services.py")
room_ammenity_services = ultraimport(
    "__dir__/../services/room_ammenity_services.py")

oauth2 = ultraimport("__dir__/../services/oauth2.py")

router = APIRouter(prefix="/admin", tags=["ADMIN"])


# Users
@router.get("/users", response_model=List[validation_models.UserOut], status_code=status.HTTP_200_OK)
async def fetch_all_users(current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 2):
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail="No permission.")
    return user_services.get_all_users()


@router.get("/users/{user_id}", response_model=validation_models.UserOut, status_code=status.HTTP_200_OK)
async def fetch_user_by_id(user_id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 2):
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail="No permission.")
    return user_services.get_user_by_id(user_id)


@router.post("/users", response_model=validation_models.UserOut, status_code=status.HTTP_201_CREATED)
async def create_new_user(user: validation_models.User, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 2):
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail="No permission.")
    return user_services.create_user(user)


@router.put("/users/{user_id}", response_model=validation_models.UserOut, status_code=status.HTTP_200_OK)
async def update_user_by_id(user_id: int, user: validation_models.User, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 2):
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail="No permission.")
    return user_services.update_user(user_id, user)


@router.delete("/users/{user_id}", response_model=validation_models.UserOut, status_code=status.HTTP_200_OK)
async def delete_user_by_id(user_id: int, current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role < 2):
        raise HTTPException(status.HTTP_403_FORBIDDEN, detail="No permission.")
    return user_services.delete_user(user_id)


# # Accommodations
# @router.get("/accommodations", response_model=List[validation_models.AccommodationOut], status_code=status.HTTP_200_OK)
# async def fetch_accommodations():
#     return accommodation_services.get_all_accommodations()


# @router.get("/accommodations/{id}", response_model=validation_models.AccommodationOut, status_code=status.HTTP_200_OK)
# async def fetch_accommodations_by_id(id: int):
#     return accommodation_services.get_accommodation_by_id(id)


# @router.get("/accommodations/{id}/rooms", response_model=List[validation_models.RoomOut], status_code=status.HTTP_200_OK)
# async def get_rooms_by_acco_id(id: int):
#     return room_services.get_rooms_by_accommodation_id(id)


# @router.get("/accommodations/{id}/rooms/{room_number}", response_model=validation_models.RoomOut, status_code=status.HTTP_200_OK)
# async def get_room_by_room_number(id: int, room_number: int):
#     return room_services.get_specific_room_by_acco_and_room_number(id, room_number)


# @router.get("/accommodations/{id}/reviews", response_model=List[validation_models.ReviewOut], status_code=status.HTTP_200_OK)
# async def fetch_reviews_by_accommodation_id(id: int):
#     return review_services.get_reviews_in_accommodation(id)


# @router.post("/accommodations", response_model=validation_models.AccommodationOut, status_code=status.HTTP_201_CREATED)
# async def create_accommodation(accommodation: validation_models.Accomodation):
#     return accommodation_services.create_accommodation(accommodation)


# @router.put("/accommodations/{id}", response_model=validation_models.AccommodationOut, status_code=status.HTTP_200_OK)
# async def update_accommodation(id: int, accommodation: validation_models.Accomodation):
#     return accommodation_services.update_accommodation(id, accommodation)


# @router.delete("/accommodations/{id}", response_model=validation_models.AccommodationOut, status_code=status.HTTP_200_OK)
# async def delete_accommodation(id: int):
#     return accommodation_services.delete_accommodation(id)


# # Rooms
# @router.get("/rooms", response_model=List[validation_models.RoomOut], status_code=status.HTTP_200_OK)
# async def fetch_all_rooms():
#     return room_services.get_all_rooms()


# @router.get("/rooms/{room_id}", response_model=validation_models.RoomOut, status_code=status.HTTP_200_OK)
# async def fetch_room_by_id(room_id):
#     return room_services.get_room_by_id(room_id)


# @router.get("/rooms/{room_id}/ammenities", response_model=List[validation_models.RoomAmenity], status_code=status.HTTP_200_OK)
# async def fetch_ammenities_of_room(room_id: int):
#     return room_ammenity_services.get_ammenities_of_room(room_id)


# @router.post("/rooms", response_model=validation_models.RoomOut, status_code=status.HTTP_201_CREATED)
# async def create_room(room: validation_models.Room):
#     return room_services.create_room(room)


# @router.put("/rooms/{room_id}")
# async def update_room(room_id: int, room: validation_models.RoomOut):
#     return room_services.update_room(room_id, room)


# @router.delete("/rooms/{room_id}", response_model=validation_models.RoomOut, status_code=status.HTTP_200_OK)
# async def delete_room(room_id: int):
#     return room_services.delete_room(room_id)


# # Bookings
# @router.get("/bookings", response_model=List[validation_models.BookingOut], status_code=status.HTTP_200_OK)
# async def fetch_all_bookings():
#     return booking_services.get_all_bookings()


# @router.get("/bookings/{booking_id}", response_model=validation_models.BookingOut, status_code=status.HTTP_200_OK)
# async def fetch_booking_by_id(booking_id: int):
#     return booking_services.get_booking_by_id(booking_id)


# @router.post("/bookings", response_model=validation_models.BookingOut, status_code=status.HTTP_201_CREATED)
# async def create_booking(booking: validation_models.Booking):
#     return booking_services.create_booking(booking)


# @router.put("/bookings/{booking_id}", response_model=validation_models.BookingOut, status_code=status.HTTP_200_OK)
# async def update_booking(booking_id: int, booking: validation_models.Booking):
#     return booking_services.update_booking(booking_id, booking)


# @router.delete("/bookings/{booking_id}", response_model=validation_models.BookingOut, status_code=status.HTTP_200_OK)
# async def delete_booking(booking_id: int):
#     return booking_services.delete_booking(booking_id)


# # Reviews
# @router.get("/reviews", response_model=List[validation_models.ReviewOut], status_code=status.HTTP_200_OK)
# async def fetch_all_reviews():
#     return review_services.get_all_reviews()


# @router.get("/reviews/{review_id}", response_model=validation_models.ReviewOut, status_code=status.HTTP_200_OK)
# async def fetch_review_by_id(review_id: int):
#     return review_services.get_review_by_id(review_id)


# @router.get("/reviews/user/{user_id}", response_model=List[validation_models.ReviewOut], status_code=status.HTTP_200_OK)
# async def fetch_reviews_by_user_id(user_id: int):
#     return review_services.get_reviews_of_user(user_id)


# @router.post("/reviews", response_model=validation_models.ReviewOut, status_code=status.HTTP_201_CREATED)
# async def create_review(review: validation_models.Review):
#     return review_services.create_review(review)


# @router.put("/reviews/{review_id}", response_model=validation_models.ReviewOut, status_code=status.HTTP_200_OK)
# async def update_review(review_id, review: validation_models.Review):
#     return review_services.update_review(review_id, review)


# @router.delete("/reviews/{review_id}", response_model=validation_models.ReviewOut, status_code=status.HTTP_200_OK)
# async def delete_review(review_id):
#     return review_services.delete_review(review_id)


# # Accommodation Ammenities
# @router.get("/ammenities/accommodations", response_model=List[validation_models.AccommodationAmenity], status_code=status.HTTP_200_OK)
# async def fetch_all_acco_ammenities():
#     return acco_ammenity_services.get_all_acco_ammenities()


# @router.get("/ammenities/accommodations/{ammenity_id}", response_model=validation_models.AccommodationAmenity, status_code=status.HTTP_200_OK)
# async def fetch_acco_ammenity_by_id(ammenity_id: int):
#     return acco_ammenity_services.get_acco_ammenity_by_id(ammenity_id)


# @router.post("/ammenities/accommodations", response_model=validation_models.AccommodationAmenity, status_code=status.HTTP_201_CREATED)
# async def create_acco_ammenity(ammenity: validation_models.AccommodationAmenity):
#     return acco_ammenity_services.create_acco_ammenity(ammenity)


# @router.put("/ammenities/accommodations/{ammenity_id}", response_model=validation_models.AccommodationAmenity, status_code=status.HTTP_200_OK)
# async def update_acco_ammenity(ammenity_id: int, ammenity: validation_models.AccommodationAmenity):
#     return acco_ammenity_services.update_acco_ammenity(ammenity_id, ammenity)


# @router.delete("/ammenities/accommodations/{ammenity_id}", response_model=validation_models.AccommodationAmenity, status_code=status.HTTP_200_OK)
# async def delete_acco_ammenity(ammenity_id: int):
#     return acco_ammenity_services.delete_acco_ammenity(ammenity_id)


# # Room Ammenities
# @router.get("/ammenities/rooms", response_model=List[validation_models.RoomAmenity], status_code=status.HTTP_200_OK)
# async def fetch_all_room_ammenities():
#     return room_ammenity_services.get_all_room_ammenities()


# @router.get("/ammenities/rooms/{ammenity_id}", response_model=validation_models.RoomAmenity, status_code=status.HTTP_200_OK)
# async def fetch_room_ammenity_by_id(ammenity_id: int):
#     return room_ammenity_services.get_room_ammenity_by_id(ammenity_id)


# @router.post("/ammenities/rooms", response_model=validation_models.RoomAmenity, status_code=status.HTTP_201_CREATED)
# async def create_room_ammenity(ammenity: validation_models.RoomAmenity):
#     return room_ammenity_services.create_room_ammenity(ammenity)


# @router.post("/ammenities/attach/rooms", response_model=validation_models.RoomAmenityRef, status_code=status.HTTP_201_CREATED)
# async def add_amenity_to_room(amenity_ref: validation_models.RoomAmenityRef):
#     return room_ammenity_services.add_ammenity_to_room(amenity_ref)

# @router.delete("/ammenities/remove/rooms/{room_id}/{amenity_id}",response_model=validation_models.RoomAmenityRef, status_code=status.HTTP_200_OK)
# async def remove_amenity_from_room(room_id: int, amenity_id: int):
#     return room_ammenity_services.delete_ammenity_from_room(amenity_id, room_id)


# @router.put("/ammenities/rooms/{ammenity_id}", response_model=validation_models.RoomAmenity, status_code=status.HTTP_200_OK)
# async def update_room_ammenity(ammenity_id: int, ammenity: validation_models.RoomAmenity):
#     return room_ammenity_services.update_room_ammenity(ammenity_id, ammenity)


# @router.delete("/ammenities/rooms/{ammenity_id}", response_model=validation_models.RoomAmenity, status_code=status.HTTP_200_OK)
# async def delete_room_ammenity(ammenity_id: int):
#     return room_ammenity_services.delete_room_ammenity(ammenity_id)
