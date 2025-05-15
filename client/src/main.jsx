import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/js/bootstrap.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App.jsx";
import { StudentProvider } from "./Pages/Context/StudentContext.jsx";


createRoot(document.getElementById("root")).render(
    <StudentProvider><App /></StudentProvider>

);
