from database import SessionLocal
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

db = SessionLocal()

def get_all_payments():
    return db.query(data_models.Payment).all()

def get_payment_by_id(id):
    temp = db.query(data_models.Payment).filter(data_models.Payment.id == id).first()
    
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"Payment with ID {id} does not exist")
    
    return temp

def create_payment(payment: validation_models.Payment):
    new_payment = data_models.Payment(
        bookingID = payment.bookingID,
        amount = payment.amount,
        payment_date = payment.payment_date,
        payment_method = payment.payment_method
    )
    
    temp = db.query(data_models.Payment.bookingID).filter(data_models.Payment.bookingID == new_payment.bookingID).first()
    
    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"Payment with booking ID {new_payment.bookingID} aleady exists.")
    
    db.add(new_payment)
    db.commit()
    
    return new_payment

def update_payment(id: int, payment: validation_models.Payment):
    temp = get_payment_by_id(id)
    
    temp.bookingID = payment.bookingID
    temp.amount = payment.amount
    temp.payment_date = payment.payment_date
    temp.payment_method = payment.payment_method
    
    db.commit()
    
    return temp

def delete_payment(id: int):
    temp = get_payment_by_id(id)
    
    db.delete(temp)
    db.commit()
    
    return temp