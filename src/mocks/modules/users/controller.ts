import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ResponseResolver, RestRequest, RestContext } from 'msw';
import { SortMockHelper, FilterMockHelper } from 'src/mocks/utils/helpers';
import { tables } from './ids';
import bcrypt from 'bcryptjs';

import type { ImockDB } from 'src/mocks/libs/mock-db';
import type { IProduct } from 'src/types/products';

export default (
	db: ImockDB,
	storeName: string,
	delay = 0
): Record<string, ResponseResolver<RestRequest, RestContext>> => ({
	/**
	 *
	 * Handle `GET /products`
	 * Return all products
	 *
	 * @example fetchProducts;
	 *
	 */
	// fetchProducts: async (req, res, ctx) => {
	// 	const sortBy =
	// 		<keyof IProduct>req.url.searchParams.get('sortBy') || 'id';

	// 	const sortDir =
	// 		<'asc' | 'desc'>req.url.searchParams.get('sortDir') || 'asc';

	// 	const category_id = <IProduct['category_id'] | undefined>(
	// 		(req.url.searchParams.get('category_id')
	// 			? Number(req.url.searchParams.get('category_id'))
	// 			: undefined)
	// 	);

	// 	const baiges = <IProduct['baiges']>(
	// 		(req.url.searchParams.getAll('baiges[]') || [])
	// 	);

	// 	const _productsIds = req.url.searchParams.getAll('id[]');

	// 	// array string to array number

	// 	const productsIds = <number[]>[];

	// 	_productsIds.map((id) => productsIds.push(Number(id)));

	// 	const products = SortMockHelper(
	// 		FilterMockHelper(await db.getAll(storeName, tables.PRODUCTS), {
	// 			category_id,
	// 			baiges,
	// 			id: productsIds,
	// 		}),
	// 		[sortBy],
	// 		[sortDir]
	// 	);

	// 	if (!products || !products.length) {
	// 		return res(
	// 			ctx.delay(delay),
	// 			ctx.status(StatusCodes.NOT_FOUND),
	// 			ctx.text(ReasonPhrases.NOT_FOUND)
	// 		);
	// 	}

	// 	return res(
	// 		ctx.delay(delay),
	// 		ctx.status(StatusCodes.OK),
	// 		ctx.json(products)
	// 	);
	// },

	/**
	 *
	 * Handle `GET /product/:id`
	 * Return product by id
	 *
	 * @example fetchProducts;
	 *
	 */

	getUser: async (req, res, ctx) => {
		const user = await db.getAll(storeName, tables.USERS);

		if (!user) {
			return res(
				ctx.delay(delay),
				ctx.status(StatusCodes.NOT_FOUND),
				ctx.text(ReasonPhrases.NOT_FOUND)
			);
		}

		return res(
			ctx.delay(delay),
			ctx.status(StatusCodes.OK),
			ctx.json(user)
		);
	},

	registrationUser: async (req, res, ctx) => {
		const user = await db.getAll(storeName, tables.USERS);

		const { firstName, secondName, phoneNumber, password } = req.body;

		const oldUser = user.find((i) => i.phoneNumber === phoneNumber);

		if (oldUser) {
			const response = {
				status: 10,
				message: 'This phone number is already registered',
			};

			return res(
				ctx.delay(delay),
				ctx.status(StatusCodes.OK),
				ctx.json(response)
			);
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const userNew = {
			id: user.length + 1,
			firstName,
			secondName,
			phoneNumber,
			password: encryptedPassword,
			token: '',
		};

		const token = Math.random().toString(36).substr(2);

		await db.put(storeName, tables.USERS, userNew);

		const response = {
			status: 0,
			message: 'Registration successful',
			jwt: token,
			userNew: {
				id: userNew.id,
				firstName: userNew.firstName,
				secondName: userNew.secondName,
				phoneNumber: userNew.phoneNumber,
			},
		};

		return res(
			ctx.delay(delay),
			ctx.status(StatusCodes.OK),
			ctx.json(response)
		);
	},

	loginUser: async (req, res, ctx) => {
		const users = await db.getAll(storeName, tables.USERS);

		const { phoneNumber, password } = req.body;

		const user = users.find((i) => i.phoneNumber === phoneNumber);

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = Math.random().toString(36).substr(2);

			const response = {
				status: 0,
				message: 'Login successful',
				jwt: token,
				user: {
					id: user.id,
					firstName: user.firstName,
					secondName: user.secondName,
					phoneNumber: user.phoneNumber,
					scale: user.scale,
					orders: user.orders,
					deliveryAddress: user.deliveryAddress,
				},
			};

			return res(
				ctx.delay(delay),
				ctx.status(StatusCodes.OK),
				ctx.json(response)
			);
		} else {
			const response = {
				status: 10,
				message: 'Incorrect phone number or password',
			};

			return res(
				ctx.delay(delay),
				ctx.status(StatusCodes.OK),
				ctx.json(response)
			);
		}
	},

	logoutUser: async (req, res, ctx) => {
		const response = {
			status: 0,
			message: 'Logout successful',
		};

		return res(
			ctx.delay(delay),
			ctx.status(StatusCodes.OK),
			ctx.json(response)
		);
	},

	userOrder: async (req, res, ctx) => {
		const users = await db.getAll(storeName, tables.USERS);

		const order = req.body;

		console.log(order, 'order');

		const id = Number(order.userId);

		const user = users.find((i) => i.id === id);

		if (user) {
			user.orders.push(order);

			await db.put(storeName, tables.USERS, user);

			const response = {
				status: 0,
				message: 'Order successful',
				orderStatus: 'pending',
			};

			return res(
				ctx.delay(delay),
				ctx.status(StatusCodes.OK),
				ctx.json(response)
			);
		}

		// const oldUser = users.find((i) => i.phoneNumber === order.phoneNumber);
	},
});
