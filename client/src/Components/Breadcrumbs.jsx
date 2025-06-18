import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbMap = {
    admin: "Admin",
    test: "All Tests",
    scores: "All Students",
    attempts: "Student Attempts",
  };

  return (
    <Breadcrumb>
      {pathnames.map((segment, index) => {
        // Customize route for 'admin' to point to /admin/home
        let routeTo = "/" + pathnames.slice(0, index + 1)+"/"+"home";
        if (segment === "Admin") {
          routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        }

        const label = breadcrumbMap[segment] || segment;

        return (
          <Breadcrumb.Item
            key={routeTo}
            linkAs={Link}
            linkProps={{ to: routeTo }}
            active={index === pathnames.length - 1}
          >
            {label}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
