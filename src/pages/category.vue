<script setup lang="ts">
import SliderCategories from 'src/features/slider/categories.vue';
import ProductList from 'src/features/product/list.vue';
import PageHeader from 'src/shared/page/header.vue';
</script>
<template lang="pug">
q-page
	PageHeader.mb-2(header='Категории')
	SliderCategories
	ProductList
</template>
