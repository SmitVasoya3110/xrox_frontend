import { authRoles } from 'app/auth';
import React from 'react';

const ResetPasswordPageConfig = {
	settings: {
		layout: {
			config: {navbar: {
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
			}}
		}
	},
	auth:authRoles.onlyGuest,
	routes: [
		{
			path: '/Reset/:reset_token',
			component: React.lazy(() => import('./ResetPasswordPage'))
		},
		{
			path: '/forgot_password',
			exact: true,
			component: React.lazy(() => import('./ForgotPassword'))
		}
	]
};

export default ResetPasswordPageConfig;