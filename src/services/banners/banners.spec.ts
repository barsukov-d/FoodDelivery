import FIXTURE_BANNERS from 'src/mocks/modules/banners/fixtures/banners.json';

import { bannersService, bannersServiceErrors } from '.';

it('fetch banners', async () => {
	await expect(bannersService.fetchBanners()).resolves.toEqual(
		FIXTURE_BANNERS
	);
});

it('get not found banner', async () => {
	await expect(bannersService.getBanner(0)).rejects.toThrow(
		bannersServiceErrors.ErrorNotFoundBanners
	);
});

it('get banner', async () => {
	await expect(bannersService.getBanner(1)).resolves.toEqual(
		FIXTURE_BANNERS[0]
	);
});
