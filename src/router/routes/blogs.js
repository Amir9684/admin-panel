import { lazy } from "react";

const Blog = lazy(() => import("../../pages/blogs/list"));
const EditBlog = lazy(() => import("../../pages/blogs/edit"));
const AddBlog = lazy(() => import("../../pages/blogs/add"));

const BlogRoute = [
  {
    path: "/news",
    element: <Blog />,
  },
  {
    path: "/news/:id",
    element: <EditBlog />,
  },
  {
    path: "/news/add",
    element: <AddBlog />,
  },
];

export default BlogRoute;
