import { bannersService, bannersServiceErrors } from 'src/services/banners';
import type { IBanner } from 'src/types/banners';

export const useBanners = () => {
	const $w = useWait();

	/**
	 *
	 * Fetch banners
	 *
	 */

	const banners = ref<IBanner[]>([]);
	const fetchBannersLoadingSymbol = Symbol('fetchCategories');
	const fetchBanners = async () => {
		try {
			$w.start(fetchBannersLoadingSymbol);
			banners.value = await bannersService.fetchBanners();
		} catch (error) {
			throw error;
		} finally {
			$w.end(fetchBannersLoadingSymbol);
		}
	};
	const banner = ref<IBanner>();
	const getBannerLoadingSymbol = Symbol('getBanner');
	const getBanner = async (id: number) => {
		try {
			$w.start(getBannerLoadingSymbol);
			banner.value = await bannersService.getBanner(id);
		} catch (error) {
			throw error;
		} finally {
			$w.end(getBannerLoadingSymbol);
		}
	};
	// const fetchBanners = async (): Promise<void> => {
	// 	$w.start('fetchBanners');
	// 	try {
	// 		_banners.value = await bannersService.getBanners();
	// 	} catch (error) {
	// 		if (error instanceof bannersServiceErrors.ErrorNotFoundBanners) {
	// 			bannersError.value = 'Я вернул 404';
	// 		} else if (
	// 			error instanceof bannersServiceErrors.ErrorBadRequestBanners
	// 		) {
	// 			bannersError.value = 'Я вернул 400';
	// 		} else {
	// 			throw error;
	// 		}
	// 	} finally {
	// 		$w.end('fetchBanners');
	// 	}
	// };

	return {
		banner,
		banners,
		getBannerLoadingSymbol,
		fetchBannersLoadingSymbol,
		getBanner,
		fetchBanners,
	};
};
