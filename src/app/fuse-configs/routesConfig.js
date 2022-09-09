import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';

const routeConfigs = [
	...appsConfigs,
];
const routes = [


	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.

	// [{ id: "Admin", text: "Admin" }, { id: "view", text: "view" }, { id: "user1", text: "user1" }, { id: "user", text: "user" }, { id: "N/A", text: "N/A" }]
	// {
	// 	path: '/register1',
	// 	exact: true,
	// 	component: () => <Redirect to="/register1" />
	// },
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ["Customer"]),
	// {
	// 	path: '/',
	// 	exact: true,
	// 	auth: authRoles.onlyGuest,
	// 	// component: () => <Redirect to="/apps/dropAndUpload/new" />
	// 	component: React.lazy(() => import('app/main/apps/Dashboard'))
	// },
	{
		component: () => <Redirect to="/errors/error-404" />,
	},



];

export default routes;
