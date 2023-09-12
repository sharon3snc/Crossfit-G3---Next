import React, { useState } from 'react';
import axios from 'axios';

const EditEmployeeModal = ({ employeeData, onClose, onEdit, employee }) => {
  const [formData, setFormData] = useState({
    name: employeeData.name,
    surname: employeeData.surname,
    email: employeeData.email,
    birthdate: employeeData.birthdate,
    phone: employeeData.phone,
    user_admin: employeeData.user_admin,
    password: employeeData.password,
    employee_id: employeeData.employee_id,
  });


  const user_type_available = (parseInt(employee) === formData.employee_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/employees/${employeeData.employee_id}`, formData);
      alert('Información de monitor ha sido actualizada');
      onEdit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Editar Monitor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="text"
            name="birthdate"
            value={formData.birthdate}
            onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
          />
        </div>
        <div>
          <label>Telefono:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        {!user_type_available && (<div>
          <label>Administrador:</label>
          <input
            type="checkbox"
            name="admin"
            value={formData.user_admin}
            checked={formData.user_admin}
            onChange={(e) => setFormData({ ...formData, user_admin: e.target.checked })}
          />
        </div>)}
        <div>
          <button type="submit">Editar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeModal;
