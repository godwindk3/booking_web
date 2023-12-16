from pydantic import BaseModel

class User(BaseModel):
    userID : int
    name: str | None = "Anonymous"
    dob: str | None = "01/01/1900"
    roomID: int
    status: int | None = 0

    