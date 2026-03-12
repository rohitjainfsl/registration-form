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
import StudentPanel from "@/pages/StudentPages/StudentPanel";
import AppLayout from "@/components/AppLayout/index";
import StudentResult from "@/pages/StudentPages/StudentResult";
// import StudentChangePassword from "@/pages/StudentPages/StudentPanel";
// import StudentDashboard from "@/pages/StudentPages/StudentPanel/StudentDashboard";
import ResetPassword from '@/pages/ResetPassword'
<<<<<<< HEAD
import AdminHome from "@/pages/AdminHome";
=======
import { AdminProvider } from "./Context/Admincontext";

>>>>>>> 17d2f4b763b2d80766e2b4548c04915cd5b8c072

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
          <Route element={<AppLayout />}>
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
            <Route path="/student/changepassword" element={<ResetPassword />} />
            <Route path="/student/studentpanel" element={<StudentPanel />} />
            <Route path="/student/result" element={<StudentResult />} />
            <Route path="/courses/:slug" element={<CoursePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin/home" element={<AdminHome />} />

          </Route>
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
