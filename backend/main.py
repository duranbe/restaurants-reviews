from fastapi import FastAPI, Request, HTTPException
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
    is_vegan = request.query_params.get('vegan', None)

    if kw is None or len(kw) < 1:
        raise HTTPException(status_code=400, detail="Wrong keyword search")

    results = (await db["restaurants-reviews"].aggregate([
        {
            "$search": {
                'index': 'reviews',
                "compound": {
                    "should": [{
                        "text": {
                            "query": kw,
                            'path': {
                                'wildcard': '*'
                            }
                        }
                    },
                        {
                        "text": {
                            "query": kw,
                            "path": "Type",
                            "score": {"boost": {"value": 3}}
                        }
                    }]
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
                         "Location": 1,
                         "Reviews": {
                                    "$replaceOne": {
                                        "input": "$Reviews", 
                                        "find": " bubbles", 
                                        "replacement": ""
                                        }
                                    },
                "Price_Range": 1,
                "Street Address": 1,
                "score": {"$meta": "searchScore"}
            }
        }
    ]).to_list(length=None))

    return results


# No meant to be used for now
@app.get("/autocomplete")
async def autocomplete_results(request: Request):

    kw = request.query_params.get('keyword', None)

    results = (await db["restaurants-reviews"].aggregate([
        {
            '$search': {
                'index': 'reviews',
                'autocomplete': {
                    'path': 'Type',
                    'query': kw,
                },
                "highlight": {
                    "path": "Type"
                }
            }
        }, {
            '$limit': 3
        }, {
            '$project': {
                "id": {'$toString': "$_id"},
                "_id": 0,
                'Type': 1,
                "highlights": {"$meta": "searchHighlights"}
            }
        }
    ]).to_list(length=None))

    return results
