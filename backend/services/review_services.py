import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")
db = database.SessionLocal()
from fastapi import HTTPException, status
from booking_services import get_booking_by_id
from user_services import get_user_by_id
from accommodation_services import get_accommodation_by_id


def get_all_reviews():
    return db.query(data_models.Review).all()

def get_review_by_id(review_id):
    temp = db.query(data_models.Review).filter(data_models.Review.id == review_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"Review with ID = {review_id} does not exists.")
    
    return temp

def get_reviews_in_accommodation(accommodationID: int):

    __check_exist_accommodation(accommodationID)

    reviews = db.query(data_models.Review).join(
        data_models.Booking, 
        onclause=(data_models.Booking.id == data_models.Review.bookingID)
        ).filter(
            data_models.Booking.accommodationID == accommodationID
        ).all()

    return reviews

def get_reviews_of_user(user_id: int):
    get_user_by_id(user_id)

    reviews = db.query(data_models.Review).join(
        data_models.Booking,
        onclause=data_models.Booking.id == data_models.Review.bookingID
    ).filter(data_models.Review.userID == user_id).all()

    return reviews

def get_reviews_of_accommodation(accommodation_id: int):
    __check_exist_accommodation(accommodation_id)

    res = db.query(data_models.Review).filter(
        data_models.Review.bookingID == data_models.Booking.id,
        data_models.Booking.accommodationID == accommodation_id
    ).all()

    return res


def create_review(review: validation_models.Review):
    new_rv = data_models.Review(
        userID = review.userID,
        bookingID = review.bookingID,
        rating = review.rating,
        comment = review.comment
    )

    __check_exist_user_and_booking_id(new_rv.userID, new_rv.bookingID)

    db.add(new_rv)
    db.commit()

    return new_rv

def update_review(review_id: int, review: validation_models.Review):
    rv_update = get_review_by_id(review_id)
    __check_exist_user_and_booking_id(review.userID, review.bookingID)

    rv_update.userID = review.userID
    rv_update.bookingID = review.bookingID
    rv_update.rating = review.rating
    rv_update.comment = review.comment

    db.commit()
    return rv_update


def delete_review(review_id: int):
    rv_to_del = get_review_by_id(review_id)

    db.delete(rv_to_del)
    db.commit()

    return rv_to_del



def __check_exist_user_and_booking_id(userID, bookingID):
    get_user_by_id(userID)
    get_booking_by_id(bookingID)

def __check_exist_accommodation(accommodationID):
    get_accommodation_by_id(accommodationID)
