import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('src/layouts/default.vue'),
		children: [
			{
				path: '/',
				name: 'home',
				component: () => import('pages/index.vue'),
				meta: { alias: 'home' },
			},
			{
				path: '/category/:id',
				name: 'category',
				component: () => import('pages/category.vue'),
				meta: { alias: 'category' },
			},
			{
				path: '/product/:id',
				name: 'product',
				component: () => import('pages/product.vue'),
				meta: { alias: 'product' },
			},
			{
				path: '/cart',
				name: 'cart',
				component: () => import('pages/cart.vue'),
				meta: { alias: 'cart' },
			},
			{
				path: '/account',
				name: 'account',
				component: () => import('src/pages/account/index.vue'),
				meta: { alias: 'account' },
				children: [
					{
						path: '/account/registration',
						name: 'registration',
						component: () =>
							import('src/pages/account/registration.vue'),
						meta: { auth: false, alias: 'account' },
					},
					{
						path: '/account/login',
						name: 'login',
						component: () => import('pages/account/login.vue'),
						meta: { auth: false, alias: 'account' },
					},
					{
						path: '/account/sms-code',
						name: 'sms-code',
						component: () => import('pages/account/sms-code.vue'),
						meta: { auth: false, alias: 'account' },
					},
					{
						path: '/account/reset-password',
						name: 'reset-password',
						component: () =>
							import('pages/account/reset-password.vue'),
						meta: { auth: false, alias: 'account' },
					},
					{
						path: '/account/profile',
						name: 'profile',
						component: () => import('pages/account/profile.vue'),
						meta: { auth: true, alias: 'account' },
					},
				],
			},
			{
				path: '/:pathMatch(.*)*',
				name: 'NotFound',
				component: () => import('pages/not-found.vue'),
			},
		],
	},
];

export default routes;
