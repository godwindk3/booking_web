import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
database = ultraimport("__dir__/../database.py")
utils = ultraimport("__dir__/utils.py")
oauth2 = ultraimport("__dir__/oauth2.py")
# booking_services = ultraimport("__dir__/booking_services.py")

db = database.SessionLocal()
from fastapi import HTTPException, status

def login(user_credentials: validation_models.UserCredentials):
    user = db.query(data_models.User).filter(data_models.User.email == user_credentials.email).first()

    if (user is None):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Wrong email or password.")
    
    if (utils.verify(user_credentials.password, user.password) == False):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Wrong email or password.")
    
    data_to_encode = {
        "userID":user.id,
        "role":user.role
    }

    access_token = oauth2.create_access_token(data = data_to_encode)

    return {
            "access_token": access_token,
            "token_type":"bearer"
        }

