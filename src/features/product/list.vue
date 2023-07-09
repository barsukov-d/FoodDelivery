<script setup lang="ts">
import ProductCardForMain from 'src/entities/product/card-for-main.vue';
import { useCartStore } from 'src/stores/cart';
import { useProducts } from 'src/hooks/useProducts';

const $w = useWait();

const route = useRoute();
const cartStore = useCartStore();

const { products, fetchProducts, fetchProductsLoadingSymbol } = useProducts();
fetchProducts({ category_id: Number(route.params.id) });

watch(
	() => route.params.id,
	() =>
		route.name === 'category'
			? fetchProducts({ category_id: Number(route.params.id) })
			: null
);
</script>
<template lang="pug">
template(v-if='$w.is(fetchProductsLoadingSymbol)')
	q-skeleton.my-4.h-72(v-for='(product, index) in 5', :key='index')

template(v-else)
	ProductCardForMain.mx-auto.my-2.block(
		v-for='product in products',
		:key='product.id',
		:product='product',
		:set-count='cartStore.getProductCount(product.id)',
		@count='cartStore.setProductCount(product.id, $event)',
		@addProduct='cartStore.addProduct($event)'
	)
</template>
