import { setupServer } from 'msw/node';
import { mockDB } from './libs/mock-db';
import { allowModules } from './config';

const mockDbInstance = new mockDB({ freezeState: true });

const enabledModules = allowModules || [];

const handlers = await Promise.all(
	enabledModules.map(async (moduleName) => {
		const handler = (await import(`./modules/${moduleName}/index.ts`))
			.default;
		return handler(mockDbInstance, process.env.API_URL, moduleName, 0);
	})
);

const mockServer = setupServer(...handlers.flat());

beforeAll(() => {
	mockServer.listen();
});

afterEach(() => {
	mockServer.resetHandlers();
});

afterAll(() => {
	mockServer.close();
});
