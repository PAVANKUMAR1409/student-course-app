import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Import the configured Axios instance

const Home = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [coursesWithStudents, setCoursesWithStudents] = useState(0);

  useEffect(() => {
    // Fetch total students count
    axios.get('/student-api/findAll')
      .then(response => {
        setTotalStudents(response.data.data.length);
      })
      .catch(error => console.error('There was an error fetching the students count!', error));
    
    // Fetch total courses count
    axios.get('/course-api/findAll')
      .then(response => {
        const courses = response.data.data;
        setTotalCourses(courses.length);
        console.log(courses.studentIds);
        // Calculate courses with at least one student mapped
        const mappedCourses = courses.filter(course => course.studentIds.length > 0).length;
        setCoursesWithStudents(mappedCourses);
      })
      .catch(error => console.error('There was an error fetching the courses count!', error));
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <p>Total Students: {totalStudents}</p>
      <p>Total Courses: {totalCourses}</p>
      <p>Courses with Students: {coursesWithStudents}</p>
    </div>
  );
};

export default Home;
