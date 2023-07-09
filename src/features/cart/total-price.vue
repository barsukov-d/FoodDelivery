<script setup lang="ts">
import { useWordEnding } from 'src/hooks/useWordEndings';
import { useCartProductsList } from 'src/hooks/useCartProductsList';

const { totalPrice, totalProducts, fetchProductsList } = useCartProductsList();
await fetchProductsList();
</script>

<template lang="pug">
q-card.p-4.mt-4
	h3.text-2xl В заказе: {{ totalProducts }} {{ useWordEnding(totalProducts, ['товар', 'товара', 'товаров']) }}
	h2.text-2xl Заказ на сумму: {{ totalPrice }} рублей
</template>
