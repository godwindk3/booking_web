from pydantic import BaseModel

class Room(BaseModel):
    roomID: int
    price: float
    
    