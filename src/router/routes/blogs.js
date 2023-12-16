import { lazy } from "react";

const Blog = lazy(() => import("../../pages/blogs/list"));
const EditBlog = lazy(() => import("../../pages/blogs/edit"));
const AddBlog = lazy(() => import("../../pages/blogs/add"));
const BlogComments = lazy(() => import("../../pages/blogs/comments"));
const Replies = lazy(() =>
  import("../../pages/courses/comments/replies")
);

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
  {
    path: "/news/comments/:id",
    element: <BlogComments />,
  },
  {
    path: "/news/comments/:courseId/:commentId",
    element: <Replies />,
  },
];

export default BlogRoute;
