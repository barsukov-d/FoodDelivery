import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ResponseResolver, RestRequest, RestContext } from 'msw';
import { tables } from './ids';

import type { ImockDB } from 'src/mocks/libs/mock-db';

export default (
	db: ImockDB,
	storeName: string,
	delay = 0
): Record<string, ResponseResolver<RestRequest, RestContext>> => ({
	/**
	 *
	 * Handle `GET /categories`
	 * Return all categories
	 *
	 * @example fetchCategories;
	 *
	 */
	fetchCategories: async (_req, res, ctx) => {
		const response = await db.getAll(storeName, tables.CATEGORIES);

		if (!response) {
			return res(
				ctx.delay(delay),
				ctx.status(StatusCodes.NOT_FOUND),
				ctx.text(ReasonPhrases.NOT_FOUND)
			);
		}

		return res(
			ctx.delay(delay),
			ctx.status(StatusCodes.OK),
			ctx.json(response)
		);
	},

	/**
	 *
	 * Handle `GET /categories/{id}`
	 * Return category by id
	 *
	 * @example getCategory;
	 *
	 */
	getCategory: async (req, res, ctx) => {
		const id = Number(req.params.id);
		const category = await db.get(storeName, tables.CATEGORIES, id);

		if (!category) {
			return res(
				ctx.delay(delay),
				ctx.status(StatusCodes.NOT_FOUND),
				ctx.text(ReasonPhrases.NOT_FOUND)
			);
		}

		return res(
			ctx.delay(delay),
			ctx.status(StatusCodes.OK),
			ctx.json(category)
		);
	},
});
