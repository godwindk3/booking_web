from pydantic import BaseModel
from datetime import date
from uuid import uuid4

class Accomodation(BaseModel):
    accomodationID: int
    accomodation_name: str

    class Config:
        orm_mode = True


class Room(BaseModel):
    roomID: int
    accommodationID: int
    room_number: int
    capacity: int
    price: float
    status: bool
    tier: str

    class Config:
        orm_mode = True


class User(BaseModel):
    userID: int | None = uuid4()
    name: str | None = "Anonymous"
    email: str
    password: str
    role: int

    class Config:
        orm_mode = True


class RoomImage(BaseModel):
    id: int
    roomID: int
    url: str

    class Config:
        orm_mode = True


class AccomodationImage(BaseModel):
    id: int
    accommodationID: int
    url: str

    class Config:
        orm_mode = True


class RoomAmenity(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class AccommodationAmenity(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class Review(BaseModel):
    id: int
    userID: int
    bookingID: int
    rating: int
    comment: str

    class Config:
        orm_mode = True


class Booking(BaseModel):
    id: int
    userID: int
    accommodationID: int
    checkin_date: date
    checkout_date: date
    total_price: float

    class Config:
        orm_mode = True
