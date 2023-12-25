# from database import SessionLocal
# import data_models
# import validation_models
# from .models import data_models, validation_models
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")
# utils = ultraimport("__dir__/../utils.py")
db = database.SessionLocal()
from fastapi import HTTPException, status
from accommodation_services import get_accommodation_by_id

# db = SessionLocal()


def get_all_rooms():
    return db.query(data_models.Room).all()


def get_room_by_id(room_id):
    temp = db.query(data_models.Room).filter(
        data_models.Room.id == room_id).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Room with ID = {room_id} does not exists.")

    return temp


def get_rooms_by_accommodation_id(accommodation_id: int):
    get_accommodation_by_id(accommodation_id)
    return db.query(data_models.Room).filter(data_models.Room.accommodationID == accommodation_id).all()


def get_specific_room_by_acco_and_room_number(accommodation_id: int, room_number: int):
    get_accommodation_by_id(accommodation_id)
    temp = db.query(data_models.Room).filter(data_models.Room.room_number == room_number).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Accommodation ID {accommodation_id} does not have room number {room_number}.")
    return db.query(data_models.Room).filter(data_models.Room.accommodationID == accommodation_id, data_models.Room.room_number == room_number).first()


def create_room(room: validation_models.Room):
    new_room = data_models.Room(
        accommodationID=room.accommodationID,
        room_number=room.room_number,
        capacity=room.capacity,
        price=room.price,
        status=room.status,
        tier=room.tier
    )

    temp = db.query(data_models.Room).filter(data_models.Room.accommodationID ==
                                             new_room.accommodationID, data_models.Room.room_number == new_room.room_number).first()

    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Room with Accommodation ID = {new_room.accommodationID} and Room number = {new_room.room_number} already exists.")

    db.add(new_room)
    db.commit()

    return new_room


def update_room(room_id: int, room: validation_models.Room):
    room_to_update = get_room_by_id(room_id)

    room_to_update.accommodation_id = room.accommodationID
    room_to_update.room_number = room.room_number
    room_to_update.capacity = room.capacity
    room_to_update.price = room.price
    room_to_update.tier = room.tier
    room_to_update.status = room.status

    print(room_to_update)

    db.commit()

    return room_to_update


def delete_room(room_id):
    room_to_del = get_room_by_id(room_id)

    db.delete(room_to_del)
    db.commit()

    return room_to_del


def update_room_status(room_id: int, status):
    room = get_room_by_id(room_id)
    room.status = status

    db.commit()

