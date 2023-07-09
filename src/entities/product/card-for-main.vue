<script setup lang="ts">
import Counter from 'src/shared/counter.vue';
import { useCartStore } from 'stores/cart';
import type { IProduct } from 'src/types/products';

const { t, locale } = useI18n();

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
RouterLink(:to='{ name: "product", params: { id: product.id } }')
	.w-full.h-auto.rounded-xl.overflow-hidden.grid.text-light(
		class='grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_auto]'
	)
		q-img.row-start-1.row-end-2.col-start-1.col-end-4.rounded-xl.aspect-square(
			:src='product.image',
			spinner-color='black',
			style='height: 100%; max-width: 100%; object-fit: cover'
		)

		//- img.h-full.w-full.row-start-1.row-end-2.col-start-1.col-end-4.object-cover.rounded-xl(
		//- 	:src='product.image'
		//- )
		h3.text-base.px-2.py-1.mt-3.text-xl.row-start-2.row-end-3.col-start-1.col-end-4.z-10
			| {{ product.name }}
		.px-2.text-sm.leading-4.row-start-3.row-end-4.col-start-1.col-end-4.opacity-50.z-10
			| {{ product.description }}

		.px-2.text-xl.flex.items-center.justify-between.flex-col.row-start-4.row-end-5.col-start-1.col-end-4.z-10
			.w-full.flex.items-start
				.pr-2.text-sm.opacity-50 {{ product.weight }} {{ t('card.weight') }}
				.pr-2.text-sm.opacity-50(v-if='!cartStore.isProductInCart(product.id)') - {{ product.kcal }} {{ t('card.kcal') }}
				.pr-2.text-sm(v-if='cartStore.isProductInCart(product.id)') - {{ product.price }} {{ t('card.price') }}
		.py-4.px-2.w-full.flex.justify-between.row-start-5.row-end-6.col-start-1.col-end-4(
			v-if='cartStore.isProductInCart(product.id)'
		)
			button.w-12.h-12.rounded-full.bg-primary.justify-self-end.z-20(
				@click.prevent='emit("addProduct", product.id)'
			)
				q-icon(name='add')
				//- .span(v-if='cartStore.isProductInCart(product.id)') {{ cartStore.getProductCount(product.id) }}
			button.w-12.h-12.rounded-full.bg-transparent.row-start-4.justify-self-end.z-20(
				@click.prevent='emit("addProduct", product.id)'
			)
				//- q-icon(name='add', v-if='!cartStore.isProductInCart(product.id)')
				.span {{ cartStore.getProductCount(product.id) }}
			button.w-12.h-12.rounded-full.bg-primary.row-start-4.justify-self-end.z-20(
				@click.prevent='emit("decProduct", product.id)'
			)
				q-icon(name='remove')
				//- .span(v-if='cartStore.isProductInCart(product.id)') {{ cartStore.getProductCount(product.id) }}
		.py-4.px-2.w-full.flex.justify-center.row-start-5.row-end-6.col-start-1.col-end-4(
			v-if='!cartStore.isProductInCart(product.id)'
		)
			button.w-full.h-12.rounded-full.bg-primary.justify-self-end.z-20(
				@click.prevent='emit("addProduct", product.id)'
			)
				span.text-center {{ product.price }} {{ t('card.price') }}
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
