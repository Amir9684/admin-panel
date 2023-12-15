import { lazy } from "react";

const Course = lazy(() => import("../../pages/courses/index"));
const AddCourse = lazy(() => import("../../pages/courses/add"));
const EditCourse = lazy(() => import("../../pages/courses/edit"));

const CourseRoutes = [
  {
    path: "/course-management",
    element: <Course />,
  },
  {
    path: "/course-management/add",
    element: <AddCourse />,
  },
  {
    path: "/course-management/:id",
    element: <EditCourse />,
  },
];

export default CourseRoutes;
