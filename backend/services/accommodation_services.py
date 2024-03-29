import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")

db = database.SessionLocal()
from fastapi import HTTPException, status


def get_all_accommodations():
    return db.query(data_models.Accommodation).all()

def get_accommodation_by_id(id):
    temp = db.query(data_models.Accommodation).filter(data_models.Accommodation.id == id).first()
    
    if (temp is None):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Accommodation with ID={id} does not exists.")
    
    return temp

def get_manager(accommodation_id: int):
    get_accommodation_by_id(accommodation_id)
    return db.query(data_models.User).filter(
        data_models.Manager.accommodationID == accommodation_id, 
        data_models.User.id == data_models.Manager.userID
    ).first()

def get_price(accommodation_id: int):
    get_accommodation_by_id(accommodation_id)

    print("Here ================================")

    rooms = db.query(data_models.Room).filter(data_models.Room.accommodationID == accommodation_id).all()
    if (len(list(rooms)) == 0):
        return validation_models.PriceRangeFilter(min_price=0, max_price=0)
    
    print("===============================")
    
    min_price = min([room.price for room in rooms])
    max_price = max([room.price for room in rooms])

    price_range = validation_models.PriceRangeFilter(min_price=min_price, max_price=max_price)
    return price_range

res = get_price(3)
print(res)

def create_accommodation(accommodation: validation_models.Accomodation):
    new_accommodation = data_models.Accommodation(
        name = accommodation.name,
        location = accommodation.location,
        info = accommodation.info
    )

    temp = db.query(data_models.Accommodation.name).filter(data_models.Accommodation.name == new_accommodation.name).first()

    if (temp is not None):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Accommodation with name={new_accommodation.name} already exists.")
    
    db.add(new_accommodation)
    db.commit()

    return new_accommodation


def update_accommodation(id: int, accommodation: validation_models.Accomodation):
    temp = get_accommodation_by_id(id)

    temp.name = accommodation.name
    temp.location = accommodation.location
    temp.info = accommodation.info

    db.commit()

    return temp

def delete_accommodation(id: int):
    temp = get_accommodation_by_id(id)

    db.delete(temp)
    db.commit()

    return temp





