import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")

db = database.SessionLocal()
from fastapi import HTTPException, status
from accommodation_services import get_accommodation_by_id
from datetime import datetime


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


def get_specific_room_by_acco_and_room_number(accommodation_id: int, room_name: str):
    get_accommodation_by_id(accommodation_id)
    temp = db.query(data_models.Room).filter(data_models.Room.room_name == room_name).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Accommodation ID {accommodation_id} does not have room number {room_name}.")
    return db.query(data_models.Room).filter(data_models.Room.accommodationID == accommodation_id, data_models.Room.room_name == room_name).first()


def create_room(room: validation_models.Room):
    new_room = data_models.Room(
        accommodationID=room.accommodationID,
        room_name=room.room_name,
        capacity=room.capacity,
        price=room.price,
        status=room.status,
        tier=room.tier,
        info=room.info
    )

    temp = db.query(data_models.Room).filter(data_models.Room.accommodationID ==
                                             new_room.accommodationID, data_models.Room.room_name == new_room.room_name).first()

    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Room with Accommodation ID = {new_room.accommodationID} and Room name = {new_room.room_name} already exists.")

    db.add(new_room)
    db.commit()

    return new_room


def update_room(room_id: int, room: validation_models.Room):
    room_to_update = get_room_by_id(room_id)

    room_to_update.accommodation_id = room.accommodationID
    room_to_update.room_name = room.room_name
    room_to_update.capacity = room.capacity
    room_to_update.price = room.price
    room_to_update.tier = room.tier
    room_to_update.status = room.status
    room_to_update.info = room.info

    print(room_to_update)

    db.commit()

    return room_to_update


def delete_room(room_id):
    room_to_del = get_room_by_id(room_id)

    db.delete(room_to_del)
    db.commit()

    return room_to_del


def get_exist_dates(room_id: int):
    # print("================")
    dates = db.query(data_models.Booking).filter(data_models.Booking.roomID == room_id).all()

    return dates



def update_room_status(room_id: int, status):
    room = get_room_by_id(room_id)
    room.status = status

    db.commit()


def check_and_update_room_status(room_id: int):
    room = get_room_by_id(room_id)
    temp_date = datetime.now().date()

    exist_dates = get_exist_dates(room_id)

    for date in exist_dates:
        checkin = date.checkin_date
        checkout = date.checkout_date

        if (temp_date <= checkout and temp_date >= checkin):
            room.status = False
            db.commit()
            print("HERE =====================================================================")
            return
        
    room.status = True

    db.commit()

