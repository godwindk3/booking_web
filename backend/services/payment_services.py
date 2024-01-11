import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")

db = database.SessionLocal()

from fastapi import HTTPException, status


def get_all_payments():
    return db.query(data_models.Payment).all()

def get_payment_by_id(id):
    temp = db.query(data_models.Payment).filter(data_models.Payment.id == id).first()
    
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"Payment with ID {id} does not exist")
    
    return temp

def get_payment_methods_from_acco_id(acco_id: int):
    temp = db.query(data_models.Accommodation).filter(data_models.Accommodation.id == acco_id).first()
    
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Accommodation with ID={id} does not exists.")
    temp = db.query(data_models.Payment).filter(
        data_models.Payment.id == data_models.AccommodationPayment.paymentID, 
        data_models.AccommodationPayment.accommodationID == acco_id
    ).all()
    
    print("======================================================")

    return temp

def create_payment(payment: validation_models.Payment):
    temp = db.query(data_models.Payment.payment_method).filter(data_models.Payment.payment_method == payment.payment_method).first()
    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Payment with method {payment.payment_method} already exist.")
    new_payment = data_models.Payment(
        payment_method = payment.payment_method.lower()
    )
    
    db.add(new_payment)
    db.commit()
    
    return new_payment

def add_payment_method_to_accommodation(payment_id: int, accommodation_id: int):
    print("===============================")

    get_payment_by_id(payment_id)
    temp = db.query(data_models.Accommodation).filter(data_models.Accommodation.id == accommodation_id).first()
    
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Accommodation with ID={id} does not exists.")
    
    

    temp = db.query(data_models.AccommodationPayment).filter(
        data_models.AccommodationPayment.paymentID == payment_id,
        data_models.AccommodationPayment.accommodation_id == accommodation_id
    ).first()
    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Payment with ID {payment_id} already exist in Accommodation ID {accommodation_id}.")
    
    
    accommodation_payment = data_models.AccommodationPayment(
        paymentID = payment_id,
        accommodationID = accommodation_id
    )
    db.add(accommodation_payment)
    db.commit()

    return accommodation_payment

def remove_payment_method_from_accommodation(accommodation_id: int, payment_id: int):
    get_payment_by_id(payment_id)
    temp = db.query(data_models.Accommodation).filter(data_models.Accommodation.id == accommodation_id).first()
    
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Accommodation with ID={id} does not exists.")

    temp = db.query(data_models.AccommodationPayment).filter(
        payment_id == data_models.AccommodationPayment.id, accommodation_id == data_models.AccommodationPayment.accommodationID).first()
    
    db.delete(temp)
    db.commit()

    return temp


def update_payment(id: int, payment: validation_models.Payment):
    temp = get_payment_by_id(id)

    temp = db.query(data_models.Payment.payment_method).filter(
        data_models.Payment.payment_method.lower() == payment.payment_method.lower(),
        data_models.Payment.id != id
    ).first()
    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Payment with method {payment.payment_method} already exist.")
    
    temp.payment_method = payment.payment_method
    
    db.commit()
    
    return temp

def delete_payment(id: int):
    temp = get_payment_by_id(id)
    
    db.delete(temp)
    db.commit()
    
    return temp