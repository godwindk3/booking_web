from pydantic import BaseModel

class User(BaseModel):
    userID : int
    name: str
    dob: str
    status: int | None = 0

    