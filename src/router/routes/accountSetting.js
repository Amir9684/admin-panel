import { lazy } from "react";

const AccountSetting = lazy(() => import("../../pages/account-settings"))

const AccountSettingRoutes = [
  {
    path: "/account-settings",
    element: <AccountSetting />,
  },
];

export default AccountSettingRoutes;