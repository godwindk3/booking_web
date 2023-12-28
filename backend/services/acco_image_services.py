from fastapi import HTTPException, status
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")
db = database.SessionLocal()
from pathlib import Path

def get_all_acco_images_url():
    return db.query(data_models.AccommodationImage).all()


def get_image_url_by_id(image_id: int):
    temp = db.query(data_models.AccommodationImage).filter(data_models.AccommodationImage.id == image_id).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Image with ID {image_id} does not exist.")
    
    return temp


def create_accommodation_image(accommodation_image: validation_models.AccommodationImage):
    temp = db.query(data_models.Accommodation).filter(data_models.Accommodation.id == accommodation_image.accommodationID).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Accommodation with ID {accommodation_image.accommodationID}")
    
    new_image_url = data_models.AccommodationImage(
        accommodationID=accommodation_image.accommodationID,
        url = accommodation_image.url
    )

    db.add(new_image_url)
    db.commit()

    return new_image_url


def delete_accommodation_image(image_id: int):
    delete_image = db.query(data_models.AccommodationImage).filter(data_models.AccommodationImage.id == image_id).first()

    Path.unlink(delete_image.url)
    db.delete(delete_image)
    db.commit()

    return delete_image