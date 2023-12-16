from fastapi import APIRouter
from ...services.crud import *

router = APIRouter(prefix="admin/api/v1")


@router.get("/")
async def test_router():
    return {
        "message": "Test API v1"
    }

@router.get("/users")
async def fetch_all_users():
    return 
