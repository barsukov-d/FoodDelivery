<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Navigation, FreeMode } from 'swiper';

import SliderHeader from 'src/entities/slider/header.vue';
import ProductCardForMain from 'src/entities/product/card-for-main.vue';

import { useProducts } from 'src/hooks/useProducts';
import { useCartStore } from 'src/stores/cart';
import type { ICategory } from 'src/types/categories';

const props = defineProps<{ category: ICategory }>();

/**
 *
 * Use hooks
 *
 */
const { products, fetchProductsLoadingSymbol, fetchProducts } = useProducts();

const { t } = useI18n();
const $w = useWait();
const cartStore = useCartStore();
const swiperModules = [Navigation, FreeMode];

const breakpoints = {
	768: {
		slidesPerView: 3.2,
	},
	1024: {
		slidesPerView: 5.2,
	},
	1280: {
		slidesPerView: 7.2,
	},

};

fetchProducts({ category_id: props.category.id });
</script>

<template lang="pug">
SliderHeader.mt-4(
	:header='category.title',
	:action='{ to: { name: "category", params: { id: category.id } }, label: t("common.showAll") }',
	:count='products.length'
)
swiper.mt-4.border-primary(
	:slides-per-view='2.2',
	:space-between='4',
	:modules='swiperModules',
	:pagination='{ clickable: true }',
	:freeMode='true',
	:breakpoints='{ ...breakpoints }'
)
	template(v-if='$w.is(fetchProductsLoadingSymbol)')
		SwiperSlide(v-for='(product, index) in 5', :key='index')
			q-skeleton.h-full.rounded-4xl
	template(v-else)
		SwiperSlide.border.border-slate-500.rounded-xl(
			v-for='(product, index) in products',
			:key='index'
		)
			ProductCardForMain(
				:product='product',
				:set-count='cartStore.getProductCount(product.id)',
				@count='cartStore.setProductCount(product.id, $event)',
				@addProduct='cartStore.addProduct($event)',
				@decProduct='cartStore.decProduct($event)'
			)
</template>
