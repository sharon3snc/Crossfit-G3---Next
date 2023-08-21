// Create a new file named 'EditEmployeeModal.js'
import React, { useState } from 'react';
import axios from 'axios';

const EditEmployeeModal = ({ employeeData, onClose }) => {
  // Create state variables to manage the edited employee data
  const [formData, setFormData] = useState({
    name: employeeData.name,
    surname: employeeData.surname,
    email: employeeData.email,
    // Add other employee fields here...
  });

  // Implement a function to handle form submission and update the employee data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an API call to update the employee data with the formData
      await axios.put(`http://localhost:8000/employees/${employeeData.employee_id}`, formData);
      alert('Employee data updated successfully!');
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Employee Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for editing employee data */}
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
        {/* Add other input fields for other employee data... */}
        <div>
          <button type="submit">Save Changes</button>
          <button onClick={onClose}>Discard</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeModal;
