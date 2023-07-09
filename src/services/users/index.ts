import { joinURL } from 'ufo';
import { StatusCodes } from 'http-status-codes';
import { createApi } from 'src/modules/axios';
import { AxiosError } from 'axios';

import type { IUser, IFormOrder } from 'src/types/user';
import type { IFormRegUser, IResUser, IFormLoginUser } from 'src/types/user';

import * as errors from './errors';
export const slidersServiceErrors = errors;

const api = createApi(joinURL(<string>process.env.API_URL, 'users'));

export const usersService = {
	/**
	 *
	 * Get users
	 *
	 * @example slidersService.getUsers();
	 *
	 */
	getUsers: async (): Promise<IUser[]> => {
		try {
			const response = await api.get<IUser[]>('', {
				validateStatus: (status: number) => status === StatusCodes.OK,
			});

			return response;
		} catch (error: unknown) {
			throw error;
		}
	},

	/**
	 *
	 * Registration user
	 *
	 * @example slidersService.registrationUser();
	 *
	 */
	registrationUser: async (form: IFormRegUser): Promise<IResUser> => {
		const formData = new FormData();

		Object.entries(form).forEach(([key, value]) => {
			formData.append(`${key}`, value);
		});

		try {
			const response = await api.post('/registrationUser', formData, {
				validateStatus: (status: number) => status === StatusCodes.OK,
			});

			return response;
		} catch (error: unknown) {
			throw error;
		}
	},

	/**
	 *
	 * Login user
	 *
	 * @example slidersService.loginUser();
	 *
	 */

	loginUser: async (form: IFormLoginUser): Promise<any> => {
		const formData = new FormData();

		Object.entries(form).forEach(([key, value]) => {
			formData.append(`${key}`, value);
		});

		try {
			const response = await api.post('/loginUser', formData, {
				validateStatus: (status: number) => status === StatusCodes.OK,
			});

			return response;
		} catch (error: unknown) {
			throw error;
		}
	},

	/**
	 *
	 * Logout user
	 *
	 * @example slidersService.logoutUser();
	 *
	 */

	logoutUser: async (): Promise<any> => {
		try {
			const response = await api.post('/logoutUser', {
				validateStatus: (status: number) => status === StatusCodes.OK,
			});

			return response;
		} catch (error: unknown) {
			throw error;
		}
	},

	/**
	 *
	 * Logout user
	 *
	 * @example slidersService.userOrder();
	 *
	 */

	userOrder: async (form: IFormOrder, id: string): Promise<any> => {
		const formData = new FormData();

		Object.entries(form).forEach(([key, value]) => {
			formData.append(`${key}`, value);
		});

		if (id) {
			formData.append('userId', id);
		} else {
			formData.append('userId', 0);
		}

		try {
			const response = await api.post('/userOrder', formData, {
				validateStatus: (status: number) => status === StatusCodes.OK,
			});

			return response;
		} catch (error: unknown) {
			throw error;
		}
	},
};
