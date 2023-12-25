from jose import JWTError, jwt
from datetime import datetime, timedelta
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
data_models = ultraimport("__dir__/../models/data_models.py")
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
database = ultraimport("__dir__/../database.py")
db = database.SessionLocal()

SECRET_KEY = "54e44e210f08e597c006c5d3db88f59dc9ce5e794f8dafcb5d10cfd6178995fc"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTE = 30

def create_access_token(data: dict):
    data_copy = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTE)
    data_copy.update({
        "expire":expire.strftime("%Y-%m-%d %H:%M:%S")
    })

    return jwt.encode(data_copy, SECRET_KEY, algorithm=ALGORITHM)


def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        userID = payload.get("userID")
        role = payload.get("role")

        if (userID is None):
            raise credentials_exception
        
        token_data = validation_models.TokenData(
            id = userID,
            role = role
        )
    except JWTError:
        raise credentials_exception
    
    return token_data
    

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid credentials", headers={"WWW-Authenticate": "Bearer"})

    token = verify_access_token(token, credentials_exception)

    user = db.query(data_models.User).filter(data_models.User.id == token.id).first()

    return user

