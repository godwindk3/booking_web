from pydantic import BaseModel
from datetime import date
from uuid import uuid4

class BaseModelConfig(BaseModel):
    class Config:
        orm_mode = True

class Accomodation(BaseModelConfig):
    accomodationID: int
    accomodation_name: str


class Room(BaseModelConfig):
    roomID: int
    accommodationID: int
    room_number: int
    capacity: int
    price: float
    status: bool
    tier: str



class User(BaseModelConfig):
    name: str | None = "Anonymous"
    email: str
    password: str
    role: int



class RoomImage(BaseModelConfig):
    id: int
    roomID: int
    url: str



class AccomodationImage(BaseModelConfig):
    id: int
    accommodationID: int
    url: str



class RoomAmenity(BaseModelConfig):
    id: int
    name: str


class AccommodationAmenity(BaseModelConfig):
    id: int
    name: str


class Review(BaseModelConfig):
    id: int
    userID: int
    bookingID: int
    rating: int
    comment: str


class Booking(BaseModelConfig):
    id: int
    userID: int
    accommodationID: int
    checkin_date: date
    checkout_date: date
    total_price: float