<script setup lang="ts">
import { useCartStore } from 'src/stores/cart';

defineProps<{ id: number }>();

const cartStore = useCartStore();
</script>

<template lang="pug">
button.h-12.rounded-full.bg-secondary.text-white.text-lg.z-20(
	@click='cartStore.addProduct(id)'
)
	template(v-if='!cartStore.isProductInCart(id)')
		span.mr-3 Добавить в корзину
		q-icon(name='add')
	.span(v-if='cartStore.isProductInCart(id)') Вы добавили {{ cartStore.getProductCount(id) }}
</template>
