import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { useContext } from "react";
import Home from "./Pages/Home";
import UserForm from "./registrationForm";
import About from "./Pages/About";
import Navbar from "./Navbar";
import Courses from "./Pages/Courses";
import Blog from "./Pages/Blog";
import "./App.css";
import Login from "./login";
import UploadImage from "./Pages/UploadImage";
import ChangePassword from "./ChangePassword";
import AdminLogin from "./Pages/AdminLogin";
import StudentList from "./Pages/FetchStudents";
import StudentDetails from "./Pages/StudentDetails";
import ProtectedRoute from "./Pages/ProtectedRoute/ProtectedRoute";
import { adminContext } from "./Pages/Context/Admincontext";


import AdminHome from "./Pages/Routes/AdminHome";
import OutLate from "./Pages/Routes/OutLate";



function App() {
  const { isAuthenticated } = useContext(adminContext);
  // const navigate = useNavigate();
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={isAuthenticated ? <AdminHome />   : <OutLate />} />

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
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <UploadImage />
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
              {/* <Navbar /> */}
              <AdminLogin />
            </>
          }
        ></Route>
        <Route
          path="/admin/home"
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
      </Routes>,

    </BrowserRouter >


  );
}

export default App;
