<script setup lang="ts">
import ProductsSlider from 'src/features/slider/products.vue';
import BannerSlider from 'src/features/slider/banners.vue';
import { useCategories } from 'src/hooks/useCategories';

/**
 *
 * Use hooks
 *
 */
const { categories, fetchCategories } = useCategories();

await fetchCategories();
</script>

<template lang="pug">
BannerSlider

ProductsSlider(
	v-for='category in categories',
	:key='category.id',
	:category='category'
)
</template>
