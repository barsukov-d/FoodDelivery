import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ResponseResolver, RestRequest, RestContext } from 'msw';
import { SortMockHelper, FilterMockHelper } from 'src/mocks/utils/helpers';
import { tables } from './ids';

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
	fetchProducts: async (req, res, ctx) => {
		const sortBy =
			<keyof IProduct>req.url.searchParams.get('sortBy') || 'id';

		const sortDir =
			<'asc' | 'desc'>req.url.searchParams.get('sortDir') || 'asc';

		const category_id = <IProduct['category_id'] | undefined>(
			(req.url.searchParams.get('category_id')
				? Number(req.url.searchParams.get('category_id'))
				: undefined)
		);

		const baiges = <IProduct['baiges']>(
			(req.url.searchParams.getAll('baiges[]') || [])
		);

		const _productsIds = req.url.searchParams.getAll('id[]');

		// array string to array number

		const productsIds = <number[]>[];

		_productsIds.map((id) => productsIds.push(Number(id)));

		const products = SortMockHelper(
			FilterMockHelper(await db.getAll(storeName, tables.PRODUCTS), {
				category_id,
				baiges,
				id: productsIds,
			}),
			[sortBy],
			[sortDir]
		);

		if (!products || !products.length) {
			return res(
				ctx.delay(delay),
				ctx.status(StatusCodes.NOT_FOUND),
				ctx.text(ReasonPhrases.NOT_FOUND)
			);
		}

		return res(
			ctx.delay(delay),
			ctx.status(StatusCodes.OK),
			ctx.json(products)
		);
	},

	/**
	 *
	 * Handle `GET /product/:id`
	 * Return product by id
	 *
	 * @example fetchProducts;
	 *
	 */

	getProduct: async (req, res, ctx) => {
		const id = Number(req.params.id);

		const product = await db.get(storeName, tables.PRODUCTS, id);

		if (!product) {
			return res(
				ctx.delay(delay),
				ctx.status(StatusCodes.NOT_FOUND),
				ctx.text(ReasonPhrases.NOT_FOUND)
			);
		}

		return res(
			ctx.delay(delay),
			ctx.status(StatusCodes.OK),
			ctx.json(product)
		);
	},
});
