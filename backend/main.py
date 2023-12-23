from fastapi import FastAPI
import routers.admin_api as admin_api
import routers.authentication_api as authentication_api
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


@app.get("/")
async def hello_world():
    return {"message": "Hello World"}