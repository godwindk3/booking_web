from pydantic import BaseModel, FilePath
from datetime import date
from uuid import uuid4


class BaseModelConfig(BaseModel):
    class Config:
        orm_mode = True


class Accomodation(BaseModelConfig):
    name: str
    location: str
    info: str = ""

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "The Imperial Vung Tau Hotel & Resort",
                    "location": "Vung Tau",
                    "info":
                    """Vung Tau's first world-class hotel gives every visitor and guest the rare opportunity to indulge in the hotel's very own hospitality experience,
the pinnacle of luxury, refinement, and elegance, that only the Imperial Hotel can orchestrate and dispense with the skill of a maestro.
                    """.replace("\n", " ").strip()
                }
            ]
        }
    }


class AccommodationOut(BaseModelConfig):
    id: int
    name: str
    location: str
    info: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": 1,
                    "name": "The Imperial Vung Tau Hotel & Resort",
                    "location": "Vung Tau",
                    "info":
                    """Vung Tau's first world-class hotel gives every visitor and guest the rare opportunity to indulge in the hotel's very own hospitality experience,
the pinnacle of luxury, refinement, and elegance, that only the Imperial Hotel can orchestrate and dispense with the skill of a maestro.
                    """.replace("\n", " ").strip()
                }
            ]
        }
    }


class Room(BaseModelConfig):
    accommodationID: int
    room_name: str
    capacity: int = 1
    price: float
    status: bool = True
    tier: str = "B"
    info: str = ""

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "room_name": "Pro vjp room",
                    "capacity": 2,
                    "price": 100.0,
                    "status": True,
                    "tier": "S",
                    "info": "Nice room with beautiful view."
                }
            ]
        }
    }


class RoomOut(BaseModelConfig):
    id: int
    room_name: str
    accommodationID: int
    capacity: int
    price: float
    status: bool
    tier: str
    info: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": 1,
                    "room_name": "Pro vjp room",
                    "capacity": 2,
                    "price": 100.0,
                    "status": True,
                    "tier": "S",
                    "info": "Nice room with beautiful view."
                }
            ]
        }
    }


class User(BaseModelConfig):
    name: str | None = "Anonymous"
    email: str
    password: str
    role: int = 0

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Ouran Nakagawa",
                    "email": "deademon@gmail.com",
                    "password": "minhandz",
                    "role": 1
                }
            ]
        }
    }


class UserOut(BaseModelConfig):
    id: int
    name: str
    email: str
    role: int = 0

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": 1,
                    "name": "Ouran Nakagawa",
                    "email": "deademon@gmail.com",
                    "role": 1
                }
            ]
        }
    }


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


class RoomAmenity(BaseModelConfig):
    name: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Beautiful view"
                }
            ]
        }
    }


class RoomAmenityOut(BaseModelConfig):
    id: int
    name: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": 1,
                    "name": "Beautiful view"
                }
            ]
        }
    }


class RoomAmenityRef(BaseModelConfig):
    roomID: int
    room_amenityID: int


class AccommodationAmenity(BaseModelConfig):
    name: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "name": "Waifu cosplayer"
                }
            ]
        }
    }


class AccommodationAmenityOut(BaseModelConfig):
    id: int
    name: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": 1,
                    "name": "Waifu cosplayer"
                }
            ]
        }
    }


class AccommodationAmenityRef(BaseModelConfig):
    accommodationID: int
    amenityID: int


class Review(BaseModelConfig):
    userID: int
    bookingID: int
    rating: int
    comment: str | None = None

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "userID": 1,
                    "bookingID": 1,
                    "rating": 1,
                    "comment": "Traps, no waifus"
                }
            ]
        }
    }


class ReviewOut(BaseModelConfig):
    id: int
    userID: int
    bookingID: int
    rating: int
    comment: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": 1,
                    "userID": 1,
                    "bookingID": 1,
                    "rating": 1,
                    "comment": "Traps, no waifus"
                }
            ]
        }
    }


class Booking(BaseModelConfig):
    userID: int
    accommodationID: int
    roomID: int
    checkin_date: date
    checkout_date: date
    total_price: float = 0.0
    payment_method: int

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "userID": 1,
                    "accommodationID": 1,
                    "roomID": 1,
                    "checkin_date": "2024-12-24",
                    "checkout_date": "2024-12-25",
                    "total_price": 100.0,
                    "payment_method": "1"
                }
            ]
        }
    }


class BookingOut(BaseModelConfig):
    id: int
    userID: int
    accommodationID: int
    roomID: int
    checkin_date: date
    checkout_date: date
    total_price: float
    payment_method: int

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": 1,
                    "userID": 1,
                    "accommodationID": 1,
                    "roomID": 1,
                    "checkin_date": "2024-12-24",
                    "checkout_date": "2024-12-25",
                    "total_price": 100.0,
                    "payment_method": 1
                }
            ]
        }
    }


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

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "payment_method": "visa"
                }
            ]
        }
    }


class PaymentOut(BaseModelConfig):
    id: int
    payment_method: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": 1,
                    "payment_method": "visa"
                }
            ]
        }
    }


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

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "roomID": 1,
                    "url": "path/to/your/image.jpg"
                }
            ]
        }
    }


class RoomImageOut(BaseModelConfig):
    id: int
    roomID: int
    url: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": 1,
                    "roomID": 1,
                    "url": "path/to/your/image.jpg"
                }
            ]
        }
    }


class AccommodationImage(BaseModelConfig):
    accommodationID: int
    url: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "accommodationID": 1,
                    "url": "path/to/your/image.jpg"
                }
            ]
        }
    }


class AccommodationImageOut(BaseModelConfig):
    id: int
    accommodationID: int
    url: str

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": 1,
                    "accommodationID": 1,
                    "url": "path/to/your/image.jpg"
                }
            ]
        }
    }



class AmenityIDFilter(BaseModelConfig):
    id: int


class PriceRangeFilter(BaseModelConfig):
    min_price: float
    max_price: float