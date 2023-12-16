import { lazy } from "react";

const Course = lazy(() => import("../../pages/courses/index"));
const AddCourse = lazy(() => import("../../pages/courses/add"));
const EditCourse = lazy(() => import("../../pages/courses/edit"));
const CourseComments = lazy(() => import("../../pages/courses/comments"));
const Replies = lazy(() => import("../../pages/courses/comments/replies"));

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
  {
    path: "/courses-comments",
    element: <CourseComments />,
  },
  {
    path: "/courses-comments/:courseId/:commentId",
    element: <Replies />,
  },
];

export default CourseRoutes;
