from fastapi import HTTPException, status
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")
db = database.SessionLocal()
utils = ultraimport("__dir__/utils.py")
hash = utils.hash


def get_all_managers():
    return db.query(data_models.Manager).all()


def get_manager_by_id(manager_id: int):
    temp = db.query(data_models.Manager).filter(
        data_models.Manager.id == manager_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Manager with ID {manager_id} does not exist.")

    return temp


def get_manager_by_user_id(user_id: int):
    temp = db.query(data_models.Manager).filter(
        data_models.Manager.userID == user_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Manager with user ID {user_id} does not exist.")

    return temp


def get_accommodation_by_userID(user_id: int):
    manager = get_manager_by_user_id(user_id)
    return db.query(data_models.Accommodation).filter(
        data_models.Accommodation.id == data_models.Manager.accommodationID,
        data_models.Manager.userID == manager.userID
    ).all()


def create_manager(manager: validation_models.Manager):
    temp = db.query(data_models.User).filter(
        data_models.User.id == manager.userID).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with ID {manager.userID} does not exist.")

    temp = db.query(data_models.Accommodation).filter(
        data_models.Accommodation.id == manager.accommodationID).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Accommodation with ID {manager.accommodationID}")

    new_manager = data_models.Manager(
        userID=manager.userID,
        accommodationID=manager.accommodationID
    )

    db.add(new_manager)
    db.commit()

    return new_manager


def update_manager(manager_id: int, manager: validation_models.Manager):
    manager_to_update = get_manager_by_id(manager_id)

    manager_to_update.userID = manager.userID
    manager_to_update.accommodationID = manager.accommodationID

    db.commit()

    return manager_to_update


def delete_manager(manager_id: int):
    temp = get_manager_by_id(manager_id)

    db.delete(temp)
    db.commit()

    return temp
