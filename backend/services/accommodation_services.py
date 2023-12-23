from database import SessionLocal
# import data_models
# import validation_models
# from .models import data_models, validation_models
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")
utils = ultraimport("__dir__/../utils.py")
db = database.SessionLocal()
from fastapi import HTTPException, status

db = SessionLocal()

def get_all_accommodations():
    return db.query(data_models.Accommodation).all()

def get_accommodation_by_id(id):
    temp = db.query(data_models.Accommodation).filter(data_models.Accommodation.id == id).first()
    
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Accommodation with ID={id} does not exists.")
    
    return temp

def create_accommodation(accommodation: validation_models.Accomodation):
    new_accommodation = data_models.Accommodation(
        name = accommodation.name,
        location = accommodation.location
    )

    temp = db.query(data_models.Accommodation.name).filter(data_models.Accommodation.name == new_accommodation.name).first()

    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Accommodation with name={new_accommodation.name} already exists.")
    
    db.add(new_accommodation)
    db.commit()

    return new_accommodation


def update_accommodation(id: int, accommodation: validation_models.Accomodation):
    temp = get_accommodation_by_id(id)

    temp.name = accommodation.name
    temp.location = accommodation.location

    db.commit()

    return temp

def delete_accommodation(id: int):
    temp = get_accommodation_by_id(id)
    db.delete(temp)
    db.commit()

    return temp





