from sqlalchemy import String, Boolean, Integer, Column, Text, ForeignKey, Float, Date
import ultraimport

database = ultraimport("__dir__/../database.py")
Base = database.Base
engine = database.engine


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    role = Column(Integer)
    

class Manager(Base):
    __tablename__ = "managers"
    id = Column(Integer, primary_key=True)
    userID = Column(Integer, ForeignKey("users.id", ondelete="CASCADE", onupdate="CASCADE"))
    accommodationID = Column(Integer, ForeignKey("accommodations.id", ondelete="CASCADE", onupdate="CASCADE"))


class Accommodation(Base):
    __tablename__ = "accommodations"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    location = Column(String(255), nullable=False)
    info = Column(String)


class Room(Base):
    __tablename__ = "rooms"
    id = Column(Integer, primary_key=True)
    accommodationID = Column(Integer, ForeignKey(
        "accommodations.id", ondelete="CASCADE", onupdate="CASCADE"))
    room_name = Column(String, nullable=False)
    capacity = Column(Integer)
    price = Column(Float)
    status = Column(Boolean)
    tier = Column(String(30))
    info = Column(String)



class UserRoom(Base):
    __tablename__ = "userRooms"
    dummy_key = Column(Integer, primary_key=True)
    roomID = Column(Integer, ForeignKey(
        "rooms.id", ondelete="CASCADE", onupdate="CASCADE"))
    userID = Column(Integer, ForeignKey(
        "users.id", ondelete="CASCADE", onupdate="CASCADE"))


class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True)
    userID = Column(Integer, ForeignKey(
        "users.id", ondelete="CASCADE", onupdate="CASCADE"))
    accommodationID = Column(Integer, ForeignKey(
        "accommodations.id", ondelete="CASCADE", onupdate="CASCADE"))
    roomID = Column(Integer, ForeignKey("rooms.id", ondelete="CASCADE", onupdate="CASCADE"))
    checkin_date = Column(Date)
    checkout_date = Column(Date)
    total_price = Column(Float)
    payment_method = Column(Integer, ForeignKey("payments.id", ondelete="CASCADE", onupdate="CASCADE"))

    
class AccommodationPayment(Base):
    __tablename__ = "accommodationPayments"
    id = Column(Integer, primary_key=True)
    paymentID = Column(Integer, ForeignKey("payments.id", ondelete="CASCADE", onupdate="CASCADE"))
    accommodationID = Column(Integer, ForeignKey("accommodations.id", ondelete="CASCADE", onupdate="CASCADE"))


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)
    userID = Column(Integer, ForeignKey(
        "users.id", ondelete="CASCADE", onupdate="CASCADE"))
    bookingID = Column(Integer, ForeignKey(
        "bookings.id", ondelete="CASCADE", onupdate="CASCADE"))
    rating = Column(Integer)
    comment = Column(Text)


class RoomAmenityName(Base):
    __tablename__ = "roomAmenitiesNames"
    id = Column(Integer, primary_key=True)
    name = Column(String)


class RoomAmenities(Base):
    __tablename__ = "roomAmenities"
    dummy_key = Column(Integer, primary_key=True)
    roomID = Column(Integer, ForeignKey(
        "rooms.id", ondelete="CASCADE", onupdate="CASCADE"))
    room_amenityID = Column(Integer, ForeignKey(
        "roomAmenitiesNames.id", ondelete="CASCADE", onupdate="CASCADE"))


class RoomImage(Base):
    __tablename__ = "roomImages"
    id = Column(Integer, primary_key=True)
    roomID = Column(Integer, ForeignKey("rooms.id", ondelete="CASCADE", onupdate="CASCADE"))
    url = Column(String)


class AccommodationAmenityName(Base):
    __tablename__ = "accommodationAmenitiesNames"
    id = Column(Integer, primary_key=True)
    name = Column(String)


class AccommodationAmenities(Base):
    __tablename__ = "accommodationAmenities"
    dummy_key = Column(Integer, primary_key=True)
    accommodationID = Column(Integer, ForeignKey(
        "accommodations.id", ondelete="CASCADE", onupdate="CASCADE"))
    amenityID = Column(Integer, ForeignKey(
        "accommodationAmenitiesNames.id", ondelete="CASCADE", onupdate="CASCADE"))


class AccommodationImage(Base):
    __tablename__ = "accommodationImages"
    accommodationID = Column(Integer, ForeignKey(
        "accommodations.id", ondelete="CASCADE", onupdate="CASCADE"))
    id = Column(Integer, primary_key=True)
    url = Column(String)


class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True)
    payment_method = Column(String)


def create_db():
    Base.metadata.create_all(engine)
