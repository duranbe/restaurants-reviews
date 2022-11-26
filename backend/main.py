from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import motor.motor_asyncio


app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


client = motor.motor_asyncio.AsyncIOMotorClient(
    "mongodb+srv://mongodb:U0YOA6XeQwL1gz0r@cluster0.njgbymn.mongodb.net/?retryWrites=true&w=majority"
)

db = client["restaurants"]


@app.get("/search")
async def main(request: Request):
    kw = request.query_params.get('keyword', None)

    results = (await db["restaurants-reviews"].aggregate([
        {
            '$search': {
                'index': 'reviews',
                'text': {
                    'query': kw,
                    'path': {
                        'wildcard': '*'
                    }
                }
            }
        },
        {
            "$limit": 10
        },
        {
            "$project": {"id": {'$toString': "$_id"},
                         "_id": 0,
                         "Name": 1,
                         "Type": 1,
                         "Location": 1}
        }
    ]).to_list(length=None))

    return results
