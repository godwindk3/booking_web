import os
from fastapi import APIRouter, status, Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from typing import List
import ultraimport
from datetime import datetime
from pathlib import Path
import shutil
from dotenv import load_dotenv
load_dotenv()
validation_models = ultraimport("__dir__/../models/validation_models.py")
accommodation_services = ultraimport(
    "__dir__/../services/accommodation_services.py")
room_services = ultraimport("__dir__/../services/room_services.py")
oauth2 = ultraimport("__dir__/../services/oauth2.py")
manager_services = ultraimport("__dir__/../services/manager_services.py")
room_image_services = ultraimport("__dir__/../services/room_image_services.py")
acco_image_services = ultraimport("__dir__/../services/acco_image_services.py")

router = APIRouter(prefix="/image", tags=["IMAGE"])

OUTER_PATH = Path().parent.absolute() / os.getenv("IMAGES_FOLDER_NAME")


@router.post("/room/upload/{room_id}", response_model=validation_models.RoomImageOut, status_code=status.HTTP_201_CREATED)
async def upload_room_image(room_id: int, file: UploadFile = File(...), current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role == 0):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permisison.")

    if (current_user_data.role == 1):
        acco_id = room_services.get_room_by_id(room_id).accommodationID
        manager = manager_services.get_manager_by_user_id(current_user_data.id)
        if (acco_id != manager.accommodationID):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="No permisison.")

    unique = str(datetime.now().date()).replace("-", "") + '_' + \
        str(datetime.now().time()).replace(':', '').replace(".", "")

    fname, file_extension = os.path.splitext(file.filename.replace(" ", ""))
    fname = fname + "_" + "userID" + \
        str(current_user_data.id) + "_" + unique + file_extension

    subfolder = Path("ROOM") / Path(str(room_id))
    path = OUTER_PATH / subfolder
    path.mkdir(parents=True, exist_ok=True)
    full_path = path / fname
    with full_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    data = validation_models.RoomImage(
        roomID=room_id,
        url=str(full_path)
    )

    return room_image_services.create_room_image_url(data)


@router.post("/accommodation/upload/{accommodation_id}", response_model=validation_models.AccommodationImageOut, status_code=status.HTTP_201_CREATED)
async def upload_accommodation_image(accommodation_id: int, file: UploadFile = File(...), current_user_data: validation_models.User = Depends(oauth2.get_current_user)):
    if (current_user_data.role == 0):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="No permisison.")

    if (current_user_data.role == 1):
        manager = manager_services.get_manager_by_user_id(current_user_data.id)
        if (accommodation_id != manager.accommodationID):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="No permisison.")

    unique = str(datetime.now().date()).replace("-", "") + '_' + \
        str(datetime.now().time()).replace(':', '').replace(".", "")

    fname, file_extension = os.path.splitext(file.filename.replace(" ", ""))
    fname = fname + "_" + "userID" + \
        str(current_user_data.id) + "_" + unique + file_extension

    subfolder = Path("ACCOMMODATION") / Path(str(accommodation_id))
    path = OUTER_PATH / subfolder
    path.mkdir(parents=True, exist_ok=True)
    full_path = path / fname
    with full_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    data = validation_models.AccommodationImage(
        accommodationID=accommodation_id,
        url=str(full_path)
    )

    return acco_image_services.create_accommodation_image(data)


@router.get("/room", response_model=List[validation_models.RoomImageOut], status_code=status.HTTP_200_OK)
async def fetch_all_room_images():
    return room_image_services.get_all_images_url()

@router.get("/accommodations", response_model=List[validation_models.AccommodationOut], status_code=status.HTTP_200_OK)
async def fetch_all_accommodation_images():
    return acco_image_services.get_all_acco_images_url()


@router.delete("/room/{id}", response_model=validation_models.RoomImageOut, status_code=status.HTTP_200_OK)
async def delete_room_image(id: int):
    return room_image_services.delete_room_image_url(id)

@router.delete("/accommodation/{id}", response_model=validation_models.AccommodationImage, status_code=status.HTTP_200_OK)
async def delete_accommodation_image(id: int):
    return acco_image_services.delete_accommodation_image(id)


@router.get("/room/get_image/{id}", status_code=status.HTTP_200_OK)
async def get_room_image(id: int):
    url = room_image_services.get_image_url_by_id(id).url
    return FileResponse(url)

@router.get("/accommodation/get_image/{id}", status_code=status.HTTP_200_OK)
async def get_accommodation_image(id:int):
    url = acco_image_services.get_image_url_by_id(id).url
    return FileResponse(url)
