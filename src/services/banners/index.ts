import { joinURL } from 'ufo';
import { StatusCodes } from 'http-status-codes';
import { createApi } from 'src/modules/axios';
import { AxiosError } from 'axios';

import type { IBanner } from 'src/types/banners';

import * as errors from './errors';
export const bannersServiceErrors = errors;

const api = createApi(joinURL(<string>process.env.API_URL, 'banners'));

export const bannersService = {
	/**
	 *
	 * Получить список баннеров
	 *
	 * @example bannersService.fetchBanners();
	 *
	 */
	fetchBanners: async (): Promise<IBanner[]> => {
		try {
			const response = await api.get<IBanner[]>('', {
				validateStatus: (status: number) => status === StatusCodes.OK,
			});

			return response;
		} catch (error: unknown) {
			if (
				error instanceof AxiosError &&
				error?.response?.status === StatusCodes.NOT_FOUND
			) {
				throw new errors.ErrorNotFoundBanners();
			}

			throw error;
		}
	},
	/**
	 *
	 * Получить баннер по id
	 *
	 * @example bannersService.getBanner(id);
	 * @param id - id баннера
	 *
	 */
	getBanner: async (id: number): Promise<IBanner> => {
		try {
			const response = await api.get<IBanner>(joinURL(id.toString()), {
				validateStatus: (status: number) => status === StatusCodes.OK,
			});

			return response;
		} catch (error: unknown) {
			if (
				error instanceof AxiosError &&
				error?.response?.status === StatusCodes.BAD_REQUEST
			) {
				throw new errors.ErrorBadRequestBanners();
			}

			if (
				error instanceof AxiosError &&
				error?.response?.status === StatusCodes.NOT_FOUND
			) {
				throw new errors.ErrorNotFoundBanners();
			}

			throw error;
		}
	},

	// getBanners: async (): Promise<IBanner[]> => {
	// 	try {
	// 		const response = await api.get<IBanner[]>('', {
	// 			validateStatus: (status: number) => status === StatusCodes.OK,
	// 		});

	// 		return response;
	// 	} catch (error: unknown) {
	// 		if (
	// 			error instanceof AxiosError &&
	// 			error?.response?.status === StatusCodes.BAD_REQUEST
	// 		) {
	// 			throw new errors.ErrorBadRequestBanners();
	// 		}

	// 		if (
	// 			error instanceof AxiosError &&
	// 			error?.response?.status === StatusCodes.NOT_FOUND
	// 		) {
	// 			throw new errors.ErrorNotFoundBanners();
	// 		}

	// 		throw error;
	// 	}
	// },
};
