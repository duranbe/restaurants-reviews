from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import motor.motor_asyncio
from bson.objectid import ObjectId
import json

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)



@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = motor.motor_asyncio.AsyncIOMotorClient(
    "mongodb+srv://mongodb:U0YOA6XeQwL1gz0r@cluster0.njgbymn.mongodb.net/?retryWrites=true&w=majority"
    )
    app.mongodb = app.mongodb_client["restaurants"]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

@app.get("/search")
async def main(request: Request):
    kw = request.query_params.get('keyword', None)
    is_vegan = request.query_params.get('vegan', False)
    is_nyc = request.query_params.get('nyc', False)

    if kw is None or len(kw) < 1:
        raise HTTPException(status_code=400, detail="Wrong keyword search")

    compound_parameters = \
        {
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
                    "path": ["Type", "Comments", "Name"],
                    "score": {"boost": {"value": 3}}
                }
            }]
        }

    if is_vegan == "true":

        compound_parameters['must'] = \
            [{"text":
                {
                    "query": "vegan",
                    "path": ["Type", "Comments"]
                }
              }]

    if is_nyc == "true":

        if "must" in compound_parameters:

            prev_compound_parameters = compound_parameters["must"]

            nyc_filter = {
                "text":
                    {
                        "query": "New York City",
                        "path": "Location"
                    }
            }

            prev_compound_parameters.append(nyc_filter)

            compound_parameters["must"] = prev_compound_parameters

        else:

            compound_parameters["must"] = {

                "text":
                    {
                        "query": "New York City",
                        "path": "Location"
                    }
            }

    results = (await  request.app.mongodb["restaurants-reviews"].aggregate([
        {
            "$search": {
                'index': 'reviews',
                "compound": compound_parameters}
        },
        {
            "$limit": 10
        },
        {
            "$addFields": {
                "score": {
                    "$meta": "searchScore"
                }
            }
        },
        {
            "$setWindowFields": {
                "output": {
                    "maxScore": {
                        "$max": "$score"
                    }
                }
            }
        },
        {
            "$addFields": {
                "normalizedScore": {
                    "$divide": [
                        "$score", "$maxScore"
                    ]
                }
            }

        },
        {
            "$project": {

                "id": {'$toString': "$_id"},
                "_id": 0,
                "Name": 1,
                "Type": 1,
                "Location": 1,
                "Comments": {
                    "$replaceOne": {
                        "input": "$Comments",
                        "find": "More",
                        "replacement": ""
                    }
                },
                "Reviews": {
                    "$replaceOne": {
                        "input": "$Reviews",
                        "find": " bubbles",
                        "replacement": ""
                    }
                },
                "Price_Range": 1,
                "Street Address": 1,
                "score": {"$meta": "searchScore"},
                "normalizedScore": 1,
            }
        }]).to_list(length=None))

    return results


@app.get("/nb_doc")
async def get_number_of_documents(request: Request):
    
    number_of_documents = await  request.app.mongodb["restaurants-reviews"].estimated_document_count()

    return {"nbDocuments": number_of_documents}


@app.get("/get_restaurant")
async def get_restaurant(request: Request):

    restaurant_id = request.query_params.get('restaurantId', None)

    q = load_json("./queries/query.json")

    restaurant_data = await  request.app.mongodb["restaurants-reviews"].find_one({"_id": ObjectId(restaurant_id)}, q)

    icon_filename = await get_image_based_on_words(f"{restaurant_data['Type']}  {restaurant_data['Name']}")

    restaurant_data["icon"] = icon_filename
    return {"restaurantData": restaurant_data}


async def get_image_based_on_words(words):

    q = load_json("./queries/find_icon_query.json")

    q[0]["$search"]["text"]["query"] = words

    image = await  request.app.mongodb["svg_ressources"].aggregate(q).to_list(length=None)

    return image


def load_json(path):

    with open(path) as query:
        q = json.loads(query.read())

    return q