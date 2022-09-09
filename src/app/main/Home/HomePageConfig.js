import React from 'react';
import { authRoles } from 'app/auth/index';

const Register3PageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	routes: [
		{
			auth: authRoles.onlyGuest,
			path: '/',
			component: React.lazy(() => import('./Home'))
		}
	]
};

export default Register3PageConfig;
