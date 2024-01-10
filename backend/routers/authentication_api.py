from fastapi import APIRouter, status, HTTPException
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")
auth_services = ultraimport("__dir__/../services/auth_services.py")
user_services = ultraimport("__dir__/../services/user_services.py")

router = APIRouter(tags=["AUTHENTICATION"])

@router.post("/login", response_model=validation_models.Token)
async def login(user_credentials: validation_models.UserCredentials):
    """
- Hàm nhận email (tài khoản Email) và password (mật khẩu) dùng để đăng nhập vào tài khoản của người dùng.
- Status code:
    - 200: Thành công.
    - 401: Sai thông tin.
    """
    return auth_services.login(user_credentials)
    

@router.post("/register", response_model=validation_models.UserOut, status_code = status.HTTP_201_CREATED)
async def register(user: validation_models.User):
    """
- Hàm nhận name (tên người dùng), email (tài khoản email), password (mật khẩu), role 
(nhận các giá trị 0, 1) dùng để đăng ký tài khoản. Role 0 dành cho tài khoản người 
dùng bình thường, role 1 dành cho tài khoản của quản lý khách sạn.
- Status code:
    - 200: Thành công.
    - 403: Không có quyền.
    - 422: Truyền dữ liệu không hợp lệ.
    """
    if (user.role == 2):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No permission.")
    return user_services.create_user(user)

@router.post("/register_admin", response_model=validation_models.UserOut, status_code=status.HTTP_201_CREATED)
async def register_admin(admin: validation_models.User):
    """
- Hàm nhận name (tên người dùng), email (tài khoản email), password (mật khẩu) dùng để đăng ký tài khoản admin. 
- Status code:
    - 200: Thành công.
    - 422: Truyền dữ liệu không hợp lệ.

    """
    return auth_services.register_admin(admin)