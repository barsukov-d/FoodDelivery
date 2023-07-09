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
	(e: 'decProduct', id: number): void;
}>();

const cartStore = useCartStore();
</script>

<template lang="pug">
.mb-36.w-full.h-auto.rounded-4xl.overflow-hidden.grid.text-primary(
	class='grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_auto]'
)
	//- q-img.row-start-1.row-end-5.col-start-1.col-end-4(
	//- 	:src='product.image',
	//- 	spinner-color='black',
	//- 	style='height: 100%; max-width: 100%; object-fit: cover'
	//- )
	img.mx-auto.w-full.row-start-1.row-end-2.col-start-1.col-end-4(
		:src='product.image'
	)
	.px-5.py-1.text-xl.row-start-2.row-end-3.col-start-1.col-end-4.z-10
		| {{ product.name }}
	.px-5.text-sm.leading-4.row-start-3.row-end-4.col-start-1.col-end-4.opacity-50.z-10
		| {{ product.description }}

	.px-5.pb-2.text-xl.row-start-4.row-end-5.col-start-1.col-end-4.z-10
		| Цена {{ product.price }}
	.px-5.pb-2.text-xl.row-start-5.row-end-6.col-start-1.col-end-4.z-10
		| Колличество {{ product.weight }}
</template>
