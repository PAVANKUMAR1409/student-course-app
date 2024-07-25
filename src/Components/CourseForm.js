import React, { useState } from 'react';
import axios from '../axiosConfig'; // Import the configured Axios instance

const CourseForm = () => {
  const [course, setCourse] = useState({
    courseName: '',
    courseFaculty: '',
    courseDuration: '',
    courseFee: '',
    studentIds: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    course.studentIds = course.studentIds.split(',').map(id => id.trim());
    axios.post('/course-api/save', course)
      .then(response => {
        console.log(response.data);
        setCourse({ courseName: '', courseFaculty: '', courseDuration: '', courseFee: '', studentIds: '' });
      })
      .catch(error => console.error('There was an error saving the course!', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Course</h2>
      <label>CourseId :</label>
      <input name="courseId" value={course.courseId} onChange={handleChange} placeholder="Course Id" required /><br/>


      
      <label htmlFor="courseName">Course Name :</label>
      <input name="courseName" value={course.courseName} onChange={handleChange} placeholder="Course Name" required /><br/>
      <label>Course Faculty :</label>
      <input name="courseFaculty" value={course.courseFaculty} onChange={handleChange} placeholder="Faculty" required /><br/>
      <lqabel>Course Duration :</lqabel>
      <input name="courseDuration" value={course.courseDuration} onChange={handleChange} placeholder="Duration" required /><br/>
      <label>Course Fee :</label>
      <input name="courseFee" value={course.courseFee} onChange={handleChange} placeholder="Fee" required /><br/>
    
      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;
