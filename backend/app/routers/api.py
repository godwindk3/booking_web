from fastapi import APIRouter

router = APIRouter(prefix="/api/v1")


@router.get("/")
async def test_router():
    return {
        "message": "Test API v1"
    }
