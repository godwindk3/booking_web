from database import SessionLocal
import data_models
import validation_models
from fastapi import HTTPException, status

db = SessionLocal()


def test():
    return db.query(data_models.User).all()


def get_all_users():
    return db.query(data_models.User).all()


def get_user_by_id(user_id: int):
    temp = db.query(data_models.User).filter(
        data_models.User.id == user_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            details=f"user with ID={user_id} does not exists.")

    return temp


def create_user(user: validation_models.User):
    new_user = data_models.User(
        name=user.name,
        email=user.email,
        password=user.password,
        role=user.role
    )

    temp = db.query(data_models.User).filter(
        data_models.User.email == new_user.email).first()

    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"User with email = {new_user.email} already exists.")

    db.add(new_user)
    db.commit()

    return new_user


def update_user(user_id: int, user: validation_models):
    user_to_update = db.query(data_models.User).filter(
        data_models.User.id == user_id).first()
    if (user_to_update is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            details=f"user with ID={user_id} does not exists.")

    user_to_update.name = user.name
    user_to_update.email = user.email
    user_to_update.password = user.password
    user_to_update.role = user.role

    db.commit()

    return user_to_update


def delete_user(user_id: int):
    user_to_delete = db.query(data_models.User).filter(
        data_models.User.id == user_id).first()
    if (user_to_delete is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            details=f"user with ID={user_id} does not exists.")

    db.delete(user_to_delete)
    db.commit()

    return user_to_delete
