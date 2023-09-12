import React, { useState } from 'react';
import axios from 'axios';

const EditClientModal = ({ clientData, onClose, onEdit }) => {
  const [formData, setFormData] = useState({
      name: clientData.name,
      surname: clientData.surname,
      email: clientData.email,
      birthdate: clientData.birthdate,
      phone: clientData.phone,
      emergency_contact: clientData.emergency_contact,
      emergency_phone: clientData.emergency_phone,
      rate_id: clientData.rate_id,
      password: clientData.password,
      available_classes: clientData.available_classes,
      client_id: clientData.client_id,
      inscription_date: clientData.inscription_date

  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/clients/${clientData.client_id}`, formData);
      alert('Información de cliente ha sido actualizada');
      onEdit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Editar Cliente</h2>
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
        <div>
          <label>Contacto de emergencia:</label>
          <input
            type="text"
            name="emergency_contact"
            value={formData.emergency_contact}
            onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
          />
        </div>
        <div>
          <label>Telefono de emergencia:</label>
          <input
            type="text"
            name="emergency_phone"
            value={formData.emergency_phone}
            onChange={(e) => setFormData({ ...formData, emergency_phone: e.target.value })}
          />
        </div>
        <div>
          <label>Tarifa:</label>
          <input
            type="text"
            name="rate"
            value={formData.rate_id}
            onChange={(e) => setFormData({ ...formData, rate_id: e.target.value })}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div>
          <button type="submit">Editar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditClientModal;
