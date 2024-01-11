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
import routers.filter_api as filter_api

from fastapi.middleware.cors import CORSMiddleware

description = """
# Booking API

## Tổng quan
Booking API là nền tảng của một ứng dụng web đặt chỗ mạnh mẽ, được thiết kế để mang lại trải nghiệm mượt mà cho người dùng, quản trị viên và quản lý. Nó mở ra nhiều điểm cuối để quản lý chỗ ở, phòng, đặt chỗ và nhiều hơn nữa.

## Danh sách API:

### - Admin
- Đưa quyền cho quản trị viên thực hiện các hoạt động không hạn chế trên toàn hệ thống.

### - Manager
- Cho phép quản lý giám sát người dùng, phòng và đặt chỗ trong chỗ ở được giao.

### - User
- Cung cấp chức năng cho người dùng cập nhật, xóa hồ sơ của họ và quản lý đặt chỗ của họ.

### - Accommodation
- Quản lý các hoạt động liên quan đến chỗ ở, như tạo, sửa đổi và xóa.

### - Room
- Xử lý các công việc liên quan đến phòng, bao gồm thêm, cập nhật và xóa phòng trong chỗ ở.

### - Amenity
- Cho phép thêm và sửa đổi các tiện nghi liên quan đến chỗ ở.

### - Image
- Quản lý hình ảnh liên quan đến chỗ ở hoặc phòng.

### - Booking
- Hỗ trợ các hoạt động liên quan đến đặt chỗ, bao gồm tạo, sửa đổi và xem đặt chỗ.

### - Review
- Xử lý đánh giá của người dùng cho chỗ ở.

### - Authentication
- Quản lý xác thực và ủy quyền người dùng.

## Vai trò:
### Admin (ID Vai trò: 2)
- Có quyền truy cập không hạn chế vào tất cả các chức năng trong hệ thống.

### Manager (ID Vai trò: 1)
- Có thể quản lý người dùng, phòng và đặt chỗ cụ thể cho chỗ ở được giao.

### User (ID Vai trò: 0)
- Có thể cập nhật, xóa hồ sơ của họ và thực hiện các hoạt động CRUD trên đặt chỗ của họ.

"""

tags_metadata = [
    {
        "name": "AUTHENTICATION",
        "description": "Xác thực người dùng (đăng nhập hoặc đăng ký)."
    },
    {
        "name": "USER",
        "description": "Cung cấp chức năng xem, tạo, cập nhật hoặc xóa người dùng. Xem và tạo yêu cầu quyền quản trị viên."
    },
    {
        "name": "BOOKING",
        "description": "Hỗ trợ các hoạt động liên quan đến đặt chỗ, bao gồm tạo, sửa đổi và xem đặt chỗ. Người dùng không thể xem, tạo, cập nhật hoặc xóa đặt chỗ của người dùng khác."
    },
    {
        "name": "ACCOMMODATION",
        "description": "Quản lý các hoạt động liên quan đến chỗ ở, như tạo, sửa đổi và xóa."
    },
    {
        "name": "ROOM",
        "description": "Xử lý các công việc liên quan đến phòng, bao gồm thêm, cập nhật và xóa phòng trong chỗ ở. Quản lý không thể tạo, cập nhật hoặc xóa phòng của quản lý khác."
    },
    {
        "name": "AMENITY",
        "description": "Cho phép thêm và sửa đổi các tiện nghi liên quan đến chỗ ở. Quản lý không thể tạo, cập nhật hoặc xóa tiện nghi của quản lý khác."
    },
    {
        "name": "IMAGE",
        "description": "Quản lý hình ảnh liên quan đến chỗ ở hoặc phòng."
    },
    {
        "name": "REVIEW",
        "description": "Xử lý đánh giá của người dùng cho chỗ ở."
    }
]

app = FastAPI(
    title="Booking API",
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
app.include_router(filter_api.router)

@app.get("/")
async def hello_world():
    return {"message": "Hello World"}