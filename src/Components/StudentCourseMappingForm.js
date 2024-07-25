import React, { useState } from 'react';
import axios from '../axiosConfig'; // Import the configured Axios instance

const StudentCourseMappingForm = ({ onClose, onUpdate }) => {
  const [studentId, setStudentId] = useState('');
  const [courseIds, setCourseIds] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'studentId') {
      setStudentId(value);
    } else {
      setCourseIds(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const coursesArray = courseIds.split(',').map(id => id.trim());
    axios.patch(`/student-api/mapping/${studentId}`, coursesArray)
      .then(response => {
        onUpdate(response.data.data);
        onClose();
      })
      .catch(error => console.error('There was an error mapping the student to courses!', error));
  };

  return (
    <div className="mapping-form">
      <h2>Map Student to Courses</h2>
      <form onSubmit={handleSubmit}>
        <label>Student Id :</label>
        <input name="studentId" value={studentId} onChange={handleChange} placeholder="Student Id" required /><br/>
        <label>Course Ids :</label>
        <input name="courseIds" value={courseIds} onChange={handleChange} placeholder="Course IDs (comma separated)" required /><br/>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default StudentCourseMappingForm;
