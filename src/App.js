
import StudentTable from "./Components/StudenTable";
// import StudentCourseMappingForm from "./Components/StudentCourseMappingForm";
import CourseForm from "./Components/CourseForm";
import StudentForm from "./Components/StudentForm";
import CourseTableNew from "./Components/CourseTable";
function App() {
 

  
  return (
    <div>
      
      <h1>Student and Course Management</h1>
      <StudentTable />
      <CourseTableNew />
      <StudentForm/>
      <CourseForm/>
      {/* <StudentCourseMappingForm/> */}
    </div>
  );
}

export default App;
