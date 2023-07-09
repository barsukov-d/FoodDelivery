import { joinURL } from 'ufo';
import { StatusCodes } from 'http-status-codes';
import { createApi } from 'src/modules/axios';
import { AxiosError } from 'axios';

import type { ISlider } from 'src/types/sliders';

import * as errors from './errors';
export const slidersServiceErrors = errors;

const api = createApi(joinURL(<string>process.env.API_URL, 'sliders'));

export const slidersService = {
	/**
	 *
	 * Получить список товаров
	 *
	 * @example slidersService.getSliders();
	 *
	 */
	getSliders: async (): Promise<ISlider[]> => {
		try {
			const response = await api.get<ISlider[]>('', {
				validateStatus: (status: number) => status === StatusCodes.OK,
			});

			return response;
		} catch (error: unknown) {
			if (
				error instanceof AxiosError &&
				error?.response?.status === StatusCodes.BAD_REQUEST
			) {
				throw new errors.ErrorBadRequestSliders();
			}

			if (
				error instanceof AxiosError &&
				error?.response?.status === StatusCodes.NOT_FOUND
			) {
				throw new errors.ErrorNotFoundSliders();
			}

			throw error;
		}
	},
};
