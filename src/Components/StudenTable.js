import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Import the configured Axios instance
import './StudentTable.css'; // Import the CSS file
import StudentEditForm from './StudentEditForm'; // Import the EditForm component
import StudentCourseMappingForm from './StudentCourseMappingForm';
import { Link } from 'react-router-dom';



const StudentTable = React.forwardRef((props, ref) => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [mappingStudent, setMappingStudent] = useState(null);

  const fetchStudents = () => {
    axios.get('/student-api/findAll')
      .then(response => setStudents(response.data.data))
      .catch(error => console.error('There was an error fetching the students!', error));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  React.useImperativeHandle(ref, () => ({
    fetchStudents
  }));

  const handleDelete = (id) => {
    axios.delete(`/student-api/delete/${id}`)
      .then(response => {
        setStudents(students.filter(student => student.studentId !== id));
      })
      .catch(error => console.error('There was an error deleting the student!', error));
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleMapping = (student) => {
    setMappingStudent(student);
  };

  const handleUpdate = (updatedStudent) => {
    setStudents(students.map(student =>
      student.studentId === updatedStudent.studentId ? updatedStudent : student
    ));
  };

  return (
    <div>
      <h2>Students</h2>
      <Link to="/addStudent">AddStudent</Link>
      {editingStudent && 
        <StudentEditForm 
          student={editingStudent} 
          onClose={() => setEditingStudent(null)} 
          onUpdate={handleUpdate} 
        />
      }
      {
        mappingStudent && 
        <StudentCourseMappingForm 
          student={mappingStudent} 
          onClose={() => setMappingStudent(null)} 
          onUpdate={handleUpdate} 
        />
      }
      <table>
        <thead>
          <tr>
            <th>StudentId</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Courses</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Map Courses</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.fname}</td>
              <td>{student.lname}</td>
              <td>{student.mailId}</td>
              <td>{student.phoneNo}</td>
              <td>{student.courseIds.join(', ')}</td>
              <td><button onClick={() => handleEdit(student)}>Edit</button></td>
              <td><button onClick={() => handleDelete(student.studentId)}>Delete</button></td>
              <td><button onClick={() => handleMapping(student)}>Map Courses</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      
       
      
    </div>
  );
});

export default StudentTable;
