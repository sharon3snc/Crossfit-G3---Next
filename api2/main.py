from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import date, time, datetime, timedelta
import models, database, schemas
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


models.Base.metadata.create_all(bind=database.engine)

def init_db():
    # Create a session
    db = database.SessionLocal()
    try:
        # Check if there's any employee in the database
        employee = db.query(models.Employee).first()
        if not employee:
            # Add an employee instance if none exists
            new_employee = models.Employee(
                employee_id=1,
                email="admin@example.com",
                password="12345",
                name="Admin",
                surname="User",
                birthdate="2000-01-01",
                phone="1234567890",
                user_admin=True
            )
            db.add(new_employee)
            db.commit()
    finally:
        db.close()

@app.on_event("startup")
def startup_event():
    init_db()

# Dependency to get the DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.exception_handler(Exception)
def handle_exception(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": str(exc)},
    )


#################### CLIENTES ####################

# ---------- Función para obtener todos los clientes ---------- #
@app.get("/clients")
def get_clients(db: Session = Depends(get_db)):
    clients = db.query(models.Client).all()
    return {"clients": [client.__dict__ for client in clients]}

# ---------- Función para obtener un solo cliente ---------- #
@app.get("/clients/{client_id}")
def get_client(client_id: int, db: Session = Depends(get_db)):
    client = db.query(models.Client).filter(models.Client.client_id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return {"client": client.__dict__}

# ---------- Función para crear un nuevo cliente ---------- #
@app.post("/clients")
def create_client(client_data: schemas.ClientCreate, db: Session = Depends(get_db)):
    client = models.Client(**client_data.dict())
    db.add(client)
    db.commit()
    db.refresh(client)
    return {"message": "Client created successfully"}


# ---------- Función para editar un cliente ---------- #
@app.put("/clients/{client_id}")
def update_client(client_id: int, client_data: schemas.ClientCreate, db: Session = Depends(get_db)):
    client = db.query(models.Client).filter(models.Client.client_id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    for key, value in client_data.dict().items():
        setattr(client, key, value)
    db.commit()
    return {"message": "Client updated successfully"}

# ---------- Función para eliminar un cliente ---------- #
@app.delete("/clients/{client_id}")
def delete_client(client_id: int, db: Session = Depends(get_db)):
    client = db.query(models.Client).filter(models.Client.client_id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    db.delete(client)
    db.commit()
    return {"message": "Client deleted successfully"}

# ---------- Función para verificar el cliente en login ---------- #
@app.post("/clients/check")
def check_client(request_data: dict, db: Session = Depends(get_db)):
    client_id = request_data.get("client_id")
    password = request_data.get("password")
    client = db.query(models.Client).filter(models.Client.client_id == client_id, models.Client.password == password).first()

    if client:
        return {"exists": True}
    else:
        return {"exists": False}

#################### Empleados ####################

# ---------- Función para obtener todos los empleados ---------- #
@app.get("/employees")
def get_employees(db: Session = Depends(get_db)):
    employees = db.query(models.Employee).all()
    return {"employees": [employee.__dict__ for employee in employees]}

# ---------- Función para obtener un solo empleado ---------- #
@app.get("/employees/{employee_id}")
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.employee_id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"employee": employee.__dict__}

# ---------- Función para crear un nuevo empleado ---------- #
@app.post("/employees")
def create_employee(employee_data: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    # Convert Pydantic model to ORM model
    employee = models.Employee(**employee_data.dict())

    try:
        db.add(employee)  # Add ORM model to session
        db.commit()
        db.refresh(employee)
        return {"message": "Employee created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------- Función para editar un nuevo empleado ---------- #
@app.put("/employees/{employee_id}")
def update_employee(employee_id: int, employee_data: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.employee_id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    for key, value in employee_data.dict().items():
        setattr(employee, key, value)
    
    db.commit()
    return {"message": "Employee updated successfully"}


# ---------- Función para eliminar un cliente ---------- #
@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.employee_id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()
    return {"message": "Employee deleted successfully"}

# ---------- Función para verificar el empleado en login ---------- #
@app.post("/employees/check")
def check_employee(request_data: dict, db: Session = Depends(get_db)):
    employee_id = request_data.get("employee_id")
    password = request_data.get("password")
    employee = db.query(models.Employee).filter(models.Employee.employee_id == employee_id, models.Employee.password == password).first()

    if employee:
        return {"exists": True}
    else:
        return {"exists": False}

#################### CLASES ####################

# ---------- Función para obtener todas las clases ---------- #
@app.get("/all_classes")
def get_classes(db: Session = Depends(get_db)):
    classes = db.query(models.Class).all()
    return {"classes": [class_data.__dict__ for class_data in classes]}


# ---------- Función para obtener todas las clases de un dia especifico ---------- #
@app.get("/classes")
def get_classes_by_date(day: str, db: Session = Depends(get_db)):
    classes = db.query(models.Class).filter(models.Class.class_date == day).all()
    return {"classes": [class_data.__dict__ for class_data in classes]}


# ---------- Función para obtener una clase con un determinado id ---------- #
@app.get("/classes/{class_id}")
def get_class_by_id(class_id: int, db: Session = Depends(get_db)):
    class_data = db.query(models.Class).filter(models.Class.class_id == class_id).first()
    if not class_data:
        raise HTTPException(status_code=404, detail="Class not found")
    return {"class": class_data.__dict__}


# ---------- Función para crear una nueva clase ---------- #
@app.post("/classes")
def create_class(class_data: schemas.ClassCreate, db: Session = Depends(get_db)):
    class_entry = models.Class(**class_data.dict())
    db.add(class_entry)
    db.commit()
    db.refresh(class_entry)
    return {"message": "Class created successfully"}



# ---------- Función para eliminar una clase ---------- #
@app.delete("/classes/{class_id}")
def delete_class(class_id: int, db: Session = Depends(get_db)):
    class_data = db.query(models.Class).filter(models.Class.class_id == class_id).first()
    if not class_data:
        raise HTTPException(status_code=404, detail="Class not found")

    db.delete(class_data)
    db.commit()
    return {"message": "Class deleted successfully"}


# ---------- Función para editar una clase ---------- #
@app.put("/classes/{class_id}")
def update_class(class_id: int, class_data: schemas.ClassCreate, db: Session = Depends(get_db)):
    class_instance = db.query(models.Class).filter(models.Class.class_id == class_id).first()
    if not class_instance:
        raise HTTPException(status_code=404, detail="Class not found")

    for key, value in class_data.dict().items():
        setattr(class_instance, key, value)

    db.commit()
    return {"message": "Class updated successfully"}


# ---------- Función para decrementar numero de plazas disponibles ---------- #
@app.post("/classes/{class_id}/decrement_spaces")
def decrement_spaces(class_id: int, db: Session = Depends(get_db)):
    class_data = db.query(models.Class).filter(models.Class.class_id == class_id, models.Class.number_spaces > 0).first()
    if not class_data:
        raise HTTPException(status_code=404, detail="Class not found or no spaces available")

    class_data.number_spaces -= 1
    db.commit()
    return {"message": "Number of spaces decremented successfully"}


# ---------- Función para aumentar numero de plazas disponibles ---------- #
@app.post("/classes/{class_id}/increment_spaces")
def increment_spaces(class_id: int, db: Session = Depends(get_db)):
    class_data = db.query(models.Class).filter(models.Class.class_id == class_id).first()
    if not class_data:
        raise HTTPException(status_code=404, detail="Class not found")

    class_data.number_spaces += 1
    db.commit()
    return {"message": "Number of spaces incremented successfully"}


# ---------- Función para obtener las clases del dia y los proximos 6 dias ---------- #
@app.get("/upcoming_classes")
def get_upcoming_classes(db: Session = Depends(get_db)):
    today = datetime.today().date()
    seven_days_from_now = today + timedelta(days=6)
    classes = db.query(models.Class).filter(models.Class.class_date.between(today, seven_days_from_now)).order_by(models.Class.class_date.asc(), models.Class.class_hour.asc()).all()
    return {"upcoming_classes": [class_data.__dict__ for class_data in classes]}


#################### ASISTENCIA ####################

# ---------- Función para obtener una asistencia segun cliente ---------- #
@app.get("/assistance_by_client/{client_id}")
def get_classes_for_client(client_id: int, db: Session = Depends(get_db)):
    assistances = db.query(models.Assistence).filter(models.Assistence.client_id == client_id).all()
    if not assistances:
        raise HTTPException(status_code=404, detail="No classes found for this client")
    return [assistance.__dict__ for assistance in assistances]


# ---------- Función para obtener una asistencia segun clase ---------- #
@app.get("/assistance_by_class/{class_id}")
def get_clients_for_class(class_id: int, db: Session = Depends(get_db)):
    assistances = db.query(models.Assistence).filter(models.Assistence.class_id == class_id).all()
    if not assistances:
        raise HTTPException(status_code=404, detail="No clients found for this class")
    return [assistance.__dict__ for assistance in assistances]


# ---------- Función para crear una asistencia ---------- #
@app.post("/assistance/")
def create_assistance(
    client_id: int = Query(..., title="Client ID"),
    class_id: int = Query(..., title="Class ID"),
    db: Session = Depends(get_db)
):
    assistance_data = {"client_id": client_id, "class_id": class_id}
    assistance = models.Assistence(**assistance_data)
    db.add(assistance)
    db.commit()
    db.refresh(assistance)
    return {"message": "Assistance created successfully"}


# ---------- Función para borrar una asistencia ---------- #
@app.delete("/delete_assistance/{client_id}/{class_id}")
def delete_assistance(client_id: int, class_id: int, db: Session = Depends(get_db)):
    assistance = db.query(models.Assistence).filter(models.Assistence.client_id == client_id, models.Assistence.class_id == class_id).first()
    if not assistance:
        raise HTTPException(status_code=404, detail="Assistance not found")
    db.delete(assistance)
    db.commit()
    return {"message": "Assistance deleted successfully"}








# # ---------- CRUD Clases---------- #
# class Clase (BaseModel):
#     id_clase: int
#     fecha: str
#     dia: str
#     hora: str
#     duracion: int
#     coach: str
#     nombre_clase: str
#     num_plazas: int
#     alumnos: list

# clases = []

# async def get_clases():
#     db = make_connection()
#     cursor = db.cursor()
#     cursor.execute("SELECT dia, hora, nombre_clase FROM clases")
#     result = cursor.fetchall()

#     clases = {}
#     for row in result:
#         dia, hora, nombre_clase = row
#         if dia not in clases:
#             clases[dia] = {}
#         clases[dia][hora] = nombre_clase

#     return clases

# @app.get("/clases/{dia}/{hora}")
# async def get_clase(dia: str, hora: str):
#     db = make_connection()
#     cursor = db.cursor()
#     cursor.execute("SELECT nombre_clase FROM clases WHERE dia = %s AND hora = %s", (dia, hora))
#     result = cursor.fetchone()

#     if result:
#         nombre_clase = result[0]
#         return {"dia": dia, "hora": hora, "nombre_clase": nombre_clase}
#     else:
#         return {"error": "Clase no encontrada"}

# @app.post("/clases/{dia}/{hora}")
# async def create_clase(dia: str, hora: str, clase: Clase):
#     db = make_connection()
#     cursor = db.cursor()
#     cursor.execute("INSERT INTO clases (dia, hora, nombre_clase) VALUES (%s, %s, %s)", (dia, hora, clase.nombre_clase))
#     db.commit()

#     return {"message": "Clase creada exitosamente"}

# @app.put("/clases/{dia}/{hora}")
# async def update_clase(dia: str, hora: str, clase: Clase):
#     db = make_connection()
#     cursor = db.cursor()
#     cursor.execute("UPDATE clases SET nombre_clase = %s WHERE dia = %s AND hora = %s", (clase.nombre_clase, dia, hora))
#     db.commit()

#     if cursor.rowcount > 0:
#         return {"message": "Clase actualizada exitosamente"}
#     else:
#         return {"error": "Clase no encontrada"}
    
# @app.delete("/clases/{dia}/{hora}")
# async def delete_clase(dia: str, hora: str):
#     db = make_connection()
#     cursor = db.cursor()
#     cursor.execute("DELETE FROM clases WHERE dia = %s AND hora = %s", (dia, hora))
#     db.commit()

#     if cursor.rowcount > 0:
#         return {"message": "Clase eliminada exitosamente"}
#     else:
#         return {"error": "Clase no encontrada"}
