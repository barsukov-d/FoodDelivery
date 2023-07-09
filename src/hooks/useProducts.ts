import { productsService } from 'src/services/products';
import type { IProduct, IProductCartID } from 'src/types/products';

export const useProducts = () => {
	const $w = useWait();
	/**
	 *
	 * Fetch products
	 *
	 */
	const products = ref<IProduct[]>([]);
	const fetchProductsLoadingSymbol = Symbol('fetchProducts');
	const fetchProducts = async (
		params: Partial<Pick<IProduct, 'category_id' | 'baiges'>> & {
			sortBy?: keyof IProduct;
			sortDir?: 'asc' | 'desc';
			id?: number[];
		}
	) => {
		try {
			$w.start(fetchProductsLoadingSymbol);
			products.value =
				params.id && !params.id.length
					? []
					: await productsService.fetchProducts(params);
		} catch (error) {
			throw error;
		} finally {
			$w.end(fetchProductsLoadingSymbol);
		}
	};

	/**
	 *
	 * get product
	 *
	 */

	const product = ref<IProduct>();
	const getProductLoadingSymbol = Symbol('getProduct');
	const getProduct = async (id: number) => {
		try {
			$w.start(getProductLoadingSymbol);
			product.value = await productsService.getProduct(id);
		} catch (error) {
			throw error;
		} finally {
			$w.end(getProductLoadingSymbol);
		}
	};

	return {
		product,
		products,
		fetchProducts,
		getProduct,
		getProductLoadingSymbol,
		fetchProductsLoadingSymbol,
	};
};
