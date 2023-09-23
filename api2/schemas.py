from pydantic import BaseModel
from datetime import date, time

# For Client
class ClientBase(BaseModel):
    email: str
    password: str
    name: str
    surname: str
    birthdate: date
    phone: str
    inscription_date: date
    emergency_contact: str
    emergency_phone: str
    rate_id: int
    available_classes: int

class ClientCreate(ClientBase):
    pass

class Client(ClientBase):
    client_id: int

    class Config:
        orm_mode = True

# For Employee
class EmployeeBase(BaseModel):
    email: str
    password: str
    name: str
    surname: str
    birthdate: str
    phone: str
    user_admin: bool

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    employee_id: int

    class Config:
        orm_mode = True

# For Class
class ClassBase(BaseModel):
    class_date: date
    class_hour: time
    duration: int
    class_name: str
    number_spaces: int
    employee_id: int

class ClassCreate(ClassBase):
    pass

class Class(ClassBase):
    class_id: int

    class Config:
        orm_mode = True

# For Assistence
class AssistenceBase(BaseModel):
    client_id: int
    class_id: int

class AssistenceCreate(AssistenceBase):
    pass

class Assistence(AssistenceBase):
    assistence_id: int

    class Config:
        orm_mode = True

