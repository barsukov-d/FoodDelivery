<script setup lang="ts">
import SliderCategories from 'src/features/slider/categories.vue';
import ProductList from 'src/features/product/list.vue';
import PageHeader from 'src/shared/page/header.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<template lang="pug">
q-page
	PageHeader.mb-2(:header='t("headersName.dishes")')
	SliderCategories
	ProductList
</template>
