from fastapi import Request, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from mysql.connector import connect
import traceback
from datetime import date, time, datetime, timedelta

from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
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

class ClientModel(BaseModel):
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
    
class EmployeeModel(BaseModel):
    email: str
    password: str
    name: str
    surname: str
    birthdate: str
    phone: str
    user_admin: bool

class ClassModel(BaseModel):
    class_date: date
    class_hour: time
    duration: int
    employee_id: int
    class_name: str
    number_spaces: int

class AssistenceModel(BaseModel):
    client_id: int
    class_id: int

#################### CLIENTES ####################

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
def create_client(client_data: ClientModel):
    try:
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

        db = make_connection()

        cursor = db.cursor()

        query = """
        INSERT INTO clients (email, password, name, surname, birthdate, phone, inscription_date, emergency_contact, emergency_phone, rate_id, available_classes)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            email, password, name, surname, birthdate, phone, inscription_date, emergency_contact, emergency_phone, rate_id, available_classes
        )

        cursor.execute(query, values)

        db.commit()

        cursor.close()
        db.close()

        return {"message": "Client created successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    from fastapi import HTTPException

# ---------- Función para editar un cliente ---------- #
@app.put("/clients/{client_id}")
def update_client(client_id: int, client_data: ClientModel):
    try:
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

        db = make_connection()

        cursor = db.cursor()

        query = """
        UPDATE clients
        SET email=%s, password=%s, name=%s, surname=%s, birthdate=%s, phone=%s, inscription_date=%s, emergency_contact=%s,
        emergency_phone=%s, rate_id=%s, available_classes=%s
        WHERE client_id=%s
        """
        values = (
            email, password, name, surname, birthdate, phone, inscription_date, emergency_contact, emergency_phone, rate_id,
            available_classes, client_id
        )

        cursor.execute(query, values)

        db.commit()

        cursor.close()
        db.close()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Client not found")

        return {"message": "Client updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------- Función para eliminar un cliente ---------- #
@app.delete("/clients/{client_id}")
def delete_client(client_id: int):
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "SELECT * FROM clients WHERE client_id = %s"
        cursor.execute(query, (client_id,))
        result = cursor.fetchone()

        if result is None:
            raise HTTPException(status_code=404, detail="Client not found")

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

#################### Empleados ####################

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

# ---------- Función para crear un nuevo empleado ---------- #
@app.post("/employees")
def create_employee(employee_data: EmployeeModel):
    try:
        email = employee_data.email
        password = employee_data.password
        name = employee_data.name
        surname = employee_data.surname
        birthdate = employee_data.birthdate
        phone = employee_data.phone
        user_admin = employee_data.user_admin

        db = make_connection()

        cursor = db.cursor()

        query = """
        INSERT INTO employees (email, password, name, surname, birthdate, phone, user_admin)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            email, password, name, surname, birthdate, phone, user_admin
        )

        cursor.execute(query, values)

        db.commit()

        cursor.close()
        db.close()

        return {"message": "Employee created successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------- Función para editar un nuevo empleado ---------- #
@app.put("/employees/{employee_id}")
def update_employee(employee_id: int, employee_data: EmployeeModel):
    try:
        email = employee_data.email
        password = employee_data.password
        name = employee_data.name
        surname = employee_data.surname
        birthdate = employee_data.birthdate
        phone = employee_data.phone
        user_admin = employee_data.user_admin

        db = make_connection()

        cursor = db.cursor()

        query = """
        UPDATE employees
        SET email=%s, password=%s, name=%s, surname=%s, birthdate=%s, phone=%s, user_admin=%s
        WHERE employee_id=%s
        """
        values = (
            email, password, name, surname, birthdate, phone, user_admin, employee_id
        )

        cursor.execute(query, values)

        db.commit()

        cursor.close()
        db.close()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Employee not found")

        return {"message": "Employee updated successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------- Función para eliminar un cliente ---------- #
@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: int):
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "SELECT * FROM employees WHERE employee_id = %s"
        cursor.execute(query, (employee_id,))
        result = cursor.fetchone()

        if result is None:
            raise HTTPException(status_code=404, detail="Client not found")

        delete_query = "DELETE FROM employees WHERE employee_id = %s"
        cursor.execute(delete_query, (employee_id,))
        db.commit()

        cursor.close()
        db.close()

        return {"message": "Employee deleted successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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

#################### CLASES ####################

# ---------- Función para obtener todas las clases ---------- #
@app.get("/all_classes")
def get_classes():
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "SELECT * FROM classes"
        cursor.execute(query)
        results = cursor.fetchall()

        classes = []
        for result in results:
            class_data = {
                "class_id": result[0],
                "class_date": result[1],
                "class_hour": result[2],
                "duration": result[3],
                "class_name": result[4],
                "number_spaces": result[5],
                "employee_id": result[6]
            }
            classes.append(class_data)

        cursor.close()
        db.close()

        return {"classes":classes}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}

# ---------- Función para obtener todas las clases de un dia especifico ---------- #
@app.get("/classes")
def get_classes(day: str):
    try:
        db = make_connection()
        cursor = db.cursor()
        
        query = "SELECT * FROM classes WHERE class_date = %s"
        cursor.execute(query, (day,))
        results = cursor.fetchall()

        classes = []
        for result in results:
            class_data = {
                "class_id": result[0],
                "class_date": result[1],
                "class_hour": result[2],
                "duration": result[3],
                "class_name": result[4],
                "number_spaces": result[5],
                "employee_id": result[6]
            }
            classes.append(class_data)

        cursor.close()
        db.close()

        return {"classes":classes}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}

