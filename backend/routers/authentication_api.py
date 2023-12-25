from fastapi import APIRouter, status, HTTPException
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
auth_services = ultraimport("__dir__/../services/auth_services.py")
user_services = ultraimport("__dir__/../services/user_services.py")

router = APIRouter(tags=["AUTHENTICATION"])

@router.post("/login", response_model=validation_models.Token)
async def login(user_credentials: validation_models.UserCredentials):
    return auth_services.login(user_credentials)
    

@router.post("/register", response_model=validation_models.UserOut, status_code = status.HTTP_201_CREATED)
async def register(user: validation_models.User):
    return user_services.create_user(user)