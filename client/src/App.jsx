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

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <>
//         <Header />
//         <Navbar />
//         <Home />
//       </>
//     ),
//   },
//   {
//     path: "/registration",
//     element: (
//       <>
//         <Navbar />
//         <UserForm />
//       </>
//     ),
//   },
//   {
//     path: "/about",
//     element: (
//       <>
//         <Navbar />
//         <About />
//       </>
//     ),
//   },
//   {
//     path: "/courses",
//     element: (
//       <>
//         <Navbar />
//         <Courses />
//       </>
//     ),
//   },
//   {
//     path: "/blog",
//     element: (
//       <>
//         <Navbar />
//         <Blog />
//       </>
//     ),
//   },
// ]);

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
