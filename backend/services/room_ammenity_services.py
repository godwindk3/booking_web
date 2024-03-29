from fastapi import HTTPException, status
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")

db = database.SessionLocal()


def get_all_room_ammenities():
    return db.query(data_models.RoomAmenityName).all()


def get_room_ammenity_by_id(ammenity_id: int):
    temp = db.query(data_models.RoomAmenityName).filter(
        data_models.RoomAmenityName.id == ammenity_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Room's ammenity with ID {ammenity_id} does not exists.")

    return temp


def get_ammenities_of_room(room_id: int):
    temp = db.query(data_models.Room).filter(
        data_models.Room.id == room_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Room with ID {room_id} does not exist.")

    return db.query(data_models.RoomAmenityName).filter(data_models.RoomAmenities.roomID == room_id, data_models.RoomAmenityName.id == data_models.RoomAmenities.room_amenityID).all()


def create_room_ammenity(ammenity: validation_models.RoomAmenity):
    temp = db.query(data_models.RoomAmenityName).filter(
        data_models.RoomAmenityName.name == ammenity.name.lower()).first()

    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Ammenity with name {ammenity.name} already exists.")

    room_ammenity = data_models.RoomAmenityName(
        name=ammenity.name.lower()
    )

    db.add(room_ammenity)
    db.commit()

    return room_ammenity


def update_room_ammenity(ammenity_id: int, ammenity: validation_models.RoomAmenity):

    temp = db.query(data_models.RoomAmenityName).filter(
        data_models.RoomAmenityName.name == ammenity.name.lower(),
        data_models.RoomAmenityName.id != ammenity_id
    ).first()

    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Ammenity with name {ammenity.name} already exists.")

    temp = get_room_ammenity_by_id(ammenity_id)

    temp.name = ammenity.name.lower()

    db.commit()

    return temp


def delete_room_ammenity(ammenity_id: int):
    temp = get_room_ammenity_by_id(ammenity_id)

    db.delete(temp)
    db.commit()

    return temp


def add_ammenity_to_room(amenity_ref: validation_models.RoomAmenityRef):
    get_room_ammenity_by_id(amenity_ref.room_amenityID)

    temp = db.query(data_models.Room).filter(
        data_models.Room.id == amenity_ref.roomID).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Room with ID {amenity_ref.roomID} does not exist.")

    temp = db.query(data_models.RoomAmenities).filter(data_models.RoomAmenities.room_amenityID ==
                                                      amenity_ref.room_amenityID, data_models.RoomAmenities.roomID == amenity_ref.roomID).first()
    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Room with ID {amenity_ref.roomID} already contains amenity ID {amenity_ref.room_amenityID}.")

    data = data_models.RoomAmenities(
        roomID=amenity_ref.roomID,
        room_amenityID=amenity_ref.room_amenityID
    )

    db.add(data)
    db.commit()

    return data


def delete_ammenity_from_room(ammenity_id: int, room_id: int):
    get_room_ammenity_by_id(ammenity_id)

    temp = db.query(data_models.Room).filter(
        data_models.Room.id == room_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Room with ID {room_id} does not exist.")
    amenity_to_remove = db.query(data_models.RoomAmenities).filter(
        data_models.RoomAmenities.roomID == room_id, data_models.RoomAmenities.room_amenityID == ammenity_id).first()

    db.delete(amenity_to_remove)
    db.commit()

    return amenity_to_remove
