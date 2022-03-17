import React from "react";
// import { authRoles } from 'app/auth';

const customerAppConfigs = {
    settings: {
        layout: {},
    },
    // auth: ['Admin'],
    routes: [
       
        {
            path: "/apps/custometPayment",
            component: React.lazy(() => import("./customerPayment")),
        },
        {
            path: "/apps/dropAndUpload/:type_id",
            component: React.lazy(() => import("./dropAndUploadDoc")),
        },
        {
            path: "/apps/OderPage",
            component: React.lazy(() => import("./OrderPage")),
        },
    ],
};

export default customerAppConfigs;