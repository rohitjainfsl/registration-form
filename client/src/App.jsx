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

import ResultPage from "./Pages/StudentPages/ResultPage";

import Privacy from "./privacy";
import ScoreList from "./Pages/AdminPages/ScoreList";


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
          path="/student/changePassword"
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
          path="/privacy-policy"
          element={
            <>
              <Navbar />
              <Privacy />
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
          path="/admin/scorelist"
          element={
            <>  
              <Navbar />
              <ScoreList />
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
            <ProtectedRoute>
            <>
              <Navbar />
              <StudentDetails />
            </>
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
            <>
              <Navbar />
              <AdminHome />
            </>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/create/test"
          element={
            <ProtectedRoute>
            <>
              <Navbar />
              <CreateTestForm />
            </>
            </ProtectedRoute>
          }
        ></Route>
                <Route
          path="/admin/view/test/:id"
          element={
            <ProtectedRoute>
            <>
              <Navbar />
              <ViewTest/>
            </>
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
            <>
              <Navbar />
              <AdminHome />
            </>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin/create/test"
          element={
            <ProtectedRoute>
            <>
              <Navbar />
              <CreateTestForm />
            </>
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/admin/update/test/:id"
          element={
            <ProtectedRoute>
            <>
              <Navbar />
              <UpdateTest />
            </>
            </ProtectedRoute>
          }
        ></Route>
                <Route
          path="/admin/view/test/:id"
          element={
          <ProtectedRoute>
            <>
              <Navbar />
              <ViewTest/>
            </>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/student/result"
          element={
        
            <>
              <Navbar />
              <ResultPage/>
            </>
           
          }
        ></Route>

      </Routes>,
      
    </BrowserRouter>

  
  );
}

export default App;



