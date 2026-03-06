import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import CoursePage from "@/pages/CoursePage";
import FullStackDevelopment from "@/pages/courses/FullStackDevelopment";
import FrontendDevelopment from "@/pages/courses/FrontendDevelopment";
import BackendDevelopment from "@/pages/courses/BackendDevelopment";
import DatabaseManagement from "@/pages/courses/DatabaseManagement";
import ReactNativeMobile from "@/pages/courses/ReactNativeMobile";
import DevOpsCloud from "@/pages/courses/DevOpsCloud";
import Loader from "./Loader";

export default function RouterWithLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // show loader for 2s on initial load and on route changes
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      <div className={loading ? "pointer-events-none" : ""}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses/full-stack-development" element={<FullStackDevelopment />} />
          <Route path="/courses/frontend-development" element={<FrontendDevelopment />} />
          <Route path="/courses/backend-development" element={<BackendDevelopment />} />
          <Route path="/courses/database-management" element={<DatabaseManagement />} />
          <Route path="/courses/react-native-mobile" element={<ReactNativeMobile />} />
          <Route path="/courses/devops-cloud" element={<DevOpsCloud />} />
          {/* dynamic fallback */}
          <Route path="/courses/:slug" element={<CoursePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
