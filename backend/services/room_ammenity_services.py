from database import SessionLocal
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

db = SessionLocal()


def get_all_room_ammenities():
    return db.query(data_models.RoomAmenityName).all()


def get_room_ammenity_by_id(ammenity_id: int):
    temp = db.query(data_models.RoomAmenityName).filter(
        data_models.RoomAmenityName.id == ammenity_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Room's ammenity with ID {ammenity_id} does not exists.")

    return temp


def create_room_ammenity(ammenity: validation_models.RoomAmenity):
    __check_existed_ammenity_name(ammenity.name)

    room_ammenity = data_models.RoomAmenityName(
        name=ammenity.name.lower()
    )

    db.add(room_ammenity)
    db.commit()

    return room_ammenity


def update_room_ammenity(ammenity_id: int, ammenity: validation_models.RoomAmenity):
    __check_existed_ammenity_name(ammenity.name)

    temp = get_room_ammenity_by_id(ammenity_id)

    temp.name = ammenity.name.lower()

    db.commit()

    return temp


def delete_room_ammenity(ammenity_id: int):
    temp = get_room_ammenity_by_id(ammenity_id)

    db.delete(temp)
    db.commit()

    return temp


def __check_existed_ammenity_name(name: str):
    temp = db.query(data_models.RoomAmenityName).filter(
        data_models.RoomAmenityName.name == name.lower()).first()

    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Ammenity with name {name} already exists.")
