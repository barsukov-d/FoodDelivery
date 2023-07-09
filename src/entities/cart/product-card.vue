<script setup lang="ts">
import type { IProduct } from 'src/types/products';

defineProps<{
	product: IProduct;
}>();

const emit = defineEmits<{
	(e: 'removeProduct', id: number): void;
	(e: 'addProduct', id: number): void;
	(e: 'decProduct', id: number): void;
}>();
</script>

<template lang="pug">
.p-5.pb-3.mt-2.h-auto.grid.rounded-4xl.shadow-xl.border-secondary.border(
	class='grid-cols-[25%_25%_25%_25%] grid-rows-[auto]'
)
	RouterLink.col-start-1.col-end-5.row-start-1.row-end-2.text-xl.flex.items-center(
		:to='{ name: "product", params: { id: product.id } }'
	)
		span.pl-3.block.font-bold.leading-4 {{ product.name }}

	q-btn.w-10.h-10.col-start-3.col-end-5.row-start-1.row-end-2.justify-self-end.rounded-full(
		round,
		color='primary',
		icon='delete',
		@click='emit("removeProduct", product.id)'
	)

	img.h-40.w-full.col-start-1.col-end-3.row-start-2.row-end-3.object-cover.rounded-4xl(
		:src='product.image'
	)

	.py-2.pl-3.col-start-3.col-end-5.row-start-2.row-end-3.text-sm
		span.block {{ product.description }}
		span.block {{ product.weight }} г

	.my-3.w-28.col-start-1.col-end-3.row-start-3.row-end-4.self-center.justify-self-center.flex.items-center.justify-between
		q-btn.w-10.h-10.text-xs(
			@click='emit("addProduct", product.id)',
			round,
			color='primary',
			icon='add',
			:disable='product.count >= 99'
		)
		span {{ product.count }}
		q-btn.w-10.h-10.text-xs(
			@click='emit("decProduct", product.id)',
			round,
			color='primary',
			icon='remove',
			:disable='product.count <= 0'
		)
	span.pl-3.col-start-3.col-end-5.row-start-3.row-end-4.self-center Цена: {{ product.count * product.price }}
</template>
