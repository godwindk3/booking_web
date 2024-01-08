from fastapi import FastAPI
import routers.admin_api as admin_api
import routers.authentication_api as authentication_api
import routers.user_api as user_api
import routers.booking_api as booking_api
import routers.accommodation_api as accommodation_api
import routers.room_api as room_api
import routers.amenity_api as amenity_api
import routers.image_api as image_api
import routers.review_api as review_api
import routers.payment_api as payment_api

from fastapi.middleware.cors import CORSMiddleware

description = """
# Booking Accommodations API

## Overview
The Booking Accommodations API is the foundation of a robust booking web application, designed to deliver a seamless experience for users, administrators, and managers. It exposes a variety of endpoints for managing accommodations, rooms, bookings, and more.

## List of APIs:

### - Admin
- Empowers administrators with unrestricted access to system-wide operations.

### - Manager
- Enables managers to oversee users, rooms, and bookings within their assigned accommodations.

### - User
- Provides users with functionality to update, delete their profiles, and manage their bookings.

### - Accommodation
- Manages operations related to accommodations, including creation, modification, and deletion.

### - Room
- Handles room-related tasks, such as adding, updating, and deleting rooms within accommodations.

### - Amenity
- Allows the addition and modification of amenities associated with accommodations.

### - Image
- Manages images associated with accommodations or rooms.

### - Booking
- Facilitates booking-related operations, including creation, modification, and viewing of bookings.

### - Review
- Handles user reviews for accommodations.

### - Authentication
- Manages user authentication and authorization.

## Roles:
### Admin (Role ID: 2)
- Has unrestricted access to all functionalities within the system.

### Manager (Role ID: 1)
- Can manage users, rooms, and bookings specific to their assigned accommodations.

### User (Role ID: 0)
- Can update, delete their profile, and perform CRUD operations on their bookings.

"""

tags_metadata = [
    {
        "name": "AUTHENTICATION",
        "description": "Authenticate users (login or register). Note: Admin registration is not allowed."
    },
    {
        "name": "USER",
        "description": "Provides functionality to view, create, update, or delete users. Viewing and creating require admin privileges."
    },
    {
        "name": "BOOKING",
        "description": "Facilitates booking-related operations, including creation, modification, and viewing of bookings. Users cannot view, create, update, or delete other users' bookings."
    },
    {
        "name": "ACCOMMODATION",
        "description": "Manages operations related to accommodations, such as creation, modification, and deletion."
    },
    {
        "name": "ROOM",
        "description": "Handles room-related tasks, including adding, updating, and deleting rooms within accommodations. Managers cannot create, update, or delete other managers' rooms."
    },
    {
        "name": "AMENITY",
        "description": "Allows the addition and modification of amenities associated with accommodations. Managers cannot create, update, or delete other managers' amenities."
    },
    {
        "name": "IMAGE",
        "description": "Manages images associated with accommodations or rooms."
    },
    {
        "name": "REVIEW",
        "description": "Handles user reviews for accommodations."
    }
]

app = FastAPI(
    title="API Booking Accommodations",
    description=description,
    redoc_url="/documentation",
    openapi_tags=tags_metadata
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# app.include_router(admin_api.router)
app.include_router(authentication_api.router)
app.include_router(user_api.router)
app.include_router(booking_api.router)
app.include_router(accommodation_api.router)
app.include_router(room_api.router)
app.include_router(amenity_api.router)
app.include_router(image_api.router)
app.include_router(review_api.router)
app.include_router(payment_api.router)

@app.get("/")
async def hello_world():
    return {"message": "Hello World"}