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
	 * Handle `GET /sliders`
	 * Return all sliders
	 *
	 * @example getSliders;
	 *
	 */
	getSliders: async (req, res, ctx) => {
		return res(
			ctx.delay(delay),
			ctx.status(StatusCodes.OK),
			ctx.json(await db.getAll(storeName, tables.SLIDERS))
		);
	},
});
