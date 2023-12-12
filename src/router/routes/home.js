import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("../../pages/dashboard/Home"));

const DefaultRoute = "/home";

const Dashboard = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];

export default Dashboard;
