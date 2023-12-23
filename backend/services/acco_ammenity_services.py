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

def get_all_acco_ammenities():
    return db.query(data_models.AccommodationAmenityName).all()

def get_acco_ammenity_by_id(ammenity_id: int):
    temp = db.query(data_models.AccommodationAmenityName).filter(data_models.AccommodationAmenityName.id == ammenity_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Accommodation's ammenity with ID {ammenity_id} does not exists.")
    
    return temp

def create_acco_ammenity(ammenity: validation_models.AccommodationAmenity):

    __check_existed_acco_ammenity_name(ammenity.name)

    acco_ammenity = data_models.AccommodationAmenityName(
        name = ammenity.name.lower()
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




def __check_existed_acco_ammenity_name(name: str):
    temp = db.query(data_models.AccommodationAmenityName).filter(data_models.AccommodationAmenityName.name == name.lower()).first()

    if ( temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Ammenity's name already esxists.")