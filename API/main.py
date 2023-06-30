from fastapi import Request, FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from mysql.connector import connect
import traceback

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",  # Replace with the actual URL of your React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def make_connection():
    mydb = connect(
        host="localhost",
        user="root",
        password="12345",
        database="crossfit3g",
        auth_plugin='caching_sha2_password'
    )
    return mydb

@app.get("/")
def hola_mundo():
    return {"mensaje": "Hola mundo"}

@app.get("/clients")
def get_clients():
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "SELECT * FROM clients"
        cursor.execute(query)
        results = cursor.fetchall()

        clients = []
        for result in results:
            client = {
                "client_id": result[0],
                "email": result[1],
                "password": result[2],
                "name": result[3],
                "surname": result[4],
                "birthdate": result[5],
                "phone": result[6],
                "inscription_date": result[7],
                "emergency_contact": result[8],
                "emergency_phone": result[9],
                "rate_id": result[10],
                "available_classes": result[11]
            }
            clients.append(client)

        cursor.close()
        db.close()

        return {"clients": clients}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}