import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")
payment_services = ultraimport("__dir__/../services/payment_services.py")
accommodation_services = ultraimport("__dir__/accommodation_services.py")


db = database.SessionLocal()
from fastapi import HTTPException, status
from typing import List, Dict

def search_accommodation_by_name(string_query: str):
    accommodations = accommodation_services.get_all_accommodations()

    ids = []
    for accommodation in accommodations:
        if (string_query.lower().strip() in accommodation.name.lower()):
            ids.append(accommodation.id)

    return db.query(data_models.Accommodation).filter(data_models.Accommodation.id.in_(ids)).all()

def filter_accommodation_by_amenities(amenity_ids: List[validation_models.AmenityIDFilter]):
    ids = [amenity_id.id for amenity_id in amenity_ids]
    return db.query(data_models.Accommodation).filter(
            data_models.AccommodationAmenities.amenityID.in_(ids),
            data_models.Accommodation.id == data_models.AccommodationAmenities.accommodationID
        ).all()


def filter_accommodation_by_price(price_range:validation_models.PriceRangeFilter):
    accommodations = accommodation_services.get_all_accommodations()
    ids = []
    for accommodation in accommodations:
        print(accommodation.id)
        range_ = accommodation_services.get_price(accommodation.id)
        print("asdjalskdjasldkjaskldjaskldjalsdkjaslkd", range_)
        print("================================")
        min_price_ = range_.min_price
        max_price_ = range_.max_price

        print(accommodation.name)

        if (price_range.min_price <= min_price_ and price_range.max_price >= max_price_):
            ids.append(accommodation.id)

    return db.query(data_models.Accommodation).filter(data_models.Accommodation.id.in_(ids)).all()


def filter_accommodations_by_location(location_query: str):
    accommodations = accommodation_services.get_all_accommodations()

    ids = []

    for accommodation in accommodations:
        if (location_query.lower().strip() in accommodation.location.lower()):
            ids.append(accommodation.id)

    return db.query(data_models.Accommodation).filter(data_models.Accommodation.id.in_(ids)).all()



# res = search_accommodation_by_name("V")

# for _ in res:
#     print(_.name)
# f1 = validation_models.AmenityIDFilter(id=1)
# f2 = validation_models.AmenityIDFilter(id=2)
# json_list = [f2]



# res = filter_accommodation_by_amenities(json_list)

# for _ in res:
#     print(_.name)


# temp = validation_models.PriceRangeFilter(min_price=100, max_price=100.5)

# res = filter_accommodation_by_price(temp)
# for _ in res:
#     print(_.name)