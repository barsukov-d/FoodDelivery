import { joinURL } from 'ufo';
import { StatusCodes } from 'http-status-codes';
import { createApi } from 'src/modules/axios';
import { AxiosError } from 'axios';

import type { ICategory } from 'src/types/categories';

import * as errors from './errors';
export const categoriesServiceErrors = errors;

const api = createApi(joinURL(<string>process.env.API_URL, 'categories'));

export const categoriesService = {
	/**
	 *
	 * Получить список категорий
	 *
	 * @example categoriesService.fetchCategories();
	 *
	 */
	fetchCategories: async (): Promise<ICategory[]> => {
		try {
			const response = await api.get<ICategory[]>('', {
				validateStatus: (status: number) => status === StatusCodes.OK,
			});

			return response;
		} catch (error: unknown) {
			if (
				error instanceof AxiosError &&
				error?.response?.status === StatusCodes.NOT_FOUND
			) {
				throw new errors.ErrorNotFoundCategories();
			}

			throw error;
		}
	},

	/**
	 *
	 * Получить категорию по id
	 *
	 * @param {number} id  - Идентификатор категории
	 *
	 * @example categoriesService.getCategory(id);
	 *
	 */
	getCategory: async (id: number): Promise<ICategory> => {
		try {
			const response = await api.get<ICategory>(id.toString(), {
				validateStatus: (status: number) => status === StatusCodes.OK,
			});

			return response;
		} catch (error: unknown) {
			if (
				error instanceof AxiosError &&
				error?.response?.status === StatusCodes.NOT_FOUND
			) {
				throw new errors.ErrorNotFoundCategory();
			}

			throw error;
		}
	},
};
