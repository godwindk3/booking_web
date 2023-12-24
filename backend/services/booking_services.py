# from database import SessionLocal
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
from datetime import date, datetime
from sqlalchemy import or_, and_

# db = SessionLocal()


def get_all_bookings():
    return db.query(data_models.Booking).all()


def get_booking_by_id(booking_id):
    temp = db.query(data_models.Booking).filter(
        data_models.Booking.id == booking_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Booking with ID = {booking_id} does not exists.")

    return temp

def get_bookings_of_user(user_id):
    temp = db.query(data_models.User).filter(data_models.User.id == user_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with ID {user_id} does not exist.")

    return db.query(data_models.Booking).filter(data_models.Booking.userID == user_id).all()

def create_booking(booking: validation_models.Booking):
    new_booking = data_models.Booking(
        userID=booking.userID,
        accommodationID=booking.accommodationID,
        checkin_date=booking.checkin_date,
        checkout_date=booking.checkout_date,
        total_price=booking.total_price
    )

    if (booking.checkin_date >= booking.checkout_date):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid date range. Check-in date must be before check-out date.")

    if (new_booking.checkin_date < datetime.now().date()):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Can't create Booking with checkin_date = {new_booking.checkin_date}. Who are you? A time traveller?")

    __check_overlapping_bookings(booking)

    db.add(new_booking)
    db.commit()

    return new_booking


def update_booking(booking_id: int, booking: validation_models.Booking):
    booking_to_update = get_booking_by_id(booking_id)

    if (booking.checkin_date >= booking.checkout_date):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Invalid date range. Check-in date must be before check-out date.")

    if (booking.checkin_date < datetime.now().date()):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Can't update Booking with checkin_date = {booking_to_update.checkin_date}.Who are you? A time traveller?")

    __check_overlapping_exclude_self(
        original_booking=booking_to_update, request_booking=booking)

    booking_to_update.userID = booking.userID
    booking_to_update.accommodationID = booking.accommodationID
    booking_to_update.checkin_date = booking.checkin_date
    booking_to_update.checkout_date = booking.checkout_date
    booking_to_update.total_price = booking.total_price
    db.commit()

    return booking_to_update


def delete_booking(booking_id: int):
    booking_to_del = get_booking_by_id(booking_id)

    db.delete(booking_to_del)
    db.commit()

    return booking_to_del


def __check_overlapping_bookings(booking: validation_models.Booking):
    overlapping = db.query(data_models.Booking).filter(
        data_models.Booking.userID == booking.userID,
        and_(
            booking.checkin_date <= data_models.Booking.checkout_date,
            booking.checkout_date >= data_models.Booking.checkin_date
        )
    ).first()

    if (overlapping is not None):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid checkin_date, checkout_date = {booking.checkin_date} to {booking.checkout_date} with user ID = {booking.userID}. Overlapping booking exists."
        )


def __check_overlapping_exclude_self(original_booking: data_models.Booking, request_booking: validation_models.Booking):
    overlapping = db.query(data_models.Booking).filter(
        data_models.Booking.userID == request_booking.userID,
        data_models.Booking.id != original_booking.id,
        and_(
            request_booking.checkin_date <= data_models.Booking.checkout_date,
            request_booking.checkout_date >= data_models.Booking.checkin_date
        )
    ).first()

    if (overlapping is not None):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid checkin_date, checkout_date = {overlapping.checkin_date} to {overlapping.checkout_date} with user ID = {overlapping.userID}. Overlapping booking exists."
        )
