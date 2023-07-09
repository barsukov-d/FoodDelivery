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

	const { fetchCategories, getCategory } = initCtrl(
		mockDB,
		serviceName,
		delay
	);

	return [
		rest.get(API_URL, fetchCategories),
		rest.get(`${API_URL}/:id`, getCategory),
	];
};
