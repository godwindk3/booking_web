from pydantic import BaseModel
from datetime import date
from uuid import uuid4

class BaseModelConfig(BaseModel):
    class Config:
        orm_mode = True

class Accomodation(BaseModelConfig):
    name: str
    location: str


class Room(BaseModelConfig):
    accommodationID: int
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



class RoomImage(BaseModelConfig):
    roomID: int
    url: str



class AccomodationImage(BaseModelConfig):
    accommodationID: int
    url: str



class RoomAmenity(BaseModelConfig):
    name: str


class AccommodationAmenity(BaseModelConfig):
    name: str


class Review(BaseModelConfig):
    userID: int
    bookingID: int
    rating: int
    comment: str | None = None


class Booking(BaseModelConfig):
    userID: int
    accommodationID: int
    checkin_date: date
    checkout_date: date
    total_price: float