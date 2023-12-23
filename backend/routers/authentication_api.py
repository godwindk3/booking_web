from fastapi import APIRouter, status, HTTPException
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
auth_services = ultraimport("__dir__/../services/auth_services.py")

router = APIRouter()

@router.post("/login")
async def login(user_credentials: validation_models.UserCredentials):
    return auth_services.login(user_credentials)
    
