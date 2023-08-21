// Create a new file named 'EditClientModal.js'
import React, { useState } from 'react';
import axios from 'axios';

const EditClientModal = ({ clientData, onClose }) => {
  // Create state variables to manage the edited client data
  const [formData, setFormData] = useState({
    name: clientData.name,
    surname: clientData.surname,
    email: clientData.email,
    // Add other client fields here...
  });

  // Implement a function to handle form submission and update the client data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an API call to update the client data with the formData
      await axios.put(`http://localhost:8000/clients/${clientData.client_id}`, formData);
      alert('Client data updated successfully!');
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Client Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for editing client data */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
          />
        </div>
        {/* Add other input fields for other client data... */}
        <div>
          <button type="submit">Save Changes</button>
          <button onClick={onClose}>Discard</button>
        </div>
      </form>
    </div>
  );
};

export default EditClientModal;
