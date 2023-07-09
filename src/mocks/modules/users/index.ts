import { rest, RestHandler } from 'msw';

// TODO: Поправить пути
import initModel from 'src/mocks/utils/init-model';
import initCtrl from './controller';
import { tables } from './ids';

import type { ImockDB } from 'src/mocks/libs/mock-db';

export default async (
	mockDB: ImockDB,
	apiURL: string,
	serviceName: string,
	delay = 0
): Promise<RestHandler[]> => {
	const API_URL = `${apiURL}/${serviceName}`;

	await initModel(mockDB, serviceName, tables);

	const { getUser, registrationUser, loginUser, logoutUser, userOrder } =
		initCtrl(mockDB, serviceName, delay);

	return [
		rest.get(`${API_URL}`, getUser),
		rest.post(`${API_URL}/registrationUser`, registrationUser),
		rest.post(`${API_URL}/loginUser`, loginUser),
		rest.post(`${API_URL}/logoutUser`, logoutUser),
		rest.post(`${API_URL}/userOrder`, userOrder),
		// rest.get(`${API_URL}`, fetchUser),
		// rest.post(API_URL),
		// rest.put(API_URL),
		// rest.delete(API_URL)
	];
};
