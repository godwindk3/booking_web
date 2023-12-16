from fastapi import APIRouter
from ...services.crud import _get_users

router = APIRouter(prefix="/api/v1")


@router.get("/")
async def test_router():
    return {
        "message": "Test API v1"
    }

@router.get("/users")
async def get_users():
    return _get_users()
