from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from datetime import datetime
from bson.json_util import dumps, loads
import motor.motor_asyncio

import pymongo
import os
from bson.json_util import dumps, loads

app = FastAPI()

client = motor.motor_asyncio.AsyncIOMotorClient(
    "mongodb+srv://mongodb:U0YOA6XeQwL1gz0r@cluster0.njgbymn.mongodb.net/?retryWrites=true&w=majority"
)

db = client["restaurants"]


@app.get("/")
async def main():

    results = await db["restaurants-reviews"].aggregate([
        {
            '$search': {
                'index': 'reviews',
                'text': {
                    'query': 'vegan',
                    'path': {
                        'wildcard': '*'
                    }
                }
            }
        },
        {
            "$limit":5
        },
        {
            "$project": {"id": {'$toString': "$_id"},"_id": 0, "Name": 1, "Score": 1}
        }
    ]).to_list(length=None)

    return results
