import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/js/bootstrap.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App.jsx";
import { AdminProvider } from "./Pages/Context/Admincontext.jsx";


createRoot(document.getElementById("root")).render(
    <AdminProvider><App /></AdminProvider>

);
