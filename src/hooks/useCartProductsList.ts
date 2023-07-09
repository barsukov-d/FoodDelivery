import { useProducts } from './useProducts';
import { useCartStore } from 'src/stores/cart';

import type { IProductCartList } from 'src/types/products';

export const useCartProductsList = () => {
	const { products, fetchProducts } = useProducts();
	const productsCartStore = useCartStore();

	const productCartIndex = computed(() => {
		return productsCartStore.productsCart.reduce((acc, product, index) => {
			acc[index] = product.id;
			return acc;
		}, [] as number[]);
	});

	const productsList = computed(() => {
		return products.value.reduce((acc, product) => {
			const productCart = productsCartStore.productsCart.find(
				(i) => i.id === product.id
			);
			if (productCart) {
				acc.push({
					...product,
					count: productCart.count,
				});
			}
			return acc;
		}, [] as IProductCartList[]);
	});

	const totalPrice = computed(() => {
		return productsList.value.reduce((acc, product) => {
			return product.count ? acc + product.price * product.count : acc;
		}, 0 as number);
	});

	const totalProducts = computed(() => {
		return productsList.value.reduce((acc, product) => {
			return product.count ? acc + product.count : acc;
		}, 0 as number);
	});

	const fetchProductsList = async () =>
		await fetchProducts({ id: productCartIndex.value });

	return {
		productsList,
		totalPrice,
		totalProducts,
		fetchProductsList,
	};
};
