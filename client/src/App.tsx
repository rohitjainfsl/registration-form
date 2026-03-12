import React, { useEffect, useLayoutEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import CoursePage from "@/pages/CoursePage";
import FullStackDevelopment from "@/pages/courses/FullStackDevelopment";
import FrontendDevelopment from "@/pages/courses/FrontendDevelopment";
import BackendDevelopment from "@/pages/courses/BackendDevelopment";
import DatabaseManagement from "@/pages/courses/DatabaseManagement";
import ReactNativeMobile from "@/pages/courses/ReactNativeMobile";
import DevOpsCloud from "@/pages/courses/DevOpsCloud";
import RegistrationForm from "@/pages/SignupForm";
import LifeAtFSL from "@/pages/LifeAtFSL";
import Loader from "@/components/Loader";
import AdminLogin from "@/pages/AdminPages/AdminLogin";
import AdminHome from "@/pages/AdminPages/AdminHome";
import ProtectedRoute from "@/pages/ProtectedRoute";
import { AdminProvider } from "@/pages/Context/Admincontext";
import { AdminProvider } from "@/Context/Admincontext";
// import StudentChangePassword from "@/pages/StudentPages/StudentPanel";
// import StudentDashboard from "@/pages/StudentPages/StudentPanel/StudentDashboard";
import ResetPassword from '@/pages/ResetPassword'

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    setLoading(true);
  }, [location.pathname]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      <div className={loading ? "pointer-events-none" : ""}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lifeatfsl" element={<LifeAtFSL />} />
          <Route
            path="/courses/full-stack-development"
            element={<FullStackDevelopment />}
          />
          <Route
            path="/courses/frontend-development"
            element={<FrontendDevelopment />}
          />
          <Route
            path="/courses/backend-development"
            element={<BackendDevelopment />}
          />
          <Route
            path="/courses/database-management"
            element={<DatabaseManagement />}
          />
          <Route
            path="/courses/react-native-mobile"
            element={<ReactNativeMobile />}
          />
          <Route path="/courses/devops-cloud" element={<DevOpsCloud />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/student/changePassword" element={<ResetPassword />} />
          {/* <Route path="/student/studentpanel" element={<StudentDashboard />} /> */}
          <Route path="/courses/:slug" element={<CoursePage />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/home"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
    <TooltipProvider>
      <AdminProvider>
=======
    <AdminProvider>
      <TooltipProvider>
>>>>>>> 5def843ed3efefc6e079f993d9a3d3b7c6b0d822
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
<<<<<<< HEAD
      </AdminProvider>
    </TooltipProvider>
=======
      </TooltipProvider>
    </AdminProvider>
>>>>>>> 5def843ed3efefc6e079f993d9a3d3b7c6b0d822
  </QueryClientProvider>
);

export default App;
