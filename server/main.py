from typing import Union

from fastapi import FastAPI, status, Response
from pydantic import BaseModel
from prisma import Prisma
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from prisma.models import Reserve

prisma = Prisma(auto_register=True)
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await prisma.connect()


@app.on_event("shutdown")
async def shutdown():
    await prisma.disconnect()


class userModel(BaseModel):
    studentId: str
    name: str
    email: Union[str, None] = None
    password: str


class login(BaseModel):
    email: str
    password: str


class reservation(BaseModel):
    table: str
    num: str
    time: str


@app.get("/user")
async def get_user():
    return await prisma.user.find_many()


@app.post("/register")
async def create_user(data: userModel, response: Response):
    find_email = await prisma.user.find_first(
        where={
            "email": data.email
        }
    )

    if find_email:
        response.status_code = 500
        return {
            "message": "email has been"
        }

    data = await prisma.user.create({
        "email": data.email,
        "name": data.name,
        "password": data.password,
        "studentId": data.studentId
    })

    return data


@app.post("/login", status_code=200)
async def check_user(data: login, response: Response):

    find_email = await prisma.user.find_first(
        where={
            "email": data.email
        }
    )

    if not find_email:
        response.status_code = 500
        return {
            "message": "this email not found"
        }

    if find_email.password != data.password:
        response.status_code = 500
        return {
            "message": "password not match"
        }

    return find_email


@app.post("/reservation/{uid}")
async def create_reservation(uid: int, data: reservation):
    reservation = await prisma.reserve.create(
        data={
            'uid': uid,
            "table": data.table,
            "time": int(data.time),
            "num": int(data.num)
        }
    )

    return reservation


@app.get("/reservation/{uid}")
async def get_reservation(uid: int):
    user_reservation = await prisma.user.find_first(
        where={
            "id": uid
        },
        include={
            'reserve': True,
        },
    )
    return user_reservation


@app.delete("/reservation/{reserveId}")
async def delete_reservation(reserveId: int):
    delete = await prisma.reserve.delete(
        where={
            "id": reserveId
        },
    )
    print(delete)
    return {
        "message": "success"
    }


@app.get("/reservation")
async def get_all_reservation():
    reservation = await prisma.reserve.find_many(
        include={
            "reserver": True
        }
    )
    return reservation
