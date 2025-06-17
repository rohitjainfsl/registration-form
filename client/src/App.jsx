import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Pages/Home";
import UserForm from "./Pages/StudentPages/registrationForm";
import About from "./Pages/About";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Courses from "./Pages/Courses";
import Blog from "./Pages/Blog";
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
import Privacy from "./Privacy";
import ScoreList from "./Pages/AdminPages/ScoreList";
// import TestScoresPage from "./Pages/AdminPages/TestScorePage";
import Breadcrumbs from "./Components/Breadcrumbs"; // ✅ Imported
import "./App.css";
import SeeTestCsore from "./Pages/AdminPages/SeeTestScore";
import TestScoresPage from "./Pages/AdminPages/TestScore"

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
        />
        <Route
          path="/student/login"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <StudentLogin />
            </>
          }
        />
        <Route
          path="/student/quiz/:testId"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <StudentQuiz />
            </>
          }
        />
        <Route
          path="/student/studentpanel"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <StudentPanel />
            </>
          }
        />
        <Route
          path="/registration"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <UserForm />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <About />
            </>
          }
        />
        <Route
          path="/course"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <Courses />
            </>
          }
        />
        <Route
          path="/student/changePassword"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <ChangePassword />
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <Blog />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <Privacy />
            </>
          }
        />
        <Route
          path="/admin/login"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <AdminLogin />
            </>
          }
        />
        <Route
          path="/admin/seeResult"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <SeeTestCsore />
            </>
          }
        />
        <Route
          path="/admin/scorelist"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <ScoreList />
            </>
          }
        />
        <Route
          path="/admin/fetch/students"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Breadcrumbs />
                <StudentList />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/getStudents/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Breadcrumbs />
                <StudentDetails />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Breadcrumbs />
                <AdminHome />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/testScore/:id"
          element={
            <ProtectedRoute>
            <>
                <Navbar />
                <Breadcrumbs />
                <TestScoresPage />
              </>
              </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create/test"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Breadcrumbs />
                <CreateTestForm />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view/test/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Breadcrumbs />
                <ViewTest />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/update/test/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Breadcrumbs />
                <UpdateTest />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/result"
          element={
            <>
              <Navbar />
              <Breadcrumbs />
              <ResultPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
