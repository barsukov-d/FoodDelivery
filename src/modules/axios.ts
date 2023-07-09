import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from 'axios';

import { Notify } from 'quasar';
import { StatusCodes } from 'http-status-codes';

const createApi = (baseURL = process.env.API_URL) => {
	const api: AxiosInstance = axios.create({
		baseURL,
	});

	api.interceptors.request.use(async (req: AxiosRequestConfig) => {
		// Authorization should be processed here
		return req;
	});

	api.interceptors.response.use(
		(res: AxiosResponse) => {
			return res.data;
		},
		(err: AxiosError) => {
			const code = err.response?.status;

			if (code && code >= StatusCodes.INTERNAL_SERVER_ERROR) {
				Notify.create({
					type: 'warning',
					position: 'top',
					message:
						<string>err.response?.data || 'Что то пошло не так',
				});
			}

			return Promise.reject(err);
		}
	);

	return api;
};

const api = createApi();

export { api, createApi, axios };
