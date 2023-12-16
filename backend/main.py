from fastapi import FastAPI
from backend.app.routers.admin import api

app = FastAPI()

app.include_router(api.router)


@app.get("/")
async def hello_world():
    return {"message": "Hello World"}
