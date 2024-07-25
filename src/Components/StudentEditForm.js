import React, { useState } from 'react';
import axios from '../axiosConfig'; // Import the configured Axios instance

const StudentEditForm = ({ student, onClose, onUpdate }) => {
  const [formValues, setFormValues] = useState({
    mailId: student.mailId,
    phoneNo: student.phoneNo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/student-api/modify/${student.studentId}/${formValues.mailId}/${formValues.phoneNo}`)
      .then(response => {
        onUpdate(response.data.data);
        onClose();
      })
      .catch(error => console.error('There was an error updating the student!', error));
  };

  return (
    <div className="edit-form">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Email :</label>
        <input name="mailId" value={formValues.mailId} onChange={handleChange} placeholder="Email" required /><br/>
        <label>Phone No :</label>
        <input name="phoneNo" value={formValues.phoneNo} onChange={handleChange} placeholder="Phone" required /><br/>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default StudentEditForm;
