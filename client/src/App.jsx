import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Pages/Home';
import UserForm from './registrationForm';
import About from './Pages/About';
import Navbar from './Navbar';
import Header from './Pages/Header';
import Courses from './Pages/Courses';
import Blog from './Pages/Blog';



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header/>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/registration",
    element: (
      <>
        <Navbar />
        <UserForm />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Navbar />
        <About />
      </>
    ),
  },
  {
    path: "/courses",
    element: (
      <>
        <Navbar />
        <Courses />
      </>
    ),
  },
  {
    path: "/blog",
    element: (
      <>
        <Navbar />
        <Blog />
      </>
    ),
  },
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
