from datetime import datetime
from accommodation_services import get_accommodation_by_id
from fastapi import HTTPException, status
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")

db = database.SessionLocal()


def get_all_rooms():
    return db.query(data_models.Room).all()


def get_room_by_id(room_id):
    temp = db.query(data_models.Room).filter(
        data_models.Room.id == room_id).first()
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Room with ID = {room_id} does not exists.")

    check_and_update_room_status(room_id)

    return temp


def get_rooms_by_accommodation_id(accommodation_id: int):
    get_accommodation_by_id(accommodation_id)
    return db.query(data_models.Room).filter(data_models.Room.accommodationID == accommodation_id).all()


def create_room(room: validation_models.Room):
    new_room = data_models.Room(
        accommodationID=room.accommodationID,
        room_name=room.room_name,
        capacity=room.capacity,
        price=room.price,
        status=room.status,
        tier=room.tier,
        info=room.info
    )

    temp = db.query(data_models.Room).filter(data_models.Room.accommodationID ==
                                             new_room.accommodationID, data_models.Room.room_name == new_room.room_name).first()

    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Room with Accommodation ID = {new_room.accommodationID} and Room name = {new_room.room_name} already exists.")

    db.add(new_room)
    db.commit()

    return new_room


def update_room(room_id: int, room: validation_models.Room):
    room_to_update = get_room_by_id(room_id)

    room_to_update.accommodation_id = room.accommodationID
    room_to_update.room_name = room.room_name
    room_to_update.capacity = room.capacity
    room_to_update.price = room.price
    room_to_update.tier = room.tier
    room_to_update.status = room.status
    room_to_update.info = room.info

    print(room_to_update)

    db.commit()

    return room_to_update


def delete_room(room_id):
    room_to_del = get_room_by_id(room_id)

    db.delete(room_to_del)
    db.commit()

    return room_to_del


def get_exist_dates(room_id: int):
    # print("================")
    dates = db.query(data_models.Booking).filter(
        data_models.Booking.roomID == room_id).all()

    return dates


def update_room_status(room_id: int, status):
    room = get_room_by_id(room_id)
    room.status = status

    db.commit()


def check_and_update_room_status(room_id: int):
    room = db.query(data_models.Room).filter(
        data_models.Room.id == room_id).first()
    if (room is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Room with ID {room_id} does not exist.")

    temp_date = datetime.now().date()

    exist_dates = get_exist_dates(room_id)

    room.status = True
    for date in exist_dates:
        checkin = date.checkin_date
        checkout = date.checkout_date

        print(f"checkin: {checkin}\ncheckout:{checkout}")

        if (temp_date <= checkout and temp_date >= checkin):
            print("=================================================================")
            room.status = False

    db.commit()


def get_available_rooms(date_range: validation_models.CheckInOutDates, accommodation_id: int):
    rooms = get_all_rooms()
    print("==========================================")
    print(type(date_range))
    print("==========================================")

    plan_checkin = date_range.checkin_date
    plan_checkout = date_range.checkout_date

    if (plan_checkin > plan_checkout):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Invalid checkin, checkout date.")

    ids = []
    for room in rooms:
        print(room.room_name)

        exist_dates = get_exist_dates(room.id)
        if (len(exist_dates) == 0):
            ids.append(room.id)
            continue

        overlap = False
        for exist_date in exist_dates:
            temp1 = exist_date.checkin_date
            temp2 = exist_date.checkout_date

            if (plan_checkin < exist_date.checkout_date and plan_checkout > exist_date.checkin_date):
                print(
                    f"Overlap for checkin: {temp1}\nOverlap for checkout {temp2}.")
                overlap = True
                break

        if (not overlap):
            ids.append(room.id)

    print(ids)
    return db.query(data_models.Room).filter(
        data_models.Room.id.in_(ids),
        data_models.Room.accommodationID == accommodation_id
    ).all()


# range_date = validation_models.CheckInOutDates(
#     checkin_date="2024-01-01",
#     checkout_date="2024-01-11"
# )

# avai = get_available_rooms(range_date,2)
# for room in avai:
#     print(room.id)
