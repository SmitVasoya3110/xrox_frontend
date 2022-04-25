import React from 'react';
import { authRoles } from 'app/auth/index';


const Error404PageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			// auth: ["Admin", "Customer", [], ""],
			path: '/errors/error-404',
			component: React.lazy(() => import('./Error404Page'))
		}
	]
};

export default Error404PageConfig;
