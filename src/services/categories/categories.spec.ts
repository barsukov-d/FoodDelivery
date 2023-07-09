import FIXTURE_CATEGORIES from 'src/mocks/modules/categories/fixtures/categories.json';

import { categoriesService, categoriesServiceErrors } from '.';

describe('categories API', function () {
	it('Fetch categories', async () => {
		await expect(categoriesService.fetchCategories()).resolves.toEqual(
			FIXTURE_CATEGORIES
		);
	});

	it('Get not found category', async () => {
		await expect(categoriesService.getCategory(0)).rejects.toThrow(
			categoriesServiceErrors.ErrorNotFoundCategory
		);
	});

	it('Get category', async () => {
		await expect(categoriesService.getCategory(1)).resolves.toEqual(
			FIXTURE_CATEGORIES[0]
		);
	});
});
