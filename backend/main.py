from fastapi import FastAPI
import routers.admin_api as admin_api
import routers.authentication_api as authentication_api
import routers.user_api as user_api
import routers.booking_api as booking_api
import routers.accommodation_api as accommodation_api
import routers.room_api as room_api
import routers.amenity_api as amenity_api
import routers.image_api as image_api

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(admin_api.router)
app.include_router(authentication_api.router)
app.include_router(user_api.router)
app.include_router(booking_api.router)
app.include_router(accommodation_api.router)
app.include_router(room_api.router)
app.include_router(amenity_api.router)
app.include_router(image_api.router)

@app.get("/")
async def hello_world():
    return {"message": "Hello World"}