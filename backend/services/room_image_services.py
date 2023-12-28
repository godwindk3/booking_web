from fastapi import HTTPException, status
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")
db = database.SessionLocal()
from pathlib import Path


def get_all_images_url():
    return db.query(data_models.RoomImage).all()


def get_image_url_by_id(image_id: int):
    temp = db.query(data_models.RoomImage).filter(data_models.RoomImage.id == image_id).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Image with ID {image_id} does not exist.")
    return temp


def create_room_image_url(room_image: validation_models.RoomImage):
    temp = db.query(data_models.Room).filter(data_models.Room.id == room_image.roomID).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Room with ID {room_image.roomID} does not exist.")
    img_room = data_models.RoomImage(
        roomID=room_image.roomID,
        url=room_image.url
    )

    db.add(img_room)
    db.commit()

    return img_room


def delete_room_image_url(image_id: int):
    delete_img = get_image_url_by_id(image_id)

    Path.unlink(delete_img.url)
    db.delete(delete_img)
    db.commit()

    return delete_img
