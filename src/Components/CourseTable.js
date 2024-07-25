import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Import the configured Axios instance
import './StudentTable.css'; // Import the CSS file
import CourseEditForm from './CourseEditForm'; // Import the EditForm component

const CourseTable = React.forwardRef((props, ref) => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  const fetchCourses = () => {
    axios.get('/course-api/findAll')
      .then(response => setCourses(response.data.data))
      .catch(error => console.error('There was an error fetching the courses!', error));
  };

  useEffect(() => {
    fetchCourses ();
  }, []);

  React.useImperativeHandle(ref, () => ({
    fetchCourses
  }));

  const handleDelete = (id) => {
    axios.delete(`/course-api/delete/${id}`)
      .then(response => {
        setCourses(courses.filter(course => course.courseId !== id));
      })
      .catch(error => console.error('There was an error deleting the student!', error));
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
  };

  const handleUpdate = (updatedCourse) => {
    console.log(updatedCourse);
    setCourses(courses.map(course =>
      course.courseId === updatedCourse.courseId ? updatedCourse : course
    ));
  };

  return (
    <div>
      <h2>Courses</h2>
      {editingCourse && 
        <CourseEditForm 
          course={editingCourse} 
          onClose={() => setEditingCourse(null)} 
          onUpdate={handleUpdate} 
        />
      }
      <table>
        <thead>
          <tr>
            <th>CourseId</th>
            <th>Course Name</th>
            <th>Course Faculty</th>
	          <th>Course Duration</th>
	          <th>Course Fee</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.courseId}>
              <td>{course.courseId}</td>
              <td>{course.courseName}</td>
              <td>{course.courseFaculty}</td>
              <td>{course.courseDuration}</td>
              <td>{course.courseFee}</td>
              <td><button onClick={() => handleEdit(course)}>Edit</button></td>
              <td><button onClick={() => handleDelete(course.courseId)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default CourseTable;
