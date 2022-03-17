import React from "react";
// import { authRoles } from 'app/auth';

const CartAppConfigs = {
    settings: {
        layout: {},
    },
    // auth: ["Admin"],
    routes: [
        {
            path: "/apps/cartList",
            component: React.lazy(() => import("./cart_List/cartList")),
        },
        // {
        //     path: "/apps/shiftAdd/:type_id",
        //     component: React.lazy(() => import("./shift_Add/addShift")),
        // },
    ],
};

export default CartAppConfigs;