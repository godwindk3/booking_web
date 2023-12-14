from fastapi import FastAPI
from app.routers import api

app = FastAPI()

app.include_router(api.router)


@app.get("/")
async def hello_world():
    return {"message": "Hello World"}
