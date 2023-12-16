from pydantic import BaseModel

class Accomodation(BaseModel):
    accomodationID:int
    accomodation_name:str