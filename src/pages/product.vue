<script setup lang="ts">
import ProductSingle from 'src/features/product/single.vue';
import AddToCart from 'src/features/cart/add-to-cart.vue';

const route = useRoute();
</script>

<template lang="pug">
q-page
	ProductSingle
	AddToCart.fixed.bottom-20(
		:id='Number(route.params.id)',
		class='w-4/5 -translate-x-1/2 left-1/2'
	)
</template>
