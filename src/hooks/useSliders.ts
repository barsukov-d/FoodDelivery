import { slidersService, slidersServiceErrors } from 'src/services/sliders';
import type { ISlider } from 'src/types/sliders';

export const useSliders = () => {
	const $w = useWait();

	const query = ref<string>('');
	const slidersError = ref<string>();
	const _sliders = ref<ISlider[]>([]);
	const sliders = computed(() =>
		_sliders.value.filter(
			({ title }) => query.value === '' || query.value === title
		)
	);

	/**
	 *
	 * Fetch sliders
	 *
	 */
	const fetchSliders = async (): Promise<void> => {
		$w.start('fetchSliders');
		try {
			_sliders.value = await slidersService.getSliders();
		} catch (error) {
			if (error instanceof slidersServiceErrors.ErrorNotFoundSliders) {
				slidersError.value = 'Я вернул 404';
			} else if (
				error instanceof slidersServiceErrors.ErrorBadRequestSliders
			) {
				slidersError.value = 'Я вернул 400';
			} else {
				throw error;
			}
		} finally {
			$w.end('fetchSliders');
		}
	};

	return {
		sliders,
		slidersError,
		fetchSliders,
	};
};
