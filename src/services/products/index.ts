import { joinURL } from 'ufo';
import { StatusCodes } from 'http-status-codes';
import { createApi } from 'src/modules/axios';
import { AxiosError } from 'axios';

import type { IProduct, IProductCartID } from 'src/types/products';

import * as errors from './errors';
export const productsServiceErrors = errors;

const api = createApi(joinURL(<string>process.env.API_URL, 'products'));

export const productsService = {
	/**
	 *
	 * Получить список товаров
	 *
	 * @param {number} category_id  - Идентификатор категории
	 * @param {Pick<IProduct, 'baiges'>} baiges - Фильтрация по бейджу
	 *
	 * @example productsService.fetchProducts(params);
	 *
	 */
	fetchProducts: async (
		params?:
			| IProductCartID
			| (Partial<Pick<IProduct, 'category_id' | 'baiges'>> & {
					sortBy?: keyof IProduct;
					sortDir?: 'asc' | 'desc';
			  })
	): Promise<IProduct[]> => {
		try {
			const response = await api.get<IProduct[]>('', {
				params,
				validateStatus: (status: number) => status === StatusCodes.OK,
			});

			return response;
		} catch (error: unknown) {
			if (
				error instanceof AxiosError &&
				error?.response?.status === StatusCodes.BAD_REQUEST
			) {
				throw new errors.ErrorBadRequestProducts();
			}

			if (
				error instanceof AxiosError &&
				error?.response?.status === StatusCodes.NOT_FOUND
			) {
				throw new errors.ErrorNotFoundProducts();
			}

			throw error;
		}
	},

	getProduct: async (id: number): Promise<IProduct> => {
		try {
			const response = await api.get<IProduct>(joinURL(id.toString()), {
				validateStatus: (status: number) => status === StatusCodes.OK,
			});

			return response;
		} catch (error: unknown) {
			if (
				error instanceof AxiosError &&
				error?.response?.status === StatusCodes.BAD_REQUEST
			) {
				throw new errors.ErrorBadRequestProducts();
			}

			if (
				error instanceof AxiosError &&
				error?.response?.status === StatusCodes.NOT_FOUND
			) {
				throw new errors.ErrorNotFoundProducts();
			}

			throw error;
		}
	},

	// getProducts: async (): Promise<IProduct[]> => {
	// 	try {
	// 		const response = await api.get<IProduct[]>('', {
	// 			validateStatus: (status: number) => status === StatusCodes.OK,
	// 		});

	// 		return response;
	// 	} catch (error: unknown) {
	// 		if (
	// 			error instanceof AxiosError &&
	// 			error?.response?.status === StatusCodes.BAD_REQUEST
	// 		) {
	// 			throw new errors.ErrorBadRequestProducts();
	// 		}

	// 		if (
	// 			error instanceof AxiosError &&
	// 			error?.response?.status === StatusCodes.NOT_FOUND
	// 		) {
	// 			throw new errors.ErrorNotFoundProducts();
	// 		}

	// 		throw error;
	// 	}
	// },

	// getProduct: async (id: number): Promise<IProduct> => {
	// 	try {
	// 		const response = await api.get<IProduct>(joinURL(id.toString()), {
	// 			validateStatus: (status: number) => status === StatusCodes.OK,
	// 		});

	// 		return response;
	// 	} catch (error: unknown) {
	// 		if (
	// 			error instanceof AxiosError &&
	// 			error?.response?.status === StatusCodes.BAD_REQUEST
	// 		) {
	// 			throw new errors.ErrorBadRequestProducts();
	// 		}

	// 		if (
	// 			error instanceof AxiosError &&
	// 			error?.response?.status === StatusCodes.NOT_FOUND
	// 		) {
	// 			throw new errors.ErrorNotFoundProducts();
	// 		}

	// 		throw error;
	// 	}
	// },

	// fetchProducts: async (params: any): Promise<IProduct[]> => {
	// 	try {
	// 		const response = await api.get<IProduct[]>(joinURL(params.id), {
	// 			validateStatus: (status: number) => status === StatusCodes.OK,
	// 		});

	// 		return response;
	// 	} catch (error: unknown) {
	// 		if (
	// 			error instanceof AxiosError &&
	// 			error?.response?.status === StatusCodes.BAD_REQUEST
	// 		) {
	// 			throw new errors.ErrorBadRequestProducts();
	// 		}

	// 		if (
	// 			error instanceof AxiosError &&
	// 			error?.response?.status === StatusCodes.NOT_FOUND
	// 		) {
	// 			throw new errors.ErrorNotFoundProducts();
	// 		}

	// 		throw error;
	// 	}
	// },
};
