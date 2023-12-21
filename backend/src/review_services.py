from database import SessionLocal
import data_models
import validation_models
from fastapi import HTTPException, status
from booking_services import get_booking_by_id
from user_services import get_user_by_id

db = SessionLocal()

def get_all_reviews():
    return db.query(data_models.Review).all()

def get_review_by_id(review_id):
    temp = db.query(data_models.Review).filter(data_models.Review.id == review_id).first()

    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"Review with ID = {review_id} does not exists.")
    
    return temp


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

