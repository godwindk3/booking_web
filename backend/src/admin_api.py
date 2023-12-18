from fastapi import APIRouter, status, HTTPException
from database import SessionLocal
from typing import List
import data_models
import validation_models

router = APIRouter(prefix="/admin/api/v1")


db = SessionLocal()

@router.get("/")
async def test_router():
    return {
        "message": "Test API v1"
    }

@router.get("/users", response_model=List[validation_models.User], status_code=status.HTTP_200_OK)
async def fetch_all_users():
    return db.query(data_models.User).all()

@router.post("/users", response_model=validation_models.User, status_code=status.HTTP_201_CREATED)
async def create_new_user(user: validation_models.User):
    new_user = data_models.User(
        name = user.name,
        email = user.email,
        password = user.password,
        role = user.role
    )

    temp = db.query(data_models.User).filter(data_models.User.email == new_user.email).first()

    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"User with email = {new_user.email} already exists.")
    
    db.add(new_user)
    db.commit()

    return f"Created new user: \n{new_user}"
