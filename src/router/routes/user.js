import { lazy } from "react";

const UserManagement = lazy(() => import("../../pages/user-management/list"))

const UserRoutes = [
  {
    path: "/user-management",
    element: <UserManagement />,
  },
];

export default UserRoutes;