import { lazy } from "react";

const Technologies = lazy(() => import("../../pages/techs/index"));

const TechRoutes = [
  {
    path: "/techs-management",
    element: <Technologies />,
  },
];

export default TechRoutes;
