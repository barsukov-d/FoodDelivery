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
	 * Handle `GET /banners`
	 * Return all banners
	 *
	 * @example fetchBanners;
	 *
	 */
	fetchBanners: async (req, res, ctx) => {
		const response = await db.getAll(storeName, tables.BANNERS);

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
	 * Handle `GET /banner/{id}`
	 * Return banner by id
	 *
	 * @example getBanner;
	 *
	 */

	getBanner: async (req, res, ctx) => {
		const id = Number(req.params.id);
		const banner = await db.get(storeName, tables.BANNERS, id);

		if (!banner) {
			return res(
				ctx.delay(delay),
				ctx.status(StatusCodes.NOT_FOUND),
				ctx.text(ReasonPhrases.NOT_FOUND)
			);
		}

		return res(
			ctx.delay(delay),
			ctx.status(StatusCodes.OK),
			ctx.json(banner)
		);
	},
});
