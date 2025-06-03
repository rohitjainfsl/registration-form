import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Pages/Home";
import UserForm from "./Pages/StudentPages/registrationForm";
import About from "./Pages/About"
import Navbar from "../src/Components/Navbar"
import Header from "./Components/Header";
import Courses from "./Pages/Courses";
import Blog from "./Pages/Blog";
import "./App.css";
import ChangePassword from "./Pages/StudentPages/ChangePassword";
import AdminLogin from "./Pages/AdminPages/AdminLogin";
import StudentList from "./Pages/AdminPages/FetchStudents";
import StudentDetails from "./Pages/AdminPages/StudentDetails";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import AdminHome from "./Pages/AdminPages/AdminHome";
import StudentLogin from "./Pages/StudentPages/StudentLogin";
import CreateTestForm from "./Pages/AdminPages/CreateTest";
import UpdateTest from "./Pages/AdminPages/UpdateTest";
import ViewTest from "./Pages/AdminPages/ViewTest";
import StudentQuiz from "./Pages/StudentPages/StudentQuiz";
import StudentPanel from "./Pages/StudentPages/ReleasedQuiz";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Navbar />
              <Home />
            </>
          }
        ></Route>
        <Route
          path="/student/login"
          element={
            <>
              <Navbar />
              <StudentLogin />
            </>
          }
        ></Route>
        <Route
          path="/student/quiz/:testId"
          element={
            <>
              <Navbar />
              <StudentQuiz />
            </>
          }
        ></Route>
         <Route
          path="/student/studentpanel"
          element={
            <>
              <Navbar />
              <StudentPanel />
            </>
          }
        ></Route>
        
        <Route
          path="/registration"
          element={
            <>
              <Navbar />
              <UserForm />
            </>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        ></Route>
        <Route
          path="/course"
          element={
            <>
              <Navbar />
              <Courses />
            </>
          }
        ></Route>
          <Route
          path="/changePassword"
          element={
            <>
              <Navbar />
              <ChangePassword />
            </>
          }
        ></Route>
        <Route
          path="/blog"
          element={
            <>
              <Navbar />
              <Blog />
            </>
          }
        ></Route>
         <Route
          path="/admin/login"
          element={
            <>  
              <Navbar />
              <AdminLogin />
            </>
          }
        ></Route>
          <Route
          path="/admin/fetch/students"
          element={
            <ProtectedRoute>
              <Navbar />
              <StudentList />
              </ProtectedRoute>
          }
        ></Route>
          
          <Route
          path="/getStudents/:id"
          element={
            <>
              <Navbar />
              <StudentDetails />
            </>
          }
        ></Route>
         <Route
          path="/admin/home"
          element={
            <>
              <Navbar />
              <AdminHome />
            </>
          }
        ></Route>
        <Route
          path="/admin/create/test"
          element={
            <>
              <Navbar />
              <CreateTestForm />
            </>
          }
        ></Route>
         <Route
          path="/admin/update/test/:id"
          element={
            <>
              <Navbar />
              <UpdateTest />
            </>
          }
        ></Route>
                <Route
          path="/admin/view/test/:id"
          element={
            <>
              <Navbar />
              <ViewTest/>
            </>
          }
        ></Route>
         <Route
          path="/admin/home"
          element={
            <>
              <Navbar />
              <AdminHome />
            </>
          }
        ></Route>
        <Route
          path="/admin/create/test"
          element={
            <>
              <Navbar />
              <CreateTestForm />
            </>
          }
        ></Route>
         <Route
          path="/admin/update/test/:id"
          element={
            <>
              <Navbar />
              <UpdateTest />
            </>
          }
        ></Route>
                <Route
          path="/admin/view/test/:id"
          element={
            <>
              <Navbar />
              <ViewTest/>
            </>
          }
        ></Route>
      </Routes>,
      
    </BrowserRouter>

  
  );
}

export default App;
