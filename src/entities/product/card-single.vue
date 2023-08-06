<script setup lang="ts">
import { useCartStore } from 'stores/cart';
import type { IProduct } from 'src/types/products';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

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
.mb-36.w-full.h-auto.rounded-xl.overflow-hidden.grid.text-primary(
	class='grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_auto]'
)
	//- q-img.row-start-1.row-end-5.col-start-1.col-end-4(
	//- 	:src='product.image',
	//- 	spinner-color='black',
	//- 	style='height: 100%; max-width: 100%; object-fit: cover'
	//- )
	img.mx-auto.row-start-1.row-end-2.col-start-1.col-end-4.rounded-xl.aspect-square(
		:src='product.image',
		class='.w-10/12'
	)
	.px-5.py-4.text-xl.row-start-2.row-end-3.col-start-1.col-end-4.z-10
		| {{ product.name }}
	.px-5.text-sm.leading-4.row-start-3.row-end-4.col-start-1.col-end-4.opacity-50.z-10
		| {{ product.description }}

	//- .px-5.pb-2.text-xl.row-start-4.row-end-5.col-start-1.col-end-4.z-10
	//- 	| Цена {{ product.price }}
	//- .px-5.pb-2.text-xl.row-start-5.row-end-6.col-start-1.col-end-4.z-10
	//- 	| Колличество {{ product.weight }}

	.px-5.text-xl.flex.items-center.justify-between.flex-col.row-start-4.row-end-5.col-start-1.col-end-4.z-10
		.w-full.flex.items-start
			.pr-2.text-base.opacity-50 {{ product.weight }} {{ t('card.weight') }}
			.pr-2.text-base.opacity-50(v-if='!cartStore.isProductInCart(product.id)') - {{ product.kcal }} {{ t('card.kcal') }}
			.pr-2.text-base(v-if='cartStore.isProductInCart(product.id)') - {{ product.price }} {{ t('card.price') }}
	//- pre {{ product }}
</template>
