<script setup lang="ts">
import Counter from 'src/shared/counter.vue';
import { useCartStore } from 'stores/cart';
import type { IProduct } from 'src/types/products';

defineProps<{
	product: IProduct;
	setCount: number;
}>();

const emit = defineEmits<{
	(e: 'count', val: number): void;
	(e: 'addProduct', id: number): void;
}>();

const cartStore = useCartStore();
</script>

<template lang="pug">
q-card.p-0.mt-2.h-auto.grid.grid-rows-auto.overflow-hidden
	RouterLink(:to='{ name: "product", params: { id: product.id } }')
		q-card-section.p-0.flex.items-center.justify-center
			q-img.object-contain(:src='product.image', :ratio='1')
		q-card-section.p-2
			span.mt-3.h-10.block.font-bold.leading-4 {{ product.name }}
			span {{ product.weight }} г
	.my-3.m-auto.w-28.self-end.text-center(
		v-if='!cartStore.isProductInCart(product.id)'
	)
		q-btn.w-full(
			@click='emit("addProduct", product.id)',
			unelevated,
			rounded,
			color='primary',
			:label='product.price + "₽"'
		)
	Counter.my-3.m-auto.w-28.self-end(
		v-else,
		@count='emit("count", $event)',
		:set-count='setCount'
	)
</template>
