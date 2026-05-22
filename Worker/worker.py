import json
import time
import redis
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# Redis connection
redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST"),
    port=int(os.getenv("REDIS_PORT")),
    decode_responses=True
)

# MongoDB connection
mongo_client = MongoClient(os.getenv("MONGO_URI"))

db = mongo_client["aitasks"]

tasks_collection = db["tasks"]

print("Worker started...")

while True:
    try:
        # Read job from Redis queue
        job = redis_client.blpop("bull:taskQueue:wait", timeout=5)

        if job:
            _, job_data = job

            print("Job received")

            # BullMQ stores complex JSON
            # For now just simulate processing

            print("Processing task...")

            time.sleep(3)

            print("Task processed")

    except Exception as e:
        print("Error:", e)