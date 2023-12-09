import { lazy } from "react";

const Course = lazy(() => import("../../pages/courses/index"));

const CourseRoutes = [
  {
    path: "/course-management",
    element: <Course />,
  },
  {
    path: "/course-comments-management",
    element: <Course />,
  },
];

export default CourseRoutes;
