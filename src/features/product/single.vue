<script setup lang="ts">
import ProductCardSingle from 'src/entities/product/card-single.vue';
import { useProducts } from 'src/hooks/useProducts';
import PageHeader from 'src/shared/page/header.vue';

import { useCartStore } from 'src/stores/cart';

const cartStore = useCartStore();
const route = useRoute();
const { products, fetchProducts, fetchProductsLoadingSymbol } = useProducts();

const $w = useWait();

fetchProducts({ id: [Number(route.params.id)] });
</script>

<template lang="pug">
template(v-if='$w.is(fetchProductsLoadingSymbol)')
	q-skeleton.h-400px

template(v-else)
	//- PageHeader(:header='products[0].name')
	ProductCardSingle.pt-8(
		:product='products[0]',
		:set-count='cartStore.getProductCount(products[0].id)',
		@addProduct='cartStore.addProduct($event)',
		@decProduct='cartStore.decProduct($event)'
	)
</template>
