# from database import SessionLocal
# import data_models
# import validation_models
# from .models import data_models, validation_models
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")
db = database.SessionLocal()
from fastapi import HTTPException, status
utils = ultraimport("__dir__/utils.py")
hash = utils.hash

# db = SessionLocal()


def test():
    return db.query(data_models.User).all()


def get_all_users():
    return db.query(data_models.User).all()


def get_user_by_id(user_id: int):
    temp = db.query(data_models.User).filter(
        data_models.User.id == user_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"user with ID={user_id} does not exists.")

    return temp


def create_user(user: validation_models.User):
    hashed_pwd = hash(user.password)
    new_user = data_models.User(
        name=user.name,
        email=user.email,
        password=hashed_pwd,
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
    user_to_update = get_user_by_id(user_id)
    hashed_pwd = hash(user.password)
    user_to_update.name = user.name
    user_to_update.email = user.email
    user_to_update.password = hashed_pwd
    user_to_update.role = user.role

    db.commit()

    return user_to_update


def delete_user(user_id: int):
    user_to_delete = get_user_by_id(user_id)

    db.delete(user_to_delete)
    db.commit()

    return user_to_delete
