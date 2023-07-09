import FIXTURE_PRODUCTS from 'src/mocks/modules/products/fixtures/products.json';

import { SortMockHelper, FilterMockHelper } from 'src/mocks/utils/helpers';

import { productsService, productsServiceErrors } from '.';

describe('products API', function () {
	it('fetch products', async () => {
		await expect(productsService.fetchProducts()).resolves.toEqual(
			FIXTURE_PRODUCTS
		);
	});

	it('fetch products by not found category', async () => {
		await expect(
			productsService.fetchProducts({ category_id: 0 })
		).rejects.toThrow(productsServiceErrors.ErrorNotFoundProducts);
	});

	it('fetch products by category 1', async () => {
		await expect(
			productsService.fetchProducts({ category_id: 1 })
		).resolves.toEqual(
			FilterMockHelper(FIXTURE_PRODUCTS, { category_id: 1 })
		);
	});

	it('fetch products by not found baiges', async () => {
		await expect(
			productsService.fetchProducts({ baiges: ['sale'] })
		).rejects.toThrow(productsServiceErrors.ErrorNotFoundProducts);
	});

	it('fetch products by hot baige', async () => {
		await expect(
			productsService.fetchProducts({ baiges: ['hot'] })
		).resolves.toEqual(
			FilterMockHelper(FIXTURE_PRODUCTS, { baiges: ['hot'] })
		);
	});

	it('fetch products and sort by name desc', async () => {
		await expect(
			productsService.fetchProducts({ sortBy: 'name', sortDir: 'desc' })
		).resolves.toEqual(
			SortMockHelper(FIXTURE_PRODUCTS, ['name'], ['desc'])
		);
	});

	it('fetch products and sort by name asc', async () => {
		await expect(
			productsService.fetchProducts({ sortBy: 'name', sortDir: 'asc' })
		).resolves.toEqual(SortMockHelper(FIXTURE_PRODUCTS, ['name'], ['asc']));
	});

	it('fetch products by arr id', async () => {
		await expect(
			productsService.fetchProducts({ id: [1, 2] })
		).resolves.toEqual(FilterMockHelper(FIXTURE_PRODUCTS, { id: [1, 2] }));
	});

	it('get product by id', async () => {
		await expect(productsService.getProduct(1)).resolves.toEqual(
			FIXTURE_PRODUCTS[0]
		);
	});

	it('get product by not found id', async () => {
		await expect(productsService.getProduct(99999)).rejects.toThrow(
			productsServiceErrors.ErrorNotFoundProducts
		);
	});
});
