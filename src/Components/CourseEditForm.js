import React, { useState } from 'react';
import axios from '../axiosConfig'; // Import the configured Axios instance

const CourseEditForm = ({ course, onClose, onUpdate }) => {
    // console.log(course);
  const [formValues, setFormValues] = useState({
    courseDurationn: course.courseDuration,
    courseFee: course.courseFee
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/course-api/modify/${course.courseId}/${formValues.courseDurationn}/${formValues.courseFee}`)
      .then(response => {
        onUpdate(response.data.data);
        onClose();
      })
      .catch(error => console.error('There was an error updating the Course!', error));
  };

  return (
    <div className="edit-form">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <label>Duration :</label>
        <input name="Duration" value={formValues.Duration} onChange={handleChange} placeholder="Duration" required /><br/>
        <label>Fee :</label>
        <input name="Fee" value={formValues.Fee} onChange={handleChange} placeholder="Fee" required /><br/>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default CourseEditForm;
