import React, {  useState } from 'react';
import axios from '../axiosConfig'; // Import the configured Axios instance
import './StudentForm.css'; // Import the CSS file

const StudentForm = () => {
  const [student, setStudent] = useState({
    studentId: '',
    fname: '',
    lname: '',
    mailId: '',
    phoneNo: '',
    courseIds: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
   
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedStudent = {
      ...student,
      courseIds: student.courseIds.split(',').map(id => id.trim())
    };
    axios.post('/student-api/save', formattedStudent)
      .then(response => {
        console.log(response.data);
        setStudent({ studentId: '', fname: '', lname: '', mailId: '', phoneNo: '', courseIds: '' });
      })
      .catch(error => console.error('There was an error saving the student!', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Student</h2>
      <label>StudentId :</label>
      <input name="studentId" value={student.studentId} onChange={handleChange} placeholder="Student Id" required /><br/>
      <label>First Name :</label>
      <input name="fname" value={student.fname} onChange={handleChange} placeholder="First Name" required /><br/>
      <label>Last Name :</label>
      <input name="lname" value={student.lname} onChange={handleChange} placeholder="Last Name" required /><br/>
      <label>Email :</label>
      <input name="mailId" value={student.mailId} onChange={handleChange} placeholder="Email" required /><br/>
      <label>Phone No :</label>
      <input name="phoneNo" value={student.phoneNo} onChange={handleChange} placeholder="Phone" required /><br/>
      <label>Course Ids :</label>
      <input name="courseIds" value={student.courseIds} onChange={handleChange} placeholder="Course IDs (comma separated)" /><br/>
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
