import FIXTURE_TEST_TABLE from '../modules/__test__/fixtures/test-table.json';
import { mockDB } from '../libs/mock-db';
import initModel from './init-model';

const TestMockDbInstance = new mockDB();

const TEST_SERVICE_NAME = '__test__';

enum tables {
	TEST_TABLE = 'test-table',
}

describe('service mock init-model', function () {
	it('init-model', async () => {
		/**
		 * initModel: creates new mock database with tables from `enum tables`
		 * and fills them with data from `~/services/mock/modules/__test__/fixtures/test-table.json`
		 */
		await initModel(TestMockDbInstance, TEST_SERVICE_NAME, tables);

		/**
		 * TODO: Await all Promises bug-fix!!!
		 * https://github.com/mswjs/msw/issues/1163#issuecomment-1066171714
		 */
		await new Promise((res) => setTimeout(res, 10));

		await expect(
			TestMockDbInstance.getAll(TEST_SERVICE_NAME, tables.TEST_TABLE)
		).resolves.toEqual(FIXTURE_TEST_TABLE);
	});
});
