from fastapi import FastAPI
import admin_api

app = FastAPI()

app.include_router(admin_api.router)


@app.get("/")
async def hello_world():
    return {"message": "Hello World"}
