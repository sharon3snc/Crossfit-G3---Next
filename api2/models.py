from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Time, DateTime
from sqlalchemy.orm import relationship


from database import Base

class Client(Base):
    __tablename__ = "clients"

    client_id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True )
    password = Column(String)
    name = Column(String)
    surname = Column(String)
    birthdate = Column(Date)
    phone = Column(String)
    inscription_date = Column(Date)
    emergency_contact = Column(String)
    emergency_phone = Column(String)
    rate_id = Column(Integer)
    available_classes = Column(Integer)
    
    # Relationship
    assistences = relationship("Assistence", back_populates="client")

class Employee(Base):
    __tablename__ = "employees"
    
    employee_id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String)
    surname = Column(String)
    birthdate = Column(String)
    phone = Column(String)
    user_admin = Column(Boolean)
    
class Class(Base):
    __tablename__ = "classes"
    
    class_id = Column(Integer, primary_key=True, index=True)
    class_date = Column(Date)
    class_hour = Column(Time)
    duration = Column(Integer)
    class_name = Column(String)
    number_spaces = Column(Integer)
    employee_id = Column(Integer)
    
    # Relationship
    assistences = relationship("Assistence", back_populates="class_entry")

class Assistence(Base):
    __tablename__ = "assistences"
    
    assistence_id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.client_id"))
    class_id = Column(Integer, ForeignKey("classes.class_id"))
    
    # Relationship
    client = relationship("Client", back_populates="assistences")
    class_entry = relationship("Class", back_populates="assistences")



# class ClassModel(BaseModel):
#     class_date: date
#     class_hour: time
#     duration: int
#     employee_id: int
#     class_name: str
#     number_spaces: int

# class AssistenceModel(BaseModel):
#     client_id: int
#     class_id: int

# class ClientModel(BaseModel):
#     email: str
#     password: str
#     name: str
#     surname: str
#     birthdate: str
#     phone: str
#     inscription_date: str
#     emergency_contact: str
#     emergency_phone: str
#     rate_id: int
#     available_classes: int
    
# class EmployeeModel(BaseModel):
#     email: str
#     password: str
#     name: str
#     surname: str
#     birthdate: str
#     phone: str
#     user_admin: bool
