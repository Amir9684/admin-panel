import { lazy } from "react";

const Blog = lazy(() => import("../../pages/blogs/list"));
const EditBlog = lazy(() => import("../../pages/blogs/edit"));

const BlogRoute = [
  {
    path: "/news",
    element: <Blog />,
  },
  {
    path: "/news/:id",
    element: <EditBlog />,
  },
];

export default BlogRoute;
