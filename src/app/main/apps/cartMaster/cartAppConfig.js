import React from "react";
// import { authRoles } from 'app/auth';

const CartAppConfigs = {
    settings: {
        layout: {},
    },
    // auth: ["Admin"],
    routes: [
        {
            path: "/apps/cartList1",
            component: React.lazy(() => import("./cart_List1/cartList")),
        },
    ],
};

export default CartAppConfigs;