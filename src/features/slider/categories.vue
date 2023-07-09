<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Navigation, FreeMode } from 'swiper';

import { useCategories } from 'src/hooks/useCategories';

import CategoryCard from 'src/entities/category/card.vue';

const route = useRoute();
const router = useRouter();

const $w = useWait();

const modules = [Navigation, FreeMode];

const { categories, fetchCategories, fetchCategoriesLoadingSymbol } =
	useCategories();

const toCategory = (id: number) => {
	router.push({ name: 'category', params: { id } });
};

fetchCategories();
</script>

<template lang="pug">
template(v-if='$w.is(fetchCategoriesLoadingSymbol)')
	swiper.h-16(
		:slides-per-view='2.2',
		:space-between='10',
		:modules='modules',
		:pagination='{ clickable: true }',
		:freeMode='true'
	)
		template(v-for='(category, index) in 10', :key='index')
			swiper-slide
				q-skeleton.h-16.rounded-4xl

template(v-else)
	swiper.skeleton.h-16(
		:slides-per-view='2.2',
		:space-between='10',
		:modules='modules',
		:pagination='{ clickable: true }',
		:freeMode='true'
	)
		template(v-for='(category, index) in categories', :key='index')
			swiper-slide
				CategoryCard.test-1(
					:category='category',
					@toCategory='toCategory',
					:active-category-number='Number(route.params.id)'
				)
</template>
