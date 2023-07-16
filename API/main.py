from fastapi import Request, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from mysql.connector import connect
import traceback

from pydantic import BaseModel

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

class ClientCreateRequest(BaseModel):
    email: str
    password: str
    name: str
    surname: str
    birthdate: str
    phone: str
    inscription_date: str
    emergency_contact: str
    emergency_phone: str
    rate_id: int
    available_classes: int


# ---------- Función para obtener todos los clientes ---------- #
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

# ---------- Función para obtener un solo cliente ---------- #
@app.get("/clients/{client_id}")
def get_client(client_id: int):
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "SELECT * FROM clients WHERE client_id = %s"
        cursor.execute(query, (client_id,))
        result = cursor.fetchone()

        if result:
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
            cursor.close()
            db.close()
            return {"client": client}
        else:
            return {"message": "Client not found"}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}

# ---------- Función para crear un nuevo cliente ---------- #
@app.post("/clients")
def create_client(client_data: ClientCreateRequest):
    try:
        # Extract data from the request body
        email = client_data.email
        password = client_data.password
        name = client_data.name
        surname = client_data.surname
        birthdate = client_data.birthdate
        phone = client_data.phone
        inscription_date = client_data.inscription_date
        emergency_contact = client_data.emergency_contact
        emergency_phone = client_data.emergency_phone
        rate_id = client_data.rate_id
        available_classes = client_data.available_classes

        # Create a connection to the database
        db = make_connection()

        # Create a cursor to execute SQL queries
        cursor = db.cursor()

        # Construct the SQL query to insert a new client
        query = """
        INSERT INTO clients (email, password, name, surname, birthdate, phone, inscription_date, emergency_contact, emergency_phone, rate_id, available_classes)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            email, password, name, surname, birthdate, phone, inscription_date, emergency_contact, emergency_phone, rate_id, available_classes
        )

        # Execute the SQL query
        cursor.execute(query, values)

        # Commit the changes to the database
        db.commit()

        # Close the cursor and database connection
        cursor.close()
        db.close()

        # Return a response indicating success
        return {"message": "Client created successfully"}

    except Exception as e:
        # Handle any exceptions and return an error response
        raise HTTPException(status_code=500, detail=str(e))

# ---------- Función para eliminar un cliente ---------- #

@app.delete("/clients/{client_id}")
def delete_client(client_id: int):
    try:
        db = make_connection()
        cursor = db.cursor()

        # Check if the client exists
        query = "SELECT * FROM clients WHERE client_id = %s"
        cursor.execute(query, (client_id,))
        result = cursor.fetchone()

        if result is None:
            raise HTTPException(status_code=404, detail="Client not found")

        # Delete the client
        delete_query = "DELETE FROM clients WHERE client_id = %s"
        cursor.execute(delete_query, (client_id,))
        db.commit()

        cursor.close()
        db.close()

        return {"message": "Client deleted successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------- Función para verificar el cliente en login ---------- #
@app.post("/clients/check")
async def check_client(request_data: dict):
    try:
        client_id = request_data.get("client_id")
        password = request_data.get("password")

        db = make_connection()
        cursor = db.cursor()

        query = "SELECT COUNT(*) FROM clients WHERE client_id = %s AND password = %s"
        cursor.execute(query, (client_id, password))
        result = cursor.fetchone()

        cursor.close()
        db.close()

        if result[0] > 0:
            return {"exists": True}
        else:
            return {"exists": False}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}


# ---------- Función para obtener todos los empleados ---------- #
@app.get("/employees")
def get_employees():
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "SELECT * FROM employees"
        cursor.execute(query)
        results = cursor.fetchall()

        employees = []
        for result in results:
            employee = {
                "employee_id": result[0],
                "password": result[1],
                "user_admin": bool(result[2]),
                "name": result[3],
                "surname": result[4],
                "birthdate": str(result[5]),
                "email": result[6],
                "phone": result[7]
            }
            employees.append(employee)

        cursor.close()
        db.close()

        return {"employees": employees}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}

# ---------- Función para obtener un solo empleado ---------- #
@app.get("/employees/{employee_id}")
def get_employee(employee_id: int):
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "SELECT * FROM employees WHERE employee_id = %s"
        cursor.execute(query, (employee_id,))
        result = cursor.fetchone()

        if result is None:
            return {"error": "Employee not found"}

        employee = {
            "employee_id": result[0],
            "password": result[1],
            "user_admin": bool(result[2]),
            "name": result[3],
            "surname": result[4],
            "birthdate": str(result[5]),
            "email": result[6],
            "phone": result[7]
        }

        cursor.close()
        db.close()

        return {"employee": employee}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}
    
# ---------- Función para verificar el empleado en login ---------- #
@app.post("/employees/check")
async def check_employee(request_data: dict):
    try:
        employee_id = request_data.get("employee_id")
        password = request_data.get("password")

        db = make_connection()
        cursor = db.cursor()

        query = "SELECT COUNT(*) FROM employees WHERE employee_id = %s AND password = %s"
        cursor.execute(query, (employee_id, password))
        result = cursor.fetchone()

        cursor.close()
        db.close()

        if result[0] > 0:
            return {"exists": True}
        else:
            return {"exists": False}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}


# ---------- CRUD Clases---------- #
class Clase (BaseModel):
    id_clase: int
    fecha: str
    dia: str
    hora: str
    duracion: int
    coach: str
    nombre_clase: str
    num_plazas: int
    alumnos: list

clases = []

async def get_clases():
    db = make_connection()
    cursor = db.cursor()
    cursor.execute("SELECT dia, hora, nombre_clase FROM clases")
    result = cursor.fetchall()

    clases = {}
    for row in result:
        dia, hora, nombre_clase = row
        if dia not in clases:
            clases[dia] = {}
        clases[dia][hora] = nombre_clase

    return clases

@app.get("/clases/{dia}/{hora}")
async def get_clase(dia: str, hora: str):
    db = make_connection()
    cursor = db.cursor()
    cursor.execute("SELECT nombre_clase FROM clases WHERE dia = %s AND hora = %s", (dia, hora))
    result = cursor.fetchone()

    if result:
        nombre_clase = result[0]
        return {"dia": dia, "hora": hora, "nombre_clase": nombre_clase}
    else:
        return {"error": "Clase no encontrada"}

@app.post("/clases/{dia}/{hora}")
async def create_clase(dia: str, hora: str, clase: Clase):
    db = make_connection()
    cursor = db.cursor()
    cursor.execute("INSERT INTO clases (dia, hora, nombre_clase) VALUES (%s, %s, %s)", (dia, hora, clase.nombre_clase))
    db.commit()

    return {"message": "Clase creada exitosamente"}

@app.put("/clases/{dia}/{hora}")
async def update_clase(dia: str, hora: str, clase: Clase):
    db = make_connection()
    cursor = db.cursor()
    cursor.execute("UPDATE clases SET nombre_clase = %s WHERE dia = %s AND hora = %s", (clase.nombre_clase, dia, hora))
    db.commit()

    if cursor.rowcount > 0:
        return {"message": "Clase actualizada exitosamente"}
    else:
        return {"error": "Clase no encontrada"}
    
@app.delete("/clases/{dia}/{hora}")
async def delete_clase(dia: str, hora: str):
    db = make_connection()
    cursor = db.cursor()
    cursor.execute("DELETE FROM clases WHERE dia = %s AND hora = %s", (dia, hora))
    db.commit()

    if cursor.rowcount > 0:
        return {"message": "Clase eliminada exitosamente"}
    else:
        return {"error": "Clase no encontrada"}
