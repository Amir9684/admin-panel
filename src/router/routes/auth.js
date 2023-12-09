import { lazy } from "react";

const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));

const AuthRoutes = [
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: 'blank'
    }
  },
];

export default AuthRoutes;
