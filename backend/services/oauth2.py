from jose import JWTError, jwt
from datetime import datetime, timedelta

SECRET_KEY = "54e44e210f08e597c006c5d3db88f59dc9ce5e794f8dafcb5d10cfd6178995fc"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTE = 30

def create_access_token(data: dict):
    data_copy = data.copy()

    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTE)
    data_copy.update({
        "expire":expire.strftime("%Y-%m-%d %H:%M:%S")
    })

    return jwt.encode(data_copy, SECRET_KEY, algorithm=ALGORITHM)

    