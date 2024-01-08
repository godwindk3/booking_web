from pydantic import BaseModel, FilePath
from datetime import date
from uuid import uuid4



class BaseModelConfig(BaseModel):
    class Config:
        orm_mode = True


class Accomodation(BaseModelConfig):
    name: str
    location: str
    info: str=""


class AccommodationOut(BaseModelConfig):
    id: int
    name: str
    location: str
    info:str


class Room(BaseModelConfig):
    accommodationID: int
    room_name: str
    capacity: int = 1
    price: float
    status: bool = True
    tier: str = "B"
    info:str = ""


class RoomOut(BaseModelConfig):
    id: int
    room_name: str
    accommodationID: int
    capacity: int
    price: float
    status: bool
    tier: str
    info:str


class User(BaseModelConfig):
    name: str | None = "Anonymous"
    email: str
    password: str
    role: int = 0


class UserOut(BaseModelConfig):
    id: int
    name: str
    email: str
    role: int = 0


class Manager(BaseModelConfig):
    userID: int
    accommodationID: int


class ManagerOut(BaseModelConfig):
    id: int
    userID: int
    accommodationID: int


class UserCredentials(BaseModelConfig):
    email: str
    password: str


class RoomImage(BaseModelConfig):
    roomID: int
    url: str


class RoomImageOut(BaseModelConfig):
    id: int
    roomID: int


class AccomodationImage(BaseModelConfig):
    accommodationID: int
    url: str


class AccomodationImageOut(BaseModelConfig):
    id: int
    accommodationID: int


class RoomAmenity(BaseModelConfig):
    name: str

class RoomAmenityOut(BaseModelConfig):
    id: int
    name: str


class RoomAmenityRef(BaseModelConfig):
    roomID: int
    room_amenityID: int


class AccommodationAmenity(BaseModelConfig):
    name: str

class AccommodationAmenityOut(BaseModelConfig):
    id: int
    name: str


class AccommodationAmenityRef(BaseModelConfig):
    accommodationID: int
    amenityID: int


class Review(BaseModelConfig):
    userID: int
    bookingID: int
    rating: int
    comment: str | None = None


class ReviewOut(BaseModelConfig):
    id: int
    userID: int
    bookingID: int
    rating: int
    comment: str


class Booking(BaseModelConfig):
    userID: int
    accommodationID: int
    roomID: int
    checkin_date: date
    checkout_date: date
    total_price: float
    payment_method: int


class BookingOut(BaseModelConfig):
    id: int
    userID: int
    accommodationID: int
    roomID: int
    checkin_date: date
    checkout_date: date
    total_price: float
    payment_method: int

class CheckInOutDates(BaseModelConfig):
    checkin_date: date
    checkout_date: date


class Token(BaseModelConfig):
    access_token: str
    token_type: str


class TokenData(BaseModelConfig):
    id: int = None
    role: int


class Payment(BaseModelConfig):
    payment_method: str


class PaymentOut(BaseModelConfig):
    id: int
    payment_method: str

class AccommodationPayment(BaseModelConfig):
    paymentID: int
    accommodationID: int


class AccommodationPaymentOut(BaseModelConfig):
    id: int
    paymentID: int
    accommodationID: int


class RoomImage(BaseModelConfig):
    roomID: int
    url: str

class RoomImageOut(BaseModelConfig):
    id: int
    roomID: int
    url: str

class AccommodationImage(BaseModelConfig):
    accommodationID: int
    url: str

class AccommodationImageOut(BaseModelConfig):
    id: int
    accommodationID: int
    url: str
