from fastapi import HTTPException, status
from database import SessionLocal

import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")

db = database.SessionLocal()


db = SessionLocal()


def get_all_acco_ammenities():
    return db.query(data_models.AccommodationAmenityName).all()


def get_acco_ammenity_by_id(ammenity_id: int):
    temp = db.query(data_models.AccommodationAmenityName).filter(
        data_models.AccommodationAmenityName.id == ammenity_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Accommodation's ammenity with ID {ammenity_id} does not exists.")

    return temp


def get_all_amenities_of_accommodation(accommodation_id: int):
    temp = db.query(data_models.Accommodation).filter(
        data_models.Accommodation.id == accommodation_id).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Accommodation with ID {accommodation_id} does not exist.")

    return db.query(data_models.AccommodationAmenityName).filter(
        data_models.AccommodationAmenities.accommodationID == accommodation_id,
        data_models.AccommodationAmenityName.id == data_models.AccommodationAmenities.amenityID
    )


def create_acco_ammenity(ammenity: validation_models.AccommodationAmenity):

    __check_existed_acco_ammenity_name(ammenity.name)

    acco_ammenity = data_models.AccommodationAmenityName(
        name=ammenity.name.lower()
    )

    db.add(acco_ammenity)
    db.commit()

    return acco_ammenity


def update_acco_ammenity(ammenity_id: int, ammenity: validation_models.AccommodationAmenity):
    __check_existed_acco_ammenity_name(ammenity.name)
    acco_ammenity = get_acco_ammenity_by_id(ammenity_id)

    acco_ammenity.name = ammenity.name.lower()
    db.commit()

    return acco_ammenity


def delete_acco_ammenity(ammenity_id: int):
    temp = get_acco_ammenity_by_id(ammenity_id)

    db.delete(temp)
    db.commit()

    return temp


def add_amenity_to_accommodation(amenity_ref: validation_models.AccommodationAmenityRef):
    get_acco_ammenity_by_id(amenity_ref.amenityID)

    temp = db.query(data_models.Accommodation).filter(
        data_models.Accommodation.id == amenity_ref.accommodationID).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Accommodation with ID {amenity_ref.accommodationID} does not exist.")

    temp = db.query(data_models.AccommodationAmenities).filter(
        data_models.AccommodationAmenities.amenityID == amenity_ref.amenityID, data_models.AccommodationAmenities.accommodationID == amenity_ref.accommodationID).first()
    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Amenity with ID {amenity_ref.amenityID} already exists.")

    data = data_models.AccommodationAmenities(
        accommodationID=amenity_ref.accommodationID,
        amenityID=amenity_ref.amenityID
    )

    db.add(data)
    db.commit()

    return data


def delete_amenity_from_accommodation(amenity_id: int, accommodation_id: int):
    get_acco_ammenity_by_id(amenity_id)
    temp = db.query(data_models.Accommodation).filter(
        data_models.Accommodation.id == accommodation_id).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Accommodation with ID {accommodation_id} does not exist.")

    amenity_to_remove = db.query(data_models.AccommodationAmenities).filter(
        data_models.AccommodationAmenities.accommodationID == accommodation_id, data_models.AccommodationAmenities.amenityID == amenity_id).first()

    db.delete(amenity_to_remove)
    db.commit()

    return amenity_to_remove


def __check_existed_acco_ammenity_name(name: str):
    temp = db.query(data_models.AccommodationAmenityName).filter(
        data_models.AccommodationAmenityName.name == name.lower()).first()

    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Ammenity's name already esxists.")
