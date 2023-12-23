from pydantic import BaseModel
from datetime import date
from uuid import uuid4


class BaseModelConfig(BaseModel):
    class Config:
        orm_mode = True


class Accomodation(BaseModelConfig):
    name: str
    location: str


class AccommodationOut(BaseModel):
    id: int
    name: str
    location: str


class Room(BaseModelConfig):
    accommodationID: int
    room_number: int
    capacity: int = 1
    price: float
    status: bool = False
    tier: str = "B"


class RoomOut(BaseModel):
    id: int
    room_number: int
    capacity: int = 1
    price: float
    status: bool = False
    tier: str = "B"


class User(BaseModelConfig):
    name: str | None = "Anonymous"
    email: str
    password: str
    role: int = 0


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: int = 0

class UserCredentials(BaseModel):
    email: str
    password: str


class RoomImage(BaseModelConfig):
    roomID: int
    url: str


class RoomImageOut(BaseModel):
    id: int
    roomID: int


class AccomodationImage(BaseModelConfig):
    accommodationID: int
    url: str


class AccomodationImageOut(BaseModel):
    id: int
    accommodationID: int


class RoomAmenity(BaseModelConfig):
    name: str


class AccommodationAmenity(BaseModelConfig):
    name: str


class Review(BaseModelConfig):
    userID: int
    bookingID: int
    rating: int
    comment: str | None = None


class ReviewOut(BaseModel):
    id: int
    userID: int
    bookingID: int
    rating: int
    comment: str


class Booking(BaseModelConfig):
    userID: int
    accommodationID: int
    checkin_date: date
    checkout_date: date
    total_price: float


class BookingOut(BaseModel):
    id: int
    userID: int
    accommodationID: int
    checkin_date: date
    checkout_date: date
    total_price: float
