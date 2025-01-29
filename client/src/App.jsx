import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./Pages/Home";
import UserForm from "./registrationForm";
import About from "./Pages/About";
import Navbar from "./Navbar";
import Header from "./Pages/Header";
import Courses from "./Pages/Courses";
import Blog from "./Pages/Blog";
import "./App.css";
import Login from "./login";
// import ProfilePage from "./Pages/UploadImage";
import UploadImage from "./Pages/UploadImage";
import ChangePassword from "./ChangePassword";


function App() {
  // return <RouterProvider router={router} />;
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
      </Routes>
    </BrowserRouter>

  
  );
}

export default App;
