import { authRoles } from "app/auth";
import React from "react";

const userRouteConfigs = {
  settings: {
    layout: {},
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "/apps/userList",
      component: React.lazy(() => import("./UserList")),
    },
  ],
};

export default userRouteConfigs;