# ---------- Función para obtener una clase con un determinado id ---------- #
@app.get("/classes/{class_id}")
def get_class_by_id(class_id: int):
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "SELECT * FROM classes WHERE class_id = %s"
        cursor.execute(query, (class_id,))
        result = cursor.fetchone()

        if result is None:
            return {"error": "Class not found"}

        class_data = {
            "class_id": result[0],
            "class_date": str(result[1]),
            "class_hour": str(result[2]),
            "duration": result[3],
            "class_name": result[4],
            "number_spaces": result[5],
            "employee_id": result[6]
        }

        cursor.close()
        db.close()

        return {"class": class_data}

    except Exception as e:
        return {"error": str(e)}

# ---------- Función para crear una nueva clase ---------- #
@app.post("/classes")
def create_class(class_data: ClassModel):
    try:
        class_date = class_data.class_date
        class_hour = class_data.class_hour
        duration = class_data.duration
        employee_id = class_data.employee_id
        class_name = class_data.class_name
        number_spaces = class_data.number_spaces

        db = make_connection()

        cursor = db.cursor()

        query = """
        INSERT INTO classes (class_date, class_hour, duration, employee_id, class_name, number_spaces)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        values = (class_date, class_hour, duration, employee_id, class_name, number_spaces)

        cursor.execute(query, values)

        db.commit()

        cursor.close()
        db.close()

        return {"message": "Class created successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------- Función para eliminar una clase ---------- #
@app.delete("/classes/{class_id}")
def delete_class(class_id: int):
    try:
        db = make_connection()

        cursor = db.cursor()

        cursor.execute("SELECT COUNT(1) FROM classes WHERE class_id = %s", (class_id,))
        exists = cursor.fetchone()[0]
        
        if not exists:
            cursor.close()
            db.close()
            raise HTTPException(status_code=404, detail="Class not found")

        query = "DELETE FROM classes WHERE class_id = %s"
        cursor.execute(query, (class_id,))

        db.commit()

        cursor.close()
        db.close()

        return {"message": f"Class with ID {class_id} deleted successfully"}

    except Exception as e:
        # Handle any exceptions and return an error response
        raise HTTPException(status_code=500, detail=str(e))

# ---------- Función para editar una clase ---------- #
@app.put("/classes/{class_id}")
def update_class(class_id: int, class_data: ClassModel):
    try:
        db = make_connection()
        cursor = db.cursor()

        update_data = class_data.dict(exclude_unset=True)
        set_statements = [f"{key} = %s" for key in update_data.keys()]
        query = f"UPDATE classes SET {', '.join(set_statements)} WHERE class_id = %s"
        values = list(update_data.values()) + [class_id]

        cursor.execute(query, values)
        updated_rows = cursor.rowcount

        if updated_rows == 0:
            raise HTTPException(status_code=404, detail="Class not found or no update was needed")

        db.commit()
        cursor.close()
        db.close()

        return {"message": f"Class with ID {class_id} updated successfully"}

    except Exception as e:
        return {"error": str(e)}

# ---------- Función para decrementar numero de plazas disponibles ---------- #
@app.post("/classes/{class_id}/decrement_spaces")
def decrement_spaces(class_id: int):
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "UPDATE classes SET number_spaces = number_spaces - 1 WHERE class_id = %s AND number_spaces > 0"
        cursor.execute(query, (class_id,))

        updated_rows = cursor.rowcount
        if updated_rows == 0:
            raise HTTPException(status_code=404, detail="Class not found or no spaces available")

        db.commit()
        cursor.close()
        db.close()

        return {"message": f"Number of spaces for class with ID {class_id} decremented successfully"}

    except Exception as e:
        return {"error": str(e)}

# ---------- Función para aumentar numero de plazas disponibles ---------- #
@app.post("/classes/{class_id}/increment_spaces")
def increment_spaces(class_id: int):
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "UPDATE classes SET number_spaces = number_spaces + 1 WHERE class_id = %s"
        cursor.execute(query, (class_id,))

        updated_rows = cursor.rowcount
        if updated_rows == 0:
            raise HTTPException(status_code=404, detail="Class not found")

        db.commit()
        cursor.close()
        db.close()

        return {"message": f"Number of spaces for class with ID {class_id} incremented successfully"}

    except Exception as e:
        return {"error": str(e)}

# ---------- Función para obtener las clases del dia y los proximos 6 dias ---------- #
@app.get("/upcoming_classes")
def get_upcoming_classes():
    try:
        db = make_connection()
        cursor = db.cursor()

        today = datetime.today().date()
        seven_days_from_now = today + timedelta(days=6)

        query = """
        SELECT * FROM classes 
        WHERE class_date >= %s AND class_date <= %s 
        ORDER BY class_date ASC, class_hour ASC
        """
        cursor.execute(query, (today, seven_days_from_now))
        results = cursor.fetchall()

        classes = []
        for result in results:
            class_data = {
                "class_id": result[0],
                "class_date": result[1],
                "class_hour": result[2],
                "duration": result[3],
                "class_name": result[4],
                "number_spaces": result[5],
                "employee_id": result[6]
            }
            classes.append(class_data)

        cursor.close()
        db.close()

        return {"upcoming_classes": classes}

    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}


#################### ASISTENCIA ####################

# ---------- Función para obtener una asistencia segun cliente ---------- #
@app.get("/assistance_by_client/{client_id}")
def get_classes_for_client(client_id: int):
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "SELECT client_id, class_id FROM client_classes WHERE client_id = %s"
        cursor.execute(query, (client_id,))
        results = cursor.fetchall()

        if not results:
            raise HTTPException(status_code=404, detail="No classes found for this client")

        assistances = [AssistenceModel(client_id=row[0], class_id=row[1]) for row in results]

        cursor.close()
        db.close()

        return assistances

    except Exception as e:
        return {"error": str(e)}

# ---------- Función para obtener una asistencia segun clase ---------- #
@app.get("/assistance_by_class/{class_id}")
def get_clients_for_class(class_id: int):
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "SELECT client_id, class_id FROM client_classes WHERE class_id = %s"
        cursor.execute(query, (class_id,))
        results = cursor.fetchall()

        if not results:
            raise HTTPException(status_code=404, detail="No clients found for this class")

        assistances = [AssistenceModel(client_id=row[0], class_id=row[1]) for row in results]

        cursor.close()
        db.close()

        return assistances

    except Exception as e:
        return {"error": str(e)}

# ---------- Función para crear una asistencia ---------- #
@app.post("/assistance/")
def create_assistance(client_id: int, class_id: int):
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "INSERT INTO client_classes (client_id, class_id) VALUES (%s, %s)"
        cursor.execute(query, (client_id, class_id))

        db.commit()
        cursor.close()
        db.close()

        return {"message": f"Assistance for client {client_id} in class {class_id} created successfully"}

    except Exception as e:
        return {"error": str(e)}

# ---------- Función para borrar una asistencia ---------- #
@app.delete("/delete_assistance/{client_id}/{class_id}")
def delete_assistance(client_id: int, class_id: int):
    try:
        db = make_connection()
        cursor = db.cursor()

        query = "DELETE FROM client_classes WHERE client_id = %s AND class_id = %s"
        cursor.execute(query, (client_id, class_id))
        deleted_rows = cursor.rowcount

        if deleted_rows == 0:
            raise HTTPException(status_code=404, detail="Assistance not found")

        db.commit()
        cursor.close()
        db.close()

        return {"message": f"Assistance for client {client_id} in class {class_id} deleted successfully"}

    except Exception as e:
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
