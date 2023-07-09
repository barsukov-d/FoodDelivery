import { categoriesService } from 'src/services/categories';
import type { ICategory } from 'src/types/categories';

export const useCategories = () => {
	const $w = useWait();

	/**
	 *
	 * Fetch categories
	 *
	 */
	const categories = ref<ICategory[]>([]);
	const fetchCategoriesLoadingSymbol = Symbol('fetchCategories');
	const fetchCategories = async (): Promise<void> => {
		try {
			$w.start(fetchCategoriesLoadingSymbol);
			categories.value = await categoriesService.fetchCategories();
		} catch (error) {
			throw error;
		} finally {
			$w.end(fetchCategoriesLoadingSymbol);
		}
	};

	/**
	 *
	 * Get category
	 *
	 */
	const category = ref<ICategory>();
	const getCategoryLoadingSymbol = Symbol('getCategory');
	const getCategory = async (id: number): Promise<void> => {
		try {
			$w.start(getCategoryLoadingSymbol);
			category.value = await categoriesService.getCategory(id);
		} catch (error) {
			throw error;
		} finally {
			$w.end(getCategoryLoadingSymbol);
		}
	};

	return {
		categories,
		fetchCategories,
		fetchCategoriesLoadingSymbol,

		category,
		getCategory,
		getCategoryLoadingSymbol,
	};
};
