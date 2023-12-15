import { lazy } from "react";

const UserManagement = lazy(() => import("../../pages/user-management/list"))
const UserView = lazy(() => import("../../pages/user-management/view"))

const UserRoutes = [
  {
    path: "/user-management",
    element: <UserManagement />,
  },
  {
    path: "/user-detail/:id",
    element: <UserView />,
  },
];

export default UserRoutes;