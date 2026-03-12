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
import Login from "@/pages/Login";
// import StudentChangePassword from "@/pages/StudentPages/StudentPanel";
// import StudentDashboard from "@/pages/StudentPages/StudentPanel/StudentDashboard";
import ResetPassword from '@/pages/ResetPassword'


import { AdminProvider } from "@/Context/Admincontext";
import CreateTestForm from "@/pages/AdminPages/Admin Create test";
import AdminViewStudent from "@/pages/AdminPages/AdminViewStudent";
import AdminViewResult from "@/pages/AdminPages/AdminViewResult";
import TestScoresPage from '@/pages/AdminPages/AdminViewResult/testScore/indexView'



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
            <Route path="/courses/:slug" element={<CoursePage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/student/changepassword"
              element={
                <ResetPassword />
              }
            />
            <Route
              path="/student/studentpanel"
              element={
                <ProtectedRoute allowedRoles={["student"]} redirectTo="/login">
                  <StudentPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/result"
              element={
                <ProtectedRoute allowedRoles={["student"]} redirectTo="/login">
                  <StudentResult />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/home"
            element={
              <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login">
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ViewStudent"
            element={
              <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login">
                <AdminViewStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ViewResult"
            element={
              <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login">
                <AdminViewResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/test/:testId/scores"
            element={
              <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login">
                <TestScoresPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/create/test"
            element={
              <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login">
                <CreateTestForm />
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
