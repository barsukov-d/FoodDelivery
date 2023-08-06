import { rest, RestHandler } from 'msw';

// TODO: Поправить пути
import initModel from '../../utils/init-model';
import initCtrl from './controller';
import { tables } from './ids';

import type { ImockDB } from '../../libs/mock-db';

export default async (
	mockDB: ImockDB,
	apiURL: string,
	serviceName: string,
	delay = 0
): Promise<RestHandler[]> => {
	const API_URL = `${apiURL}/${serviceName}`;

	await initModel(mockDB, serviceName, tables);
	console.log('mockDB', mockDB);

	const { fetchProducts, getProduct } = initCtrl(mockDB, serviceName, delay);

	return [
		rest.get(`${API_URL}`, fetchProducts),
		rest.get(`${API_URL}/:id`, getProduct),
		rest.get(`${API_URL}_eng`, fetchProducts),
		rest.get(`${API_URL}_eng/:id`, getProduct),
		// rest.post(API_URL),
		// rest.put(API_URL),
		// rest.delete(API_URL)
	];
};
