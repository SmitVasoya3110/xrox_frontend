import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			// {
			// 	id: 'example-component',
			// 	title: 'Example',
			// 	translate: 'EXAMPLE',
			// 	type: 'item',
			// 	icon: 'whatshot',
			// 	url: '/example'
			// },
			// /apps/DeliveredOrder_List
			
			{
				id: 'customer-master',
				title: 'CUSTOMER MASTER',
				translate: 'CUSTOMER MASTER',
				icon: 'group_add',
				type: "collapse",
				// url: '/apps/uploadDocument',
				// auth: ['Admin'],
				children: [
					// {
					// 	id: "Customer-list",
					// 	title: "Customer List",
					// 	type: "item",
					// 	url: "/apps/employeeList",
					// 	exact: true,
					// 	// auth: ['Admin'],
					// },
					// {
					// 	id: "document-upload",
					// 	title: "Upload NEW Documents",
					// 	type: "item",
					// 	url: "/apps/UploadNewDocument",
					// 	exact: true,
					// 	// auth: ['Admin'],
					// },
					// {
					// 	id: "document-add",
					// 	title: "Payment Page",
					// 	type: "item",
					// 	url: "/apps/custometPayment",
					// 	exact: true,
					// 	// auth: ['Admin'],
					// },
					{
						id: "document-add-Drop",
						title: "Drop And Upload",
						type: "item",
						url: "/apps/dropAndUpload/new",
						exact: true,
						// auth: ['Admin'],
					},
					// {
					// 	id: "document-add-Cart",
					// 	title: "Cart",
					// 	type: "item",
					// 	url: "/apps/cartList",
					// 	exact: true,
					// 	// auth: ['Admin'],
					// },
					{
						id: "document-add-Cart1",
						title: "Cart List",
						type: "item",
						url: "/apps/cartList",
						exact: true,
						// auth: ['Admin'],
					},
				]
			},

		]
	}
];

export default navigationConfig;
