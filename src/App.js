import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import CourseTable from './Components/CourseTable';
import StudentForm from './Components/StudentForm';
import StudentTable from './Components/StudenTable';
import CourseForm from './Components/CourseForm';
import Home from './Components/Home';
function App() {
  return (
    <Router>
      <div>
        <h1>Student and Course Management</h1>
        <nav>
          <ul>
            <li>
              <Link to="/students">Students</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            
          </ul>
        </nav>
        <Routes>
          <Route path="/"  /> {/* Redirect to /students */}
          <Route path="/students/*" element={<StudentTable />} />
          <Route path="/courses" element={<CourseTable />} />
          <Route path='/addStudent' element={<StudentForm />} />
          <Route path='/addcourse' element={<CourseForm />}/>
          <Route path='/Home' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
